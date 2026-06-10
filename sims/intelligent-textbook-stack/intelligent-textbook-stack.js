// Intelligent Textbook Component Stack MicroSim
// Interactive diagram of the components of an intelligent textbook and
// how they connect to institutional learning systems.
// CANVAS_HEIGHT: 550
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        textbook: {
            title: 'Intelligent Textbook',
            text: 'An intelligent textbook combines adaptive content, interactive simulations, AI tutoring, and xAPI telemetry into a single, coherent learning experience.'
        },
        adaptive: {
            title: 'Adaptive Content Engine',
            text: 'Adjusts reading level, explanation depth, and concept order based on each student’s current knowledge state.'
        },
        microsims: {
            title: 'MicroSims / Interactive Simulations',
            text: 'Embeddable p5.js, Chart.js, or Plotly simulations that let students experiment with concepts. Immediate, visual feedback.'
        },
        tutor: {
            title: 'Conversational AI Tutor',
            text: 'Answers student questions in natural language, grounded in the textbook’s specific content via RAG.'
        },
        xapi: {
            title: 'xAPI Telemetry Layer',
            text: 'Every student action (question asked, simulation run, concept revisited) emits an xAPI statement to the institution’s Learning Record Store.'
        },
        graph: {
            title: 'Concept Learning Graph',
            text: 'A map of concept dependencies that tells the adaptive engine which prerequisites to check before introducing a new topic.'
        },
        lrs: {
            title: 'Learning Record Store',
            text: 'The institution-controlled database that stores all xAPI statements. Feeds the AI-driven LMS for personalized learning-plan recommendations.'
        },
        lms: {
            title: 'AI-Driven LMS',
            text: 'Analyzes LRS data to recommend individualized learning plans, alert teachers to struggling students, and adjust content sequencing. Covered in the Learning Telemetry chapter.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .its-wrap { width: 100%; background: white; box-sizing: border-box; }
      .its-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .its-row { display: flex; width: 100%; height: 500px; }
      .its-net { width: 64%; height: 100%; position: relative; }
      #its-network { width: 100%; height: 100%; }
      .its-legend { position: absolute; top: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .its-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .its-panel { width: 36%; box-sizing: border-box; padding: 10px; }
      .its-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .its-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'its-wrap';
    wrap.innerHTML = `
      <div class="its-title">The Intelligent Textbook Component Stack</div>
      <div class="its-row">
        <div class="its-net">
          <div id="its-network"></div>
          <div class="its-legend">
            <span class="sw" style="background:#E65100"></span>Textbook core
            &nbsp;<span class="sw" style="background:#4682B4"></span>Content infrastructure
            &nbsp;<span class="sw" style="background:#00897b"></span>Student-facing
            &nbsp;<span class="sw" style="background:#FF8C00"></span>Telemetry
            &nbsp;<span class="sw" style="background:#9e9e9e"></span>External system
          </div>
        </div>
        <div class="its-panel">
          <div class="its-info" id="its-info">
            <h3>Explore the stack</h3>
            Click any component to see what it contributes. Follow the arrows
            from the textbook out to the Learning Record Store and AI-driven
            LMS to see how student activity becomes personalized learning.
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function makeNode(id, label, x, y, bg, border, fontSize) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: 'box', margin: 9, borderWidth: 2,
            color: { background: bg, border: border },
            font: { size: fontSize || 14, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const nodes = new vis.DataSet([
        makeNode('textbook', 'Intelligent\nTextbook', -110, -20, '#E65100', '#9c3c00', 17),
        makeNode('adaptive', 'Adaptive Content\nEngine', -270, -150, '#4682B4', '#2c5d8f'),
        makeNode('graph', 'Concept Learning\nGraph', -430, -55, '#4682B4', '#2c5d8f'),
        makeNode('microsims', 'MicroSims /\nInteractive Simulations', -290, 125, '#00897b', '#00564d'),
        makeNode('tutor', 'Conversational\nAI Tutor', -40, -185, '#00897b', '#00564d'),
        makeNode('xapi', 'xAPI Telemetry\nLayer', 55, 105, '#FF8C00', '#c46a00'),
        makeNode('lrs', 'Learning Record\nStore', 240, 150, '#9e9e9e', '#666'),
        makeNode('lms', 'AI-Driven\nLMS', 390, 55, '#9e9e9e', '#666')
    ]);

    function flowEdge(from, to, label, dashed) {
        return {
            from: from, to: to, label: label || undefined,
            font: label ? { size: 11, color: '#555', background: 'white',
                            face: 'Arial' } : undefined,
            color: { color: '#777' }, width: 2,
            dashes: dashed ? [5, 5] : false,
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { type: 'curvedCW', roundness: 0.08 }
        };
    }

    const edges = new vis.DataSet([
        flowEdge('textbook', 'adaptive'),
        flowEdge('textbook', 'microsims'),
        flowEdge('textbook', 'tutor'),
        flowEdge('textbook', 'xapi'),
        flowEdge('graph', 'adaptive', 'dependency map'),
        flowEdge('xapi', 'lrs', 'streams to'),
        flowEdge('lrs', 'lms', 'feeds')
    ]);

    const container = document.getElementById('its-network');
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

    const infoBox = document.getElementById('its-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
