DC.register('Main', (function () {
var CMDS = [
  { id: 'summary', label: '/summary', a: 'Vinicius is an implementation consultant for AI and workflow automation. He takes processes from mapping to production, backed by 8 years in last-mile operations at Mercado Livre, Cainiao (Alibaba Group) and Autoglass.' },
  { id: 'projects', label: '/projects', a: 'The highlights are HostMind, an agent that answers guests and knows when to hand off to a human, and Jarvis, a personal multi-agent system. Selected work is on GitHub.' },
  { id: 'stack', label: '/stack', a: 'n8n, LangChain, RAG, LLMs and Claude Code for AI automation; SQL, Python, BigQuery and Looker Studio for data; APIs and XML/CT-e for integrations; Jira, Scrum and UAT for delivery.' },
  { id: 'how', label: '/how-he-implements', a: 'Discovery workshops first, then process mapping and requirements. He builds, runs UAT with real users, trains the team and stays through go-live. If a simpler solution delivers the same value, he proposes that first.' },
  { id: 'hire', label: '/hire', a: 'He works as a contractor through Corp-to-Corp via his U.S. company, or as a contractor in Brazil, fully remote. The best way to reach him is the email at the bottom of the page.' }];

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { cmd: 'summary', tab: 'hosp', hmOpen: false, pjOpen: false, jbOpen: false };
    var self = this;
    var openFromHash = function () { var h = (window.location.hash || ''); if (h === '#journey' && !self.state.jbOpen) self.setState({ jbOpen: true }); if (h === '#projects' && !self.state.pjOpen) self.setState({ pjOpen: true }); if (h === '#hostmind' && !self.state.hmOpen) self.setState({ hmOpen: true }); };
    try { window.addEventListener('hashchange', openFromHash); setTimeout(openFromHash, 0); } catch (e) {}
  }
  renderVals() {
    var self = this;
    var badgeStyle = function (c, bg) { return 'font-size:12px;font-weight:900;background:' + (bg || '#1C2546') + ';color:' + c + ';border-radius:8px;padding:4px 8px'; };
    var statusStyle = function (bg, fg) { return 'font-size:12px;font-weight:800;white-space:nowrap;background:' + bg + ';color:' + fg + ';border-radius:999px;padding:3px 10px'; };
    var JOBS = [
        { when: 'Aug 2026 – Present', company: 'Master Vacation Homes', logo: 'assets/master-vacation-homes.png', logoBg: '#0A0A0A', logoFit: 'cover', role: 'AI Implementation Consultant (Remote U.S.)', text: 'I lead AI and workflow automation implementations for guest operations, owning the full cycle from process mapping to production. That includes a RAG agent that answers guests and knows when to hand the conversation to the team, and a redesigned lost-and-found process on n8n.', tags: ['n8n', 'LangChain', 'RAG', 'Process mapping'] },
        { when: 'Jan 2025 – Aug 2026', company: 'Social Solutions', logo: 'assets/social-solutions.png', logoBg: '#FFFFFF', logoFit: 'cover', role: 'Implementation Consultant (Remote)', text: 'Led the implementation of a municipal e-learning platform serving 200,000+ citizens, acting as Product Owner from discovery to delivery. Weekly discovery workshops turned municipal rules into 50+ requirements and 40+ user stories; UAT and load testing validated 100% of them; 14 sprints delivered 100% of the contracted scope on schedule.', tags: ['Discovery', 'Requirements', 'UAT', 'Jira'] },
        { when: 'Aug 2024 – Jul 2025', company: 'Cainiao (Alibaba Group)', logo: 'assets/cainiao.svg', logoBg: '#0A6CFF', logoFit: 'cover', role: 'Implementation Manager (Remote U.S.)', text: 'Implemented a new U.S. last-mile operation from scratch: routines, controls and internal tools rolled out to the team. A Python and SQL pipeline cut packages misclassified as missing by 90%, and the KPI routines supported 67% volume growth, from 3,000 to 5,000 parcels a day.', tags: ['Python', 'SQL', 'AppSheet', 'Looker Studio'] },
        { when: 'Jan 2022 – Jun 2024', company: 'Mercado Livre', logo: 'assets/mercado-livre.svg', logoBg: '#FFE600', logoFit: 'contain', role: 'Regional Transportation Coordinator · Joined as Senior Analyst', text: 'Led a 24/7 operation with 40,000+ parcels a day, 8 distribution centers and a 25-person team, and opened 7+ new operations under my management. A dimensional model in BigQuery drove ~US$1.6M in annual savings, and my real-time monitoring tool was built into Mercado Livre\'s platform.', tags: ['BigQuery', 'SQL', 'Python', 'Leadership'] },
        { when: 'Dec 2018 – Dec 2021', company: 'Autoglass', logo: 'assets/autoglass.png', logoBg: '#FFFFFF', logoFit: 'contain', role: 'Regional Transportation Manager · Joined as Senior Route Planning Analyst', text: 'National operation with 5,000+ deliveries a day. Owned two enterprise TMS implementations end to end, from vendor selection to go-live: carrier XML integration errors down 99%. Cut freight from 7.8% to 5.8% of revenue and saved R$700K+ a month by moving volume to the in-house fleet.', tags: ['TMS', 'APIs', 'SQL', 'Go-live'] }
      ];
    var TABS = [
      { id: 'hosp', num: '01', label: 'Hospitality', bg: '#B9FC01', fg: '#070A16', accent: '#D4FF6A',
        title: 'Answering "how far is the park?"', live: true,
        desc: 'When a guest asks about distances, HostMind answers with the same drive times shown on this map.',
        nodes: ['Guest asks how far the parks are', 'Finds the guest\'s home on the map', 'Pulls the drive time to each park', 'Checks the reply before it goes out', 'Sends the times to the guest'], jevAt: 3 },
      { id: 'sales', num: '02', label: 'Sales', bg: '#4D7BFF', fg: '#070A16', accent: '#8FA8FF',
        title: 'Discount approval',
        desc: 'The store numbers on this map feed a flow that decides which discount requests can be approved on their own.',
        nodes: ['Sales rep requests a discount', 'Rule: up to 10% auto-approved', 'Assesses the justification', 'Approve, ask a manager or deny', 'Logs it in the CRM'], jevAt: 2 },
      { id: 'ops', num: '03', label: 'Operations', bg: '#F2F4FA', fg: '#070A16', accent: '#DCE4FF',
        title: 'Pulling a package off a route',
        desc: 'The routes and SLAs on this map feed a flow that decides when a package should go back to the warehouse.',
        nodes: ['Package is added to a route', 'Calculates km and detour minutes', 'Rule: over 5 km or 30+ min off route', 'Assesses the delivery context', 'Back to the warehouse or stays on route'], jevAt: 3 }
    ];
    var curTab = TABS.filter(function (t) { return t.id === self.state.tab; })[0];
    var tabs = TABS.map(function (t) {
      var on = t.id === self.state.tab;
      return { num: t.num, label: t.label, on: on ? 'true' : 'false', pick: function () { self.setState({ tab: t.id }); },
        style: 'min-height:44px;padding:0 18px;border-radius:999px;font-family:Nunito,sans-serif;font-size:15px;font-weight:800;cursor:pointer;' + (on ? 'background:' + t.bg + ';color:' + t.fg + ';border:1px solid ' + t.bg + ';' : 'background:#141B33;color:#F2F4FA;border:1px solid #222C52;') };
    });
    var flow = { title: curTab.title, desc: curTab.desc, status: curTab.live ? '● Live in HostMind' : 'Example flow', statusStyle: 'font-size:12px;font-weight:800;border-radius:999px;padding:4px 12px;' + (curTab.live ? 'background:#1A2A10;color:#B9FC01' : 'background:#3A3320;color:#FFC857'), accent: curTab.accent, nodes: curTab.nodes.map(function (n, i) {
      var jev = curTab.jevAt === i;
      return { num: String(i + 1), label: n, jev: jev, more: i < curTab.nodes.length - 1,
        box: 'display:flex;align-items:center;gap:10px;border-radius:12px;padding:10px 14px;' + (jev ? 'background:#1A2A10;border:2px solid #FFC857;box-shadow:0 0 0 4px rgba(79,216,240,0.25)' : 'background:#1C2546;border:1px solid #222C52') };
    }) };
    var cur = CMDS.filter(function (c) { return c.id === self.state.cmd; })[0];
    var room = function (bg) { return 'position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;min-height:170px;padding:36px 10px 14px;box-sizing:border-box;border:3px solid #222C52;border-radius:0;box-shadow:inset 0 -6px 0 rgba(0,0,0,0.06);background:' + bg + ';text-decoration:none;'; };
    var hmOpen = !!this.state.hmOpen, pjOpen = !!this.state.pjOpen, jbOpen = !!this.state.jbOpen;
    return {
      hmOpen: hmOpen, hmExpanded: hmOpen ? 'true' : 'false', hmGap: hmOpen ? '16px' : '0',
      hmLabel: hmOpen ? 'Hide how HostMind works' : 'See how HostMind works',
      hmIcon: hmOpen ? '▲ CLOSE' : '▼ OPEN',
      pjOpen: pjOpen, pjExpanded: pjOpen ? 'true' : 'false', pjGap: pjOpen ? '16px' : '0',
      pjLabel: pjOpen ? 'Hide all 6 projects' : 'See all 6 projects',
      pjIcon: pjOpen ? '▲ CLOSE' : '▼ OPEN',
      jbOpen: jbOpen, jbExpanded: jbOpen ? 'true' : 'false', jbGap: jbOpen ? '32px' : '0',
      jbLabel: jbOpen ? 'Hide my experience' : 'See my experience',
      jbIcon: jbOpen ? '▲ CLOSE' : '▼ OPEN',
      jbToggle: function () { self.setState({ jbOpen: !self.state.jbOpen }); },
      pjToggle: function () { self.setState({ pjOpen: !self.state.pjOpen }); },
      hmToggle: function () { self.setState({ hmOpen: !self.state.hmOpen }); },
      rooms: [
        { href: '#showcase', label: 'Showcase', hint: 'Interactive maps', badge: 'M', color: '#D4FF6A', style: room('#1A2350'), wip: false, hatOp: '0', antOp: '1', bobCls: '' },
        { href: '#projects', label: 'Projects', hint: "What I've built", badge: '{}', color: '#B9FC01', style: room('#1A2A10'), wip: false, hatOp: '0', antOp: '1', bobCls: '' },
        { href: '#journey', label: 'Journey', hint: 'My resume', badge: 'CV', color: '#FFC857', style: room('#1A2350'), wip: false, hatOp: '0', antOp: '1', bobCls: '' },
        { href: '#agent', label: 'Front desk', hint: 'Agent in training', badge: 'V', color: '#B9FC01', style: room('#1A2A10') + 'overflow:hidden;', wip: true, hatOp: '1', antOp: '0', bobCls: 'bob' }
      ],
      jobs: JOBS, curJobs: JOBS.slice(0, 1), pastJobs: JOBS.slice(1),
      projects: [
        { name: 'HostMind', sub: 'AI guest-messaging agent', badge: 'AI', status: 'In production', text: 'AI guest-messaging agent: reuses approved Quick Replies, answers the rest from company rules with RAG, and hands off to a person when it isn\'t sure.', stack: 'n8n · Jev · LangChain · RAG', isLink: true, href: '#hostmind', linkLabel: 'Read the full case study ↑', hasCase: false, dotStyle: badgeStyle('#DCE4FF', '#0131CD'), statusStyle: statusStyle('#1A2A10', '#B9FC01') },
        { name: 'ClaimTrack', sub: 'Lost-and-found case system', badge: 'Automation', status: 'In production', text: 'Lost-and-found process redesigned on n8n workflows to be clear and less bureaucratic, growing shipping-fee revenue by 80% and raising team adherence.', stack: 'n8n · JavaScript · Google APIs · database', isLink: false, hasCase: true, dotStyle: badgeStyle('#FFC857'), statusStyle: statusStyle('#1A2A10', '#B9FC01'),
          where: 'Vacation rental operation · internal project',
          problem: 'Items left by guests were handled loosely and by hand: no single case record, no clear owner at each step, and little control over shipping and payment.',
          steps: [
            { kind: 'auto', title: 'Open the case', text: 'A cleaner or a guest report creates one case, with the property manager and the default office filled in from the home.' },
            { kind: 'auto', title: 'Route each step', text: 'Every status change notifies the next owner: found, in transit to the office, in inventory, awaiting payment.' },
            { kind: 'ai', title: 'Cause analysis', text: 'AI reads the case and helps the team understand why items are being left behind.' },
            { kind: 'auto', title: 'Ship and close', text: 'Packaging, freight quote and a 30-day payment window, then the tracking number is checked before the case closes.' }
          ],
          results: [ { value: '+80%', label: 'shipping-fee revenue' }, { value: '1', label: 'case record from report to delivery' } ],
          role: 'Mapped the process, set the business rules and built the workflows.' },
        { name: 'Jarvis', sub: 'Personal multi-agent system', badge: 'AI', status: 'In progress', text: 'My personal team of agents: a coordinator that routes each request to the right specialist.', stack: 'Python · multi-agent', isLink: false, hasCase: true, dotStyle: badgeStyle('#DCE4FF', '#0131CD'), statusStyle: statusStyle('#3A3320', '#FFC857'),
          where: 'Personal project · built by hand to learn',
          problem: 'I wanted to understand multi-agent systems by building one myself, line by line, instead of only using ready-made tools.',
          steps: [
            { kind: 'ai', title: 'Coordinator', text: 'Reads each request and decides which specialist agent should handle it.' },
            { kind: 'ai', title: 'Specialists', text: 'Each agent lives in its own folder with its own subagents and tools.' },
            { kind: 'ai', title: 'Daily brief', text: 'Next up: one agent that consolidates email updates, what needs attention and news on chosen topics.' }
          ],
          results: [ { value: '8', label: 'agents' }, { value: '30', label: 'subagents' } ],
          role: 'Architecture, code and the visual office where each agent has its own room.' },
        { name: 'LostCheck', sub: 'Missing package investigation', badge: 'Automation', status: 'Cainiao · 2024–25', text: 'Daily routine that cross-checks tracking data, flags packages wrongly marked as missing and builds an investigation queue for operators.', stack: 'Python · SQL · AppSheet', isLink: false, hasCase: true, dotStyle: badgeStyle('#FFC857'), statusStyle: statusStyle('#0131CD', '#DCE4FF'),
          where: 'New U.S. last-mile operation · Cainiao (Alibaba Group)',
          problem: 'More than 200 packages a day were being marked as missing when many were not, inflating losses and daily exposure.',
          steps: [
            { kind: 'data', title: 'Daily pipeline', text: 'Python and SQL with raw, clean and reporting layers.' },
            { kind: 'auto', title: 'Flag exceptions', text: 'Rules separate real losses from packages misclassified as missing.' },
            { kind: 'auto', title: 'Investigation app', text: 'An AppSheet app turns the flags into a daily queue for 10 operators.' }
          ],
          results: [ { value: '−90%', label: 'misclassified (200+ to under 20 a day)' }, { value: '−22%', label: 'losses' }, { value: 'US$3,600+', label: 'less daily exposure' } ],
          role: 'Designed and built the pipeline and rolled out the app to the operators.' },
        { name: 'LiveRoute', sub: 'Real-time last-mile monitor', badge: 'Data', status: 'Mercado Livre · 2022', text: 'Merges system exports with the company database into a monitoring tool refreshed every minute.', stack: 'Python · SQL · BigQuery · Looker Studio', isLink: false, hasCase: true, dotStyle: badgeStyle('#4D7BFF'), statusStyle: statusStyle('#0131CD', '#DCE4FF'),
          where: 'Regional last-mile operation · Mercado Livre',
          problem: 'Operational data arrived with a 2-hour delay, so the team reacted to problems after they had already grown.',
          steps: [
            { kind: 'data', title: 'Merge the sources', text: 'A Python pipeline joins system exports with the company database.' },
            { kind: 'data', title: 'Model in BigQuery', text: 'SQL models combine 4 operational sources, including deliveries and customer complaints.' },
            { kind: 'auto', title: 'Live monitor', text: 'A regional dashboard refreshed every minute for the team and directors.' }
          ],
          results: [ { value: '2 h → 1 min', label: 'data latency' }, { value: '~200', label: 'people using it' } ],
          role: 'Built it as part of a three-person founding team. Engineering later embedded it into the core platform.' },
        { name: 'HubMap', sub: 'Last-mile dimensional model', badge: 'Data', status: 'Mercado Livre · 2022–24', text: 'Dimensional model of orders, parcels and operational losses that guided where distribution centers should be and which carriers to bring in.', stack: 'SQL · BigQuery · Looker Studio', isLink: false, hasCase: true, dotStyle: badgeStyle('#4D7BFF'), statusStyle: statusStyle('#0131CD', '#DCE4FF'),
          where: 'Regional last-mile operation · Mercado Livre',
          problem: 'Raw transactional data could not answer the big questions: where to place distribution centers and which carriers to negotiate with.',
          steps: [
            { kind: 'data', title: 'Dimensional model', text: 'BigQuery tables for orders, parcels and operational losses.' },
            { kind: 'data', title: 'Dashboards', text: 'Looker Studio views that turned the model into decisions.' },
            { kind: 'auto', title: 'Act on it', text: 'Distribution centers restructured and new carriers negotiated and onboarded.' }
          ],
          results: [ { value: '~US$1.6M', label: 'annual savings' }, { value: '−9%', label: 'shipping cost per order' } ],
          role: 'Designed and built the model while leading the regional operation.' }
      ].map(function (p) {
        p.stackList = (p.stack || '').split(' · ');
        p.onLink = function () { if (p.href === '#hostmind' && !self.state.hmOpen) self.setState({ hmOpen: true }); };
        if (p.steps) p.steps = p.steps.map(function (s, i) {
          var c = s.kind === 'ai' ? ['#0131CD', '#DCE4FF', 'AI'] : s.kind === 'data' ? ['#1A2A10', '#B9FC01', 'Data'] : ['#1C2546', '#D9DEEC', 'Automation'];
          return Object.assign({}, s, { n: String(i + 1), tag: c[2], tagStyle: "font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;border-radius:999px;padding:2px 8px;white-space:nowrap;background:" + c[0] + ';color:' + c[1] });
        });
        return p;
      }),
      cmds: CMDS.map(function (c) {
        var on = c.id === self.state.cmd;
        return { label: c.label, pick: function () { self.setState({ cmd: c.id }); }, style: 'min-height:40px;padding:0 14px;border-radius:999px;font-family:JetBrains Mono,monospace;font-size:13px;cursor:pointer;' + (on ? 'background:#0131CD;color:#FFFFFF;border:1px solid #222C52;' : 'background:#141B33;color:#F2F4FA;border:1px solid #222C52;') };
      }),
      hmMetrics: [
        { value: '1,200+', label: 'guest chats answered per day' },
        { value: '300+', label: 'team hours freed per month' },
        { value: '12', label: 'people on the guest team supported' },
        { value: '7', label: 'n8n workflows in production' }
      ],
      hmSteps: [
        { num: '1', kind: 'auto', title: 'Capture the message', text: 'An n8n workflow picks up each new Airbnb guest message and starts the flow.' },
        { num: '2', kind: 'ai', tag: 'AI · Jev', title: 'Match a Quick Reply', text: 'Jev decides whether one of the team\'s approved Quick Replies already answers the question.', branch: true, yesLabel: 'Match:', yes: 'the approved reply is sent as is.', noLabel: 'No match:', no: 'goes to the company rules.' },
        { num: '3', kind: 'ai', tag: 'AI · RAG', title: 'Consult the memory', text: 'LangChain retrieves the relevant rules and the model drafts a reply grounded in them.' },
        { num: '4', kind: 'ai', title: 'Score confidence', text: 'The model rates how sure it is. Money, damage and unclear policies count as sensitive.' },
        { num: '5', kind: 'auto', title: 'Send or hand off', text: 'A fixed rule decides the outcome, so behavior is predictable and easy to audit.', branch: true, yesLabel: 'High confidence:', yes: 'sent to the guest.', noLabel: 'Low or sensitive:', no: 'held and flagged for the team.' }
      ].map(function (s) {
        var ai = s.kind === 'ai';
        return Object.assign({ tag: ai ? 'AI' : 'Automation', branch: false }, s, {
          color: ai ? '#B9FC01' : '#4A5D8A',
          tagStyle: "font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;border-radius:999px;padding:3px 9px;" + (ai ? 'background:#0131CD;color:#DCE4FF' : 'background:#1C2546;color:#D9DEEC'),
          box: 'display:flex;flex-direction:column;gap:8px;border-radius:14px;padding:14px;' + (s.num === '2' ? 'background:#1C2546;border:2px solid #B9FC01' : 'background:#1C2546;border:1px solid #222C52')
        });
      }),
      hmMemory: [
        { tag: 'Quick Replies', title: 'Approved answers', text: "The team's standard replies for recurring questions, reused word for word when they fit." },
        { tag: 'Policies', title: 'Company rules', text: 'Documents in Google Drive, such as the compensation guide and the cleaning rates.' },
        { tag: 'Database', title: 'Structured data', text: 'Company records the agent looks up instead of guessing.' }
      ],
      hmHow: [
        { n: '01', title: 'Map', text: 'What guests ask and the rule behind each answer.' },
        { n: '02', title: 'Build memory', text: 'Quick Replies, compensation guide, cleaning rates, then the rest.' },
        { n: '03', title: 'Test first', text: 'Real guest questions reviewed against policy before automating.' },
        { n: '04', title: 'Go live', text: 'n8n workflows with a confidence threshold.' },
        { n: '05', title: 'Iterate', text: 'Rules and prompts tuned from team feedback.' }
      ],
      tabs: tabs, flow: flow,
      isHosp: self.state.tab === 'hosp', isSales: self.state.tab === 'sales', isOps: self.state.tab === 'ops',
      askText: cur.label,
      answerText: cur.a,
      skills: ['n8n', 'LangChain', 'RAG', 'LLMs', 'Prompt engineering', 'Claude Code', 'APIs', 'Python', 'SQL', 'BigQuery', 'Looker Studio', 'Power BI', 'Discovery workshops', 'Requirements gathering', 'Process mapping', 'UAT', 'User training', 'Go-live', 'Change management', 'Jira', 'Scrum', 'TMS · ERP · WMS', 'Lean Six Sigma Green Belt']
    };
  }
}
return Component;
})());

DC.register('MapHospitality', (function () {
const I = {
  castle: 'M3 21h18M5 21v-12l2 -2l2 2v3h6v-3l2 -2l2 2v12M10 21v-4a2 2 0 0 1 4 0v4M5 9v-4M19 9v-4M12 12v-7l3 1.5l-3 1.5',
  globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18',
  film: 'M4 6h16v12h-16zM4 10h16M8 6l-2 4M13 6l-2 4M18 6l-2 4',
  tree: 'M12 21v-6M12 15a6 6 0 1 0 0 -12a6 6 0 0 0 0 12M9 18h6',
  planet: 'M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0 -10M2.5 17c1.5 2 8 -1 12.5 -4s7.5 -6.5 6 -8.5',
  palm: 'M12 21v-9M12 12c-1.5 -3 -5 -4 -8 -3M12 12c1.5 -3 5 -4 8 -3M12 12c-2 -1 -4.5 -0.5 -6 1.5M12 12c2 -1 4.5 -0.5 6 1.5M8 21h8',
  ticket: 'M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2',
  plane: 'M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z'
};
const PROPS = [
  { name: 'Disney Springs', sub: 'Lake Buena Vista · shopping and dining hub', x: 516, y: 333, hub: true },
  { name: 'Palm Grove Villas', area: 'Kissimmee', x: 590, y: 455, pets: 'No', ev: 'Yes' },
  { name: 'Cypress Landing', area: 'Celebration', x: 470, y: 478, pets: 'Yes', ev: 'Yes' },
  { name: 'Lakeview Reserve', area: 'Kissimmee', x: 650, y: 495, pets: 'Yes', ev: 'No' },
  { name: 'Citrus Ridge', area: 'Four Corners', x: 290, y: 470, pets: 'No', ev: 'No' },
  { name: 'Sunrise Point', area: 'Kissimmee', x: 520, y: 545, pets: 'Yes', ev: 'Yes' },
  { name: 'Magnolia Bend', area: 'Davenport', x: 330, y: 575, pets: 'No', ev: 'Yes' },
  { name: 'Harbor Oaks', area: 'Kissimmee', x: 670, y: 415, pets: 'Yes', ev: 'No' },
  { name: 'Bayside Commons', area: 'Kissimmee', x: 610, y: 590, pets: 'No', ev: 'No' }
];
PROPS.forEach((p) => { if (!p.hub) { p.sub = p.area + ' · Pets: ' + p.pets + ' · EV: ' + p.ev; } });
const DEST = [
  { name: 'Magic Kingdom', short: 'Magic Kingdom', x: 390, y: 210, kind: 'park', icon: I.castle, side: 'above' },
  { name: 'Epcot', short: 'Epcot', x: 456, y: 320, kind: 'park', icon: I.globe, side: 'left' },
  { name: 'Hollywood Studios', short: 'Hollywood St.', x: 433, y: 366, kind: 'park', icon: I.film, side: 'below' },
  { name: 'Animal Kingdom', short: 'Animal Kingdom', x: 373, y: 371, kind: 'park', icon: I.tree, side: 'left' },
  { name: 'Universal Studios', short: 'Universal', x: 645, y: 62, kind: 'park', icon: I.ticket, side: 'right' },
  { name: 'Islands of Adventure', short: 'Islands of Adv.', x: 585, y: 92, kind: 'park', icon: I.palm, side: 'left' },
  { name: 'Epic Universe', short: 'Epic Universe', x: 668, y: 150, kind: 'park', icon: I.planet, side: 'right' },
  { name: 'MCO Airport', short: 'MCO', x: 940, y: 180, kind: 'air', icon: I.plane, side: 'below' }
];
const curve = (x1, y1, x2, y2, bend) => {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const cx = (x1 + x2) / 2 - dy / len * len * bend, cy = (y1 + y2) / 2 + dx / len * len * bend;
  return 'M' + x1 + ' ' + y1 + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + x2 + ' ' + y2;
};
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { sel: 0, q: '' };
  }
  renderVals() {
    const sel = this.state.sel;
    const P = PROPS[sel];
    const mins = (p, d) => Math.round(Math.hypot(d.x - p.x, d.y - p.y) * (d.kind === 'air' ? 0.055 : 0.055)) + 5;
    const routes = DEST.map((d, i) => ({
      d: curve(P.x, P.y, d.x, d.y, d.kind === 'air' ? -0.12 : (i % 2 ? 0.14 : -0.1)),
      color: d.kind === 'air' ? '#FFFFFF' : '#D4FF6A',
      dash: d.kind === 'air' ? '7 7' : 'none'
    }));
    const dests = DEST.map((d) => {
      const s = d.side;
      return Object.assign({}, d, {
        left: (d.x / 10) + '%', top: (d.y / 6.4) + '%', min: mins(P, d),
        lx: s === 'right' ? '48px' : (s === 'left' ? 'auto' : '50%'),
        rx: s === 'left' ? '48px' : 'auto',
        ty: s === 'above' ? '0' : (s === 'below' ? '46px' : '50%'),
        tf: (s === 'right' || s === 'left') ? 'translateY(-50%)' : (s === 'above' ? 'translate(-50%, -100%) translateY(-6px)' : 'translateX(-50%)'),
        ta: s === 'left' ? 'right' : (s === 'right' ? 'left' : 'center')
      });
    });
    const pins = PROPS.map((p, i) => ({
      name: p.name, left: (p.x / 10) + '%', top: (p.y / 6.4) + '%',
      size: i === sel ? '16px' : (p.hub ? '14px' : '11px'),
      fill: i === sel ? '#FFFFFF' : (p.hub ? '#D4FF6A' : '#B9FC01'),
      glow: i === sel ? '0 0 0 4px rgba(185,252,1,0.45), 0 0 22px #B9FC01' : '0 0 10px rgba(185,252,1,0.8)',
      pick: () => this.setState({ sel: i, q: '' })
    }));
    const q = (this.state.q || '').toLowerCase();
    const matches = q ? PROPS.map((p, i) => ({ name: p.name, area: p.hub ? 'Lake Buena Vista' : p.area, pick: () => this.setState({ sel: i, q: '' }) }))
      .filter((p) => p.name.toLowerCase().indexOf(q) !== -1).slice(0, 4) : [];
    const homes = PROPS.filter((p) => !p.hub);
    const avg = (fn) => Math.round(homes.reduce((s, p) => s + fn(p), 0) / homes.length);
    const kpis = [
      { value: String(homes.length), label: 'vacation homes in this demo' },
      { value: String(homes.filter((p) => p.pets === 'Yes').length), label: 'pet-friendly homes' },
      { value: String(avg((p) => mins(p, DEST[0]))), label: 'avg minutes to Magic Kingdom' },
      { value: String(avg((p) => mins(p, DEST[7]))), label: 'avg minutes to the airport' }
    ];
    return {
      sel: P, selPin: { left: (P.x / 10) + '%', top: (P.y / 6.4) + '%' },
      routes: routes, dests: dests, pins: pins, matches: matches, kpis: kpis, q: this.state.q,
      onSearch: (e) => this.setState({ q: e.target.value })
    };
  }
}
return Component;
})());

DC.register('MapSales', (function () {
const WH = { x: 420, y: 265 };
const STORES = [
  { name: 'Lower Manhattan', x: 835, y: 120, sales: 412, orders: 5900, units: 9800, cat: 'Electronics', growth: 8, side: 'right' },
  { name: 'Jersey City', x: 630, y: 120, sales: 268, orders: 4300, units: 7100, cat: 'Home', growth: 5, side: 'left' },
  { name: 'Hoboken', x: 680, y: 40, sales: 154, orders: 2500, units: 3900, cat: 'Grocery', growth: 3, side: 'left' },
  { name: 'Brooklyn Heights', x: 865, y: 260, sales: 301, orders: 4600, units: 7400, cat: 'Apparel', growth: 11, side: 'right' },
  { name: 'Sunset Park', x: 800, y: 400, sales: 188, orders: 3400, units: 6200, cat: 'Home', growth: -2, side: 'left' },
  { name: 'Bayonne', x: 420, y: 400, sales: 97, orders: 1900, units: 3300, cat: 'Grocery', growth: 1, side: 'right' },
  { name: 'St. George', x: 520, y: 565, sales: 122, orders: 2200, units: 3600, cat: 'Electronics', growth: 4, side: 'right' },
  { name: 'Newark', x: 380, y: 120, sales: 236, orders: 4100, units: 6600, cat: 'Apparel', growth: 6, side: 'right' }
];
const money = (k) => k >= 1000 ? '$' + (k / 1000).toFixed(2) + 'M' : '$' + k + 'k';
const num = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
const curve = (x1, y1, x2, y2, bend) => {
  const dx = x2 - x1, dy = y2 - y1;
  const cx = (x1 + x2) / 2 - dy * bend, cy = (y1 + y2) / 2 + dx * bend;
  return 'M' + x1 + ' ' + y1 + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + x2 + ' ' + y2;
};
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { sel: 0 };
  }
  renderVals() {
    const sel = this.state.sel;
    const S = STORES[sel];
    const max = Math.max.apply(null, STORES.map((s) => s.sales));
    const routes = STORES.map((s, i) => {
      const w = 1.5 + 5 * s.sales / max;
      return {
        d: curve(WH.x, WH.y, s.x, s.y, i % 2 ? 0.12 : -0.12),
        w: w.toFixed(1), glowW: (w * 3).toFixed(1),
        op: i === sel ? '1' : '0.55'
      };
    });
    const pins = STORES.map((s, i) => ({
      name: s.name, salesLabel: money(s.sales),
      left: (s.x / 10) + '%', top: (s.y / 6.4) + '%',
      bg: i === sel ? '#4D7BFF' : '#0A0E1C', fg: i === sel ? '#070A16' : '#8FA8FF',
      glow: i === sel ? '0 0 0 5px rgba(77,123,255,0.25), 0 0 26px #4D7BFF' : '0 0 16px rgba(77,123,255,0.5)',
      lx: s.side === 'right' ? '46px' : 'auto', rx: s.side === 'left' ? '46px' : 'auto',
      ta: s.side === 'left' ? 'right' : 'left',
      pick: () => this.setState({ sel: i })
    }));
    const top = STORES.map((s, i) => ({
      name: s.name, sales: s.sales, salesLabel: money(s.sales),
      bar: Math.round(100 * s.sales / max) + '%',
      rowBg: i === sel ? '#141B33' : 'transparent',
      pick: () => this.setState({ sel: i })
    })).sort((a, b) => b.sales - a.sales).slice(0, 3);
    const tSales = STORES.reduce((a, s) => a + s.sales, 0);
    const tOrders = STORES.reduce((a, s) => a + s.orders, 0);
    const tUnits = STORES.reduce((a, s) => a + s.units, 0);
    const kpis = [
      { value: money(tSales), label: 'sales this month' },
      { value: num(tOrders), label: 'orders' },
      { value: '$' + Math.round(tSales * 1000 / tOrders), label: 'average ticket' },
      { value: num(tUnits), label: 'units shipped' }
    ];
    const dist = Math.round(Math.hypot(S.x - WH.x, S.y - WH.y) / 40 * 10) / 10;
    const cardRows = [
      { label: 'Sales', value: money(S.sales) },
      { label: 'Average ticket', value: '$' + Math.round(S.sales * 1000 / S.orders) },
      { label: 'Units', value: num(S.units) },
      { label: 'Top category', value: S.cat }
    ];
    return {
      wh: { left: (WH.x / 10) + '%', top: (WH.y / 6.4) + '%' },
      sel: {
        name: S.name, dist: dist,
        growth: (S.growth > 0 ? '+' : '') + S.growth + '%',
        growthColor: S.growth >= 0 ? '#B9FC01' : '#FFC857'
      },
      routes: routes, pins: pins, top: top, kpis: kpis, cardRows: cardRows
    };
  }
}
return Component;
})());

DC.register('MapOperations', (function () {
const HUB = { x: 459, y: 455 };
const REGIONS = [
  { name: 'Manaus', x: 295, y: 152, del: 180, otif: 84, lead: 4.2, cost: 9.8, side: 'right' },
  { name: 'Belém', x: 439, y: 127, del: 260, otif: 89, lead: 3.1, cost: 7.4, side: 'right' },
  { name: 'Fortaleza', x: 564, y: 161, del: 410, otif: 92, lead: 2.6, cost: 6.1, side: 'right' },
  { name: 'Recife', x: 600, y: 226, del: 520, otif: 94, lead: 2.2, cost: 5.6, side: 'right' },
  { name: 'Salvador', x: 564, y: 300, del: 610, otif: 93, lead: 2.0, cost: 5.2, side: 'right' },
  { name: 'Brasília', x: 446, y: 342, del: 480, otif: 96, lead: 1.4, cost: 4.3, side: 'left' },
  { name: 'Belo Horizonte', x: 496, y: 404, del: 890, otif: 97, lead: 1.1, cost: 3.6, side: 'left' },
  { name: 'Vitória', x: 541, y: 410, del: 340, otif: 95, lead: 1.3, cost: 4.1, side: 'right' },
  { name: 'Rio de Janeiro', x: 505, y: 449, del: 1420, otif: 95, lead: 0.9, cost: 3.4, side: 'right' },
  { name: 'Curitiba', x: 429, y: 495, del: 760, otif: 97, lead: 1.0, cost: 3.5, side: 'left' },
  { name: 'Porto Alegre', x: 405, y: 560, del: 690, otif: 91, lead: 1.6, cost: 4.6, side: 'right' }
];
HUB.x += 120;
REGIONS.forEach((r) => { r.x += 120; });
const OK = 93;
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
const curve = (x1, y1, x2, y2, bend) => {
  const dx = x2 - x1, dy = y2 - y1;
  const cx = (x1 + x2) / 2 - dy * bend, cy = (y1 + y2) / 2 + dx * bend;
  return 'M' + x1 + ' ' + y1 + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + x2 + ' ' + y2;
};
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { sel: 0 };
  }
  renderVals() {
    const sel = this.state.sel;
    const R = REGIONS[sel];
    const colorOf = (r) => r.otif >= OK ? '#F2F4FA' : '#FFC857';
    const routes = REGIONS.map((r, i) => {
      const ok = r.otif >= OK;
      return {
        d: curve(HUB.x, HUB.y, r.x, r.y, i % 2 ? 0.15 : -0.15),
        color: colorOf(r), w: i === sel ? '3' : '1.6',
        dash: ok ? 'none' : '6 6'
      };
    });
    const pins = REGIONS.map((r, i) => ({
      name: r.name, otif: r.otif, color: colorOf(r),
      fill: i === sel ? colorOf(r) : '#070A16',
      left: (r.x / 10) + '%', top: (r.y / 6.4) + '%',
      size: i === sel ? '18px' : '12px',
      lx: r.side === 'right' ? '34px' : 'auto', rx: r.side === 'left' ? '34px' : 'auto',
      ta: r.side === 'left' ? 'right' : 'left',
      pick: () => this.setState({ sel: i })
    }));
    const tDel = REGIONS.reduce((a, r) => a + r.del, 0);
    const wOtif = REGIONS.reduce((a, r) => a + r.otif * r.del, 0) / tDel;
    const wCost = REGIONS.reduce((a, r) => a + r.cost * r.del, 0) / tDel;
    const risk = REGIONS.filter((r) => r.otif < OK).length;
    const kpis = [
      { value: fmt(tDel), label: 'deliveries per day', color: '#F2F4FA' },
      { value: wOtif.toFixed(1) + '%', label: 'network OTIF', color: '#F2F4FA' },
      { value: 'R$' + wCost.toFixed(2), label: 'avg cost per delivery', color: '#F2F4FA' },
      { value: String(risk), label: 'regions at risk', color: '#FFC857' }
    ];
    const ok = R.otif >= OK;
    const km = Math.round(Math.hypot(R.x - HUB.x, R.y - HUB.y) * 9.5 / 10) * 10;
    const cardRows = [
      { label: 'OTIF', value: R.otif + '%' },
      { label: 'Deliveries/day', value: fmt(R.del) },
      { label: 'Lead time', value: R.lead.toFixed(1) + ' days' },
      { label: 'Cost/delivery', value: 'R$' + R.cost.toFixed(2) }
    ];
    return {
      hub: { left: (HUB.x / 10) + '%', top: (HUB.y / 6.4) + '%' },
      hubStats: { throughput: fmt(tDel) },
      sel: {
        name: R.name, km: km, color: colorOf(R),
        glow: ok ? 'rgba(242,244,250,0.25)' : 'rgba(255,200,87,0.28)',
        status: ok ? 'On track' : 'At risk'
      },
      routes: routes, pins: pins, kpis: kpis, cardRows: cardRows
    };
  }
}
return Component;
})());

DC.mount('Main', document.getElementById('app'));
