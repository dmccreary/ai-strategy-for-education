// Five Levels of Intelligent Textbooks MicroSim
// The five-level progression from static to autonomous AI textbooks.
// CANVAS_HEIGHT: 450
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const levels = {
        1: { name: 'Level 1: Static',
             capability: 'Fixed content, digital distribution only. No personalization.',
             infrastructure: 'Web hosting or PDF distribution. No student data collected.',
             example: 'A PDF textbook or basic e-book.' },
        2: { name: 'Level 2: Interactive',
             capability: 'MicroSims, learning graph navigation, session feedback.',
             infrastructure: 'Static site generator (e.g., MkDocs) plus JavaScript libraries like p5.js and Chart.js.',
             example: 'An open intelligent textbook with embedded MicroSims — like this one.' },
        3: { name: 'Level 3: Adaptive',
             capability: 'Persistent student model, xAPI/LRS telemetry, personalized sequencing.',
             infrastructure: 'Student model database, xAPI event stream, Learning Record Store.',
             example: 'Adaptive courseware platforms that reorder content per student.' },
        4: { name: 'Level 4: Chatbot',
             capability: 'LLM tutor, RAG-grounded answers, conversational interaction.',
             infrastructure: 'LLM API access plus a RAG index over the textbook content.',
             example: 'A textbook with an embedded AI tutor that cites its own chapters.' },
        5: { name: 'Level 5: Autonomous AI',
             capability: 'Real-time content generation, fully personalized instruction.',
             infrastructure: 'Real-time generation pipeline, safety review, continuous learning analytics loop.',
             example: 'Emerging research prototypes — not yet in mainstream classroom use.' }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .flt-wrap { width: 100%; background: white; box-sizing: border-box; }
      .flt-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .flt-row { display: flex; width: 100%; height: 400px; }
      .flt-net { width: 62%; height: 100%; }
      #flt-network { width: 100%; height: 100%; }
      .flt-panel { width: 38%; box-sizing: border-box; padding: 10px; }
      .flt-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 13.5px;
        line-height: 1.5; height: 100%; box-sizing: border-box;
        overflow-y: auto; }
      .flt-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .flt-info dt { font-weight: bold; margin-top: 8px; color: #444; }
      .flt-info dd { margin: 2px 0 0 0; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'flt-wrap';
    wrap.innerHTML = `
      <div class="flt-title">The Five Levels of Intelligent Textbooks</div>
      <div class="flt-row">
        <div class="flt-net"><div id="flt-network"></div></div>
        <div class="flt-panel">
          <div class="flt-info" id="flt-info">
            <h3>A capability ladder</h3>
            Each level builds on the one before it. Click any level to see its
            defining capability, the infrastructure it requires, and an example
            platform type.
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    // zigzag y values avoid the vis-network horizontal edge-label bug
    const nodeDefs = [
        { id: 1, x: -380, y: 12, bg: '#9e9e9e', border: '#666' },
        { id: 2, x: -190, y: -12, bg: '#4682B4', border: '#2c5d8f' },
        { id: 3, x: 0, y: 12, bg: '#00897b', border: '#00564d' },
        { id: 4, x: 190, y: -12, bg: '#FF8C00', border: '#c46a00' },
        { id: 5, x: 380, y: 12, bg: '#E65100', border: '#9c3c00' }
    ];

    const nodes = new vis.DataSet(nodeDefs.map(function (n) {
        return {
            id: n.id, label: levels[n.id].name.replace(': ', ':\n'),
            title: levels[n.id].capability,
            x: n.x, y: n.y, fixed: true,
            shape: 'box', margin: 10, borderWidth: 2,
            color: { background: n.bg, border: n.border },
            font: { size: 14, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }));

    const edgeLabels = ['add interactivity', 'add student model',
                        'add LLM tutor', 'add generation'];
    const edges = new vis.DataSet(edgeLabels.map(function (label, i) {
        return {
            from: i + 1, to: i + 2, label: label,
            font: { size: 11, color: '#555', background: 'white', face: 'Arial' },
            color: { color: '#777' }, width: 2,
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { type: 'curvedCW', roundness: 0.12 }
        };
    }));

    const container = document.getElementById('flt-network');
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

    const infoBox = document.getElementById('flt-info');
    network.on('click', function (params) {
        if (params.nodes.length === 0) return;
        const lv = levels[params.nodes[0]];
        infoBox.innerHTML = '<h3>' + lv.name + '</h3><dl>' +
            '<dt>Defining capability</dt><dd>' + lv.capability + '</dd>' +
            '<dt>Required infrastructure</dt><dd>' + lv.infrastructure + '</dd>' +
            '<dt>Example platform type</dt><dd>' + lv.example + '</dd></dl>';
    });
});
