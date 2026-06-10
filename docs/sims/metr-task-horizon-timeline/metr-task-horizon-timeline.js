// METR Task Horizon Timeline MicroSim
// Interactive timeline of AI task-horizon growth from 2019 to 2025.
// CANVAS_HEIGHT: 500
// Library: vis-timeline

document.addEventListener('DOMContentLoaded', function () {

    const events = [
        { id: 1, start: '2019-01-01', era: 'pre',
          content: '~2 seconds',
          title: 'Jan 2019 — task horizon ~2 seconds',
          info: 'Early GPT-2 era. AI could autocomplete short phrases and sentences reliably.' },
        { id: 2, start: '2020-06-01', era: 'early',
          content: '~30 seconds',
          title: 'Jun 2020 — task horizon ~30 seconds',
          info: 'GPT-3 launch. AI could summarize paragraphs and answer factual questions.' },
        { id: 3, start: '2021-06-01', era: 'early',
          content: '~2 minutes',
          title: 'Jun 2021 — task horizon ~2 minutes',
          info: 'Codex and early coding assistants. AI could write short functions and simple scripts reliably.' },
        { id: 4, start: '2022-06-01', era: 'early',
          content: '~5 minutes',
          title: 'Jun 2022 — task horizon ~5 minutes',
          info: 'ChatGPT era begins. AI handles short research tasks and writing assignments with 50% reliability.' },
        { id: 5, start: '2023-03-01', era: 'frontier',
          content: '~15 minutes',
          title: 'Mar 2023 — task horizon ~15 minutes',
          info: 'GPT-4 launch. AI completes small, self-contained software projects end-to-end.' },
        { id: 6, start: '2024-01-01', era: 'frontier',
          content: '~45 minutes',
          title: 'Jan 2024 — task horizon ~45 minutes',
          info: 'Frontier models integrate tools and browse the web autonomously for extended sessions.' },
        { id: 7, start: '2025-06-01', era: 'frontier',
          content: '~4 hours',
          title: 'Jun 2025 — task horizon ~4 hours',
          info: 'Reasoning models complete multi-session software engineering tasks — equivalent to a junior developer’s morning — with 50% reliability.' }
    ];

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .mth-wrap { width: 100%; background: white; box-sizing: border-box; }
      .mth-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 2px 4px; }
      .mth-bar { display: flex; align-items: center; gap: 8px;
        margin: 4px 10px; flex-wrap: wrap; }
      .mth-bar button { padding: 5px 12px; font-size: 13px; cursor: pointer;
        border: 1px solid #888; background: #f0f0f0; border-radius: 6px; }
      .mth-bar button:hover { background: #e0e0e0; }
      .mth-legend { font-size: 12px; color: #555; margin-left: auto; }
      .mth-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin: 0 3px 0 10px; vertical-align: -1px; }
      #mth-timeline { width: 100%; height: 300px; }
      .mth-info { min-height: 86px; margin: 6px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 14px; line-height: 1.45;
        box-sizing: border-box; }
      .mth-info b { color: #1a3a6c; }
      .vis-item.era-pre { background-color: #cfd8dc; border-color: #78909c;
        color: #263238; }
      .vis-item.era-early { background-color: #4682B4; border-color: #2c5d8f;
        color: white; }
      .vis-item.era-frontier { background-color: #E65100; border-color: #9c3c00;
        color: white; }
      .vis-item.vis-selected { box-shadow: 0 0 6px 2px rgba(26,58,108,0.6); }
      .vis-item .vis-item-content { white-space: nowrap !important;
        padding: 4px 8px !important; }
      .vis-item.vis-box { min-width: fit-content !important; }
      .vis-tooltip { background: #2c3e50 !important; color: white !important;
        padding: 8px 12px !important; border-radius: 8px !important;
        font-size: 13px !important; max-width: 300px !important;
        white-space: normal !important; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'mth-wrap';
    wrap.innerHTML = `
      <div class="mth-title">AI Task Horizon Growth, 2019–2025</div>
      <div class="mth-bar">
        <button id="mth-left">◀</button>
        <button id="mth-right">▶</button>
        <button id="mth-zin">+</button>
        <button id="mth-zout">−</button>
        <button id="mth-fit">Fit All</button>
        <span class="mth-legend">Era:
          <span class="sw" style="background:#cfd8dc"></span>pre-LLM
          <span class="sw" style="background:#4682B4"></span>early LLM
          <span class="sw" style="background:#E65100"></span>frontier
        </span>
      </div>
      <div id="mth-timeline"></div>
      <div class="mth-info" id="mth-info">
        <b>Explore:</b> Click any marker to read what AI could reliably do at
        that point. The task horizon — how long a task AI can complete with
        50% reliability — has doubled roughly every six months.
      </div>
    `;
    main.appendChild(wrap);

    // ---------- timeline ----------
    const items = new vis.DataSet(events.map(function (e) {
        return { id: e.id, start: e.start, content: e.content,
                 title: e.title, className: 'era-' + e.era, type: 'box' };
    }));

    const timeline = new vis.Timeline(
        document.getElementById('mth-timeline'), items, {
            width: '100%',
            height: '300px',
            margin: { item: { horizontal: 30, vertical: 10 }, axis: 30 },
            orientation: 'bottom',
            stack: true,
            selectable: true,
            showCurrentTime: false,
            moveable: true,
            zoomable: false,   // no scroll hijack — use the buttons
            zoomMin: 1000 * 60 * 60 * 24 * 120,
            zoomMax: 1000 * 60 * 60 * 24 * 365 * 12,
            min: new Date(2018, 0, 1),
            max: new Date(2026, 11, 31),
            tooltip: { followMouse: true }
        });
    timeline.setWindow(new Date(2018, 6, 1), new Date(2026, 3, 1));

    const infoBox = document.getElementById('mth-info');
    timeline.on('select', function (props) {
        if (props.items.length > 0) {
            const e = events.find(function (x) { return x.id === props.items[0]; });
            if (e) {
                infoBox.innerHTML = '<b>' + e.title + ':</b> ' + e.info;
            }
        }
    });

    // nav buttons
    function pan(frac) {
        const w = timeline.getWindow();
        const span = w.end - w.start;
        timeline.setWindow(new Date(w.start.valueOf() + span * frac),
            new Date(w.end.valueOf() + span * frac));
    }
    document.getElementById('mth-left').addEventListener('click', function () { pan(-0.3); });
    document.getElementById('mth-right').addEventListener('click', function () { pan(0.3); });
    document.getElementById('mth-zin').addEventListener('click', function () { timeline.zoomIn(0.5); });
    document.getElementById('mth-zout').addEventListener('click', function () { timeline.zoomOut(0.5); });
    document.getElementById('mth-fit').addEventListener('click', function () { timeline.fit(); });
});
