/*
 * dc-lite: a tiny template runtime for this site.
 * Supports {{path}} holes in text and attributes, <sc-for>, <sc-if>,
 * <dc-import> child components and class components with setState.
 * Values are written with textContent / setAttribute only (no innerHTML),
 * and event handlers are attached with addEventListener.
 */
(function () {
  'use strict';

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\{\{\s*([^}]+?)\s*\}\}$/;
  var EVENTS = { onclick: 'click', onkeydown: 'keydown', onmousemove: 'mousemove', onchange: 'change', oninput: 'input' };

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    var parts = path.split('.');
    var v = scope;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patch) {
    var p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, p);
    if (this.__rerender) this.__rerender();
  };
  DCLogic.prototype.forceUpdate = function () { if (this.__rerender) this.__rerender(); };

  var registry = {};

  function Instance(name) {
    var def = registry[name];
    if (!def) throw new Error('Unknown component: ' + name);
    this.name = name;
    this.tpl = document.getElementById('tpl-' + name);
    this.logic = new def({});
    this.children = {};
    this.container = null;
    var self = this;
    this.logic.__rerender = function () { self.update(); };
  }

  Instance.prototype.mountInto = function (container) {
    this.container = container;
    this.update();
  };

  Instance.prototype.update = function () {
    if (!this.container) return;
    var active = document.activeElement;
    var focusId = active && this.container.contains(active) && active.id ? active.id : null;
    var selStart = focusId && 'selectionStart' in active ? active.selectionStart : null;
    var scrollY = window.scrollY;

    var vals = this.logic.renderVals ? this.logic.renderVals() : {};
    var frag = document.createDocumentFragment();
    renderChildren(this.tpl.content, vals, frag, this);
    this.container.replaceChildren(frag);

    if (focusId) {
      var el = document.getElementById(focusId);
      if (el) {
        el.focus({ preventScroll: true });
        if (selStart != null && el.setSelectionRange) { try { el.setSelectionRange(selStart, selStart); } catch (e) {} }
      }
    }
    if (Math.abs(window.scrollY - scrollY) > 1) window.scrollTo(0, scrollY);
  };

  function renderChildren(parent, scope, out, inst) {
    for (var n = parent.firstChild; n; n = n.nextSibling) renderNode(n, scope, out, inst);
  }

  function renderNode(node, scope, out, inst) {
    if (node.nodeType === 3) {
      out.appendChild(document.createTextNode(interp(node.nodeValue, scope)));
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.localName;

    if (tag === 'sc-for') {
      var m = WHOLE.exec(node.getAttribute('list') || '');
      var list = m ? lookup(m[1], scope) : null;
      var as = node.getAttribute('as') || 'item';
      if (list && list.length) {
        for (var i = 0; i < list.length; i++) {
          var s = Object.create(scope);
          s[as] = list[i];
          s.$index = i;
          renderChildren(node, s, out, inst);
        }
      }
      return;
    }

    if (tag === 'sc-if') {
      var mv = WHOLE.exec(node.getAttribute('value') || '');
      if (mv && lookup(mv[1], scope)) renderChildren(node, scope, out, inst);
      return;
    }

    if (tag === 'dc-import') {
      var name = node.getAttribute('name');
      var child = inst.children[name] || (inst.children[name] = new Instance(name));
      var box = document.createElement('div');
      out.appendChild(box);
      child.mountInto(box);
      return;
    }

    var el = node.namespaceURI === 'http://www.w3.org/1999/xhtml'
      ? document.createElement(node.localName)
      : document.createElementNS(node.namespaceURI, node.localName);

    for (var a = 0; a < node.attributes.length; a++) {
      var attr = node.attributes[a];
      var an = attr.name;
      var av = attr.value;
      if (an.indexOf('hint-') === 0) continue;
      var lower = an.toLowerCase();
      if (lower.indexOf('on') === 0) {
        var wm = WHOLE.exec(av);
        var fn = wm ? lookup(wm[1], scope) : null;
        if (typeof fn === 'function') {
          var ev = EVENTS[lower] || lower.slice(2);
          if (lower === 'onchange' && (node.localName === 'input' || node.localName === 'textarea')) ev = 'input';
          el.addEventListener(ev, fn);
        }
        continue;
      }
      var val = interp(av, scope);
      if (lower === 'value' && 'value' in el) { el.value = val; continue; }
      el.setAttribute(an, val);
    }

    renderChildren(node, scope, el, inst);
    out.appendChild(el);
  }

  window.DCLogic = DCLogic;
  window.DC = {
    register: function (name, cls) { registry[name] = cls; },
    mount: function (name, container) { new Instance(name).mountInto(container); }
  };
})();
