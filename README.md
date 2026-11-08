# viiniciiusgavaa.github.io

Personal site of **Vinicius Gava** — Implementation Consultant for AI and workflow automation.

🔗 **Live:** https://viiniciiusgavaa.github.io

## What's inside

- **Showcase** — one interactive map component reused for three businesses (hospitality, sales, operations). All map data is fictional.
- **HostMind** — case study of an AI guest-messaging agent (n8n + LangChain + RAG) with a confidence-based hand-off to people.
- **Projects** — ClaimTrack, Jarvis, LostCheck, LiveRoute and HubMap.
- **Journey** — experience at Master Vacation Homes, Social Solutions, Cainiao, Mercado Livre and Autoglass.

## How it's built

Plain static HTML, CSS and JavaScript, served by GitHub Pages. No build step, no backend, no tracking.

- `index.html` — page shell and the component templates (`<template id="tpl-...">`)
- `js/dc-lite.js` — a ~150-line template runtime: `{{holes}}`, loops (`<sc-for>`), conditions (`<sc-if>`), child components and `setState`
- `js/components.js` — the page and the three maps as small components
- `css/site.css` — styles

### Security

- Content-Security-Policy: scripts only from this site; fonts only from Google Fonts; no forms, no external connections
- Values are written with `textContent` / `setAttribute`, never `innerHTML`
- No API keys, secrets or personal data beyond public contact links

Run locally: `python3 -m http.server` and open http://localhost:8000.
