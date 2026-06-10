// xAPI Statement Anatomy MicroSim
// The required and optional components of an xAPI statement and how the
// Actor-Verb-Object structure enables cross-platform data aggregation.
// CANVAS_HEIGHT: 480
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        stmt: {
            title: 'xAPI Statement',
            text: 'A complete description of a single learning event: who did what to which content, when, and with what result.'
        },
        actor: {
            title: 'Actor (required)',
            text: 'Who performed the activity. Identified by name, email, or institution-specific ID. Example: Maya Chen, student ID 12345.'
        },
        verb: {
            title: 'Verb (required)',
            text: 'What the actor did. Drawn from a shared vocabulary: answered, completed, passed, interacted. Using shared verbs ensures cross-platform consistency.'
        },
        object: {
            title: 'Object (required)',
            text: 'What the activity was performed on — a question, a chapter, a simulation, or an entire course. Identified by a unique URI.'
        },
        result: {
            title: 'Result (optional)',
            text: 'The outcome of the activity: score (0–1 scale), success (true/false), completion (true/false), and duration.'
        },
        context: {
            title: 'Context (optional)',
            text: 'The setting: course, school, registration, instructor, language, and any parent activity (e.g., the course this quiz belongs to).'
        },
        timestamp: {
            title: 'Timestamp (optional)',
            text: 'ISO 8601 datetime when the activity occurred. Essential for timeline analysis and early-alert systems.'
        },
        authority: {
            title: 'Authority (optional)',
            text: 'Which system sent this statement — ensures the LRS can trust the source.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .xsa-wrap { width: 100%; background: white; box-sizing: border-box; }
      .xsa-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .xsa-row { display: flex; width: 100%; height: 430px; }
      .xsa-net { width: 62%; height: 100%; position: relative; }
      #xsa-network { width: 100%; height: 100%; }
      .xsa-legend { position: absolute; bottom: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .xsa-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .xsa-panel { width: 38%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .xsa-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .xsa-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .xsa-example { font-size: 11.5px; color: #333; background: #f4f4f4;
        border: 1px solid #ddd; border-radius: 6px; padding: 8px 10px;
        font-family: 'Courier New', monospace; line-height: 1.5; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'xsa-wrap';
    wrap.innerHTML = `
      <div class="xsa-title">Anatomy of an xAPI Statement</div>
      <div class="xsa-row">
        <div class="xsa-net">
          <div id="xsa-network"></div>
          <div class="xsa-legend">
            <span class="sw" style="background:#4682B4"></span>Required
            &nbsp;<span class="sw" style="background:#00897b"></span>Optional
            &nbsp;— solid edge = required, dashed = optional
          </div>
        </div>
        <div class="xsa-panel">
          <div class="xsa-info" id="xsa-info">
            <h3>Who did what, to which content</h3>
            Click any component. The required Actor–Verb–Object triple is what
            lets statements from different platforms aggregate cleanly in one
            Learning Record Store.
          </div>
          <div class="xsa-example">
            { "actor": "Maya Chen",<br/>
            &nbsp;&nbsp;"verb": "answered",<br/>
            &nbsp;&nbsp;"object": "fraction-quiz-q3",<br/>
            &nbsp;&nbsp;"result": { "success": true } }
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function makeNode(id, label, x, y, bg, border, fontSize) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: 'box', margin: 10, borderWidth: 2,
            color: { background: bg, border: border },
            font: { size: fontSize || 14, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const nodes = new vis.DataSet([
        makeNode('stmt', 'xAPI\nStatement', 0, 0, '#E65100', '#9c3c00', 18),
        makeNode('actor', 'Actor', -200, -115, '#4682B4', '#2c5d8f'),
        makeNode('verb', 'Verb', 0, -160, '#4682B4', '#2c5d8f'),
        makeNode('object', 'Object', 200, -115, '#4682B4', '#2c5d8f'),
        makeNode('result', 'Result', -245, 70, '#00897b', '#00564d'),
        makeNode('context', 'Context', -95, 150, '#00897b', '#00564d'),
        makeNode('timestamp', 'Timestamp', 95, 150, '#00897b', '#00564d'),
        makeNode('authority', 'Authority', 245, 70, '#00897b', '#00564d')
    ]);

    function spoke(to, required) {
        return {
            from: 'stmt', to: to,
            color: { color: required ? '#2c5d8f' : '#00897b' },
            width: required ? 3 : 1.8,
            dashes: required ? false : [6, 5],
            arrows: { to: { enabled: false } },
            smooth: false
        };
    }

    const edges = new vis.DataSet([
        spoke('actor', true), spoke('verb', true), spoke('object', true),
        spoke('result', false), spoke('context', false),
        spoke('timestamp', false), spoke('authority', false)
    ]);

    const container = document.getElementById('xsa-network');
    const network = new vis.Network(container, { nodes: nodes, edges: edges }, {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: false,
            dragView: false,
            dragNodes: false,
            navigationButtons: true,
            hover: true,
            keyboard: { enabled: false }
        }
    });
    network.fit({ animation: false });
    window.addEventListener('resize', function () { network.fit({ animation: false }); });

    const infoBox = document.getElementById('xsa-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
