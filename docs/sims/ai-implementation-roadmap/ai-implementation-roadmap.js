// AI Implementation Roadmap MicroSim
// Phased AI strategy milestones across six swim lanes, with owners and
// dependencies, over a 24-month implementation window.
// CANVAS_HEIGHT: 590
// Library: vis-timeline

document.addEventListener('DOMContentLoaded', function () {

    // month N of the plan -> a concrete date (plan starts January 2026)
    function month(n) { return new Date(2026, n - 1, 1); }

    const groups = [
        { id: 'infra', content: 'Infrastructure' },
        { id: 'policy', content: 'Policy &<br/>Governance' },
        { id: 'pd', content: 'Professional<br/>Development' },
        { id: 'pilots', content: 'Pilots' },
        { id: 'community', content: 'Community<br/>Engagement' },
        { id: 'scale', content: 'Scale-up' }
    ];

    const events = [
        { id: 1, group: 'infra', start: month(1), end: month(3),
          content: 'LRS vendor selection',
          info: 'Select and contract an xAPI-compliant LRS. Required before any AI tutoring pilot can begin. Owner: CTO.' },
        { id: 2, group: 'infra', start: month(3), end: month(6),
          content: 'LRS deployment & integration',
          info: 'Configure LRS, connect to first two pilot platforms. Owner: IT team + vendor.' },
        { id: 3, group: 'policy', start: month(1), end: month(2),
          content: 'Form AI Steering Committee',
          info: 'Appoint members, define charter, set meeting cadence. Owner: Superintendent.' },
        { id: 4, group: 'policy', start: month(2), end: month(4),
          content: 'Draft AI Use Policy',
          info: 'Develop policy with teacher and parent input. Board approval required before pilots begin. Owner: General Counsel + CoE.' },
        { id: 5, group: 'pd', start: month(2), end: month(4),
          content: 'AI literacy training — all staff',
          info: 'One-hour AI literacy sessions for all teaching staff before pilot tools are available. Owner: CoE.' },
        { id: 6, group: 'pd', start: month(4), end: month(6),
          content: 'Teacher champion program',
          info: 'Select and train 1–2 teacher champions per pilot school. Owner: HR + CoE.' },
        { id: 7, group: 'pilots', start: month(6), end: month(12),
          content: 'Classroom pilot — AI tutoring, 3 schools',
          info: 'Pilot with volunteer teachers. Collect xAPI data. Establish baseline metrics. Owner: Curriculum Director.' },
        { id: 8, group: 'pilots', start: month(12), end: month(14),
          content: 'Pilot evaluation',
          info: 'Evaluate against pre-defined success metrics. Board presentation of results. Owner: Steering Committee.' },
        { id: 9, group: 'community', start: month(3), end: month(5),
          content: 'Parent information sessions',
          info: 'Explain what AI will and will not be used for. Answer questions. Provide opt-out information. Owner: Principal.' },
        { id: 10, group: 'community', start: month(12), type: 'point',
          content: 'Board presentation — pilot results',
          info: 'Present quantitative and qualitative results. Request approval for scale-up. Owner: Superintendent.' },
        { id: 11, group: 'scale', start: month(15), end: month(24),
          content: 'District-wide deployment — pilot successes',
          info: 'Scale tools that met success metrics. Incorporate pilot lessons learned. Owner: CoE + Curriculum.' }
    ];

    const LANE_COLORS = {
        infra: '#4682B4', policy: '#E65100', pd: '#00897b',
        pilots: '#FF8C00', community: '#43a047', scale: '#7b1fa2'
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    let laneCss = '';
    Object.keys(LANE_COLORS).forEach(function (k) {
        laneCss += '.vis-item.lane-' + k + ' { background-color: ' +
            LANE_COLORS[k] + '; border-color: ' + LANE_COLORS[k] +
            '; color: white; }\n';
    });
    style.textContent = `
      .air-wrap { width: 100%; background: white; box-sizing: border-box; }
      .air-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 2px 4px; }
      .air-bar { display: flex; align-items: center; gap: 8px;
        margin: 4px 10px; flex-wrap: wrap; }
      .air-bar button { padding: 5px 12px; font-size: 13px; cursor: pointer;
        border: 1px solid #888; background: #f0f0f0; border-radius: 6px; }
      .air-bar button:hover { background: #e0e0e0; }
      .air-hint { font-size: 12px; color: #777; margin-left: auto; }
      #air-timeline { width: 100%; height: 380px; }
      .air-info { min-height: 86px; margin: 6px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 14px; line-height: 1.45;
        box-sizing: border-box; }
      .air-info b { color: #1a3a6c; }
      ${laneCss}
      .vis-item.vis-selected { box-shadow: 0 0 6px 2px rgba(26,58,108,0.6); }
      .vis-item .vis-item-content { padding: 3px 6px !important;
        font-size: 12px; }
      .vis-labelset .vis-label { font-size: 12.5px; font-weight: bold; }
      .vis-tooltip { background: #2c3e50 !important; color: white !important;
        padding: 8px 12px !important; border-radius: 8px !important;
        font-size: 13px !important; max-width: 320px !important;
        white-space: normal !important; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'air-wrap';
    wrap.innerHTML = `
      <div class="air-title">AI Strategy Implementation Roadmap — 24 Months</div>
      <div class="air-bar">
        <button id="air-left">◀</button>
        <button id="air-right">▶</button>
        <button id="air-zin">+</button>
        <button id="air-zout">−</button>
        <button id="air-fit">Fit All</button>
        <span class="air-hint">Click any bar for the milestone's owner and
        dependencies.</span>
      </div>
      <div id="air-timeline"></div>
      <div class="air-info" id="air-info">
        <b>Read the sequencing:</b> Policy, training, and community engagement
        all complete before pilots begin in month 6 — and nothing scales
        district-wide until the pilots are evaluated. Click any milestone for
        its owner.
      </div>
    `;
    main.appendChild(wrap);

    // ---------- timeline ----------
    const items = new vis.DataSet(events.map(function (e) {
        return {
            id: e.id, group: e.group, start: e.start, end: e.end,
            type: e.type || 'range',
            content: e.content,
            title: e.content,
            className: 'lane-' + e.group
        };
    }));

    const timeline = new vis.Timeline(
        document.getElementById('air-timeline'), items,
        new vis.DataSet(groups), {
            width: '100%',
            height: '380px',
            margin: { item: { horizontal: 0, vertical: 6 }, axis: 20 },
            orientation: 'top',
            stack: false,
            selectable: true,
            showCurrentTime: false,
            moveable: true,
            zoomable: false,
            zoomMin: 1000 * 60 * 60 * 24 * 60,
            zoomMax: 1000 * 60 * 60 * 24 * 365 * 4,
            min: new Date(2025, 10, 1),
            max: new Date(2028, 2, 1),
            tooltip: { followMouse: true }
        });
    timeline.setWindow(new Date(2025, 11, 1), new Date(2028, 1, 1));

    const infoBox = document.getElementById('air-info');
    timeline.on('select', function (props) {
        if (props.items.length > 0) {
            const e = events.find(function (x) { return x.id === props.items[0]; });
            if (e) {
                infoBox.innerHTML = '<b>' + e.content + ':</b> ' + e.info;
            }
        }
    });

    function pan(frac) {
        const w = timeline.getWindow();
        const span = w.end - w.start;
        timeline.setWindow(new Date(w.start.valueOf() + span * frac),
            new Date(w.end.valueOf() + span * frac));
    }
    document.getElementById('air-left').addEventListener('click', function () { pan(-0.3); });
    document.getElementById('air-right').addEventListener('click', function () { pan(0.3); });
    document.getElementById('air-zin').addEventListener('click', function () { timeline.zoomIn(0.5); });
    document.getElementById('air-zout').addEventListener('click', function () { timeline.zoomOut(0.5); });
    document.getElementById('air-fit').addEventListener('click', function () { timeline.fit(); });
});
