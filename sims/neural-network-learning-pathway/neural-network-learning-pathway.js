// Neural Network Learning Pathway MicroSim
// How training data flows through a neural network to produce model
// parameters, which are then used for inference.
// CANVAS_HEIGHT: 560
// Library: vis-network (center panel) + DOM panels (left/right stages)

document.addEventListener('DOMContentLoaded', function () {

    const trainingData = [
        { icon: '🌐', label: 'Web pages',
          info: 'Web pages teach the model everyday language, facts, and how people explain things to each other. If this data is absent or biased, the model’s general knowledge becomes narrow or skewed toward certain viewpoints.' },
        { icon: '📚', label: 'Books',
          info: 'Books contribute long-form reasoning, narrative structure, and deep subject knowledge. Without books, the model struggles with sustained arguments and literary or academic style.' },
        { icon: '🎙️', label: 'Audio transcripts',
          info: 'Transcripts teach conversational patterns — how people actually speak, interrupt, and clarify. If missing, the model sounds stilted in dialogue and misreads informal speech.' },
        { icon: '🖼️', label: 'Images',
          info: 'Images (with captions) teach visual concepts and how language describes the visual world. Without them, multimodal abilities like reading diagrams or describing photos are absent.' },
        { icon: '💻', label: 'Code',
          info: 'Source code teaches precise logical structure and step-by-step procedures. Models trained on code are measurably better at reasoning — absence weakens math and logic skills.' }
    ];

    const NODE_INFO = 'This processing unit receives values from the previous layer, applies a mathematical transformation, and passes results forward.';
    const EDGE_INFO = 'This connection has a weight — a number adjusted during training. A high weight means this connection strongly influences the output.';
    const PARAMS_INFO = 'After training, all connection weights are frozen. This frozen set of numbers IS the model. Every answer it gives comes from applying these fixed numbers to your input.';
    const INFERENCE_INFO = 'When you ask a question, the system applies the fixed parameters to your prompt to calculate an answer. This process is called inference — no learning happens here.';
    const DEFAULT_INFO = 'Click any training-data card, network node, connection, the parameters panel, or the inference box to learn what it does.';

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .nnlp-wrap { width: 100%; background: #f5f5f5; box-sizing: border-box; }
      .nnlp-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 2px 4px; }
      .nnlp-stages { display: flex; width: 100%; height: 380px; gap: 0; }
      .nnlp-panel { box-sizing: border-box; padding: 8px; position: relative; }
      .nnlp-left { width: 24%; background: #e3f2fd; border-radius: 8px; }
      .nnlp-center { width: 46%; background: #ffffff; border-radius: 8px; }
      .nnlp-right { width: 24%; background: #fff8e1; border-radius: 8px; cursor: pointer; }
      .nnlp-arrowcol { width: 3%; display: flex; align-items: center;
        justify-content: center; }
      .nnlp-arrow { font-size: 26px; color: #FF8C00; }
      .nnlp-stage-label { text-align: center; font-weight: bold; font-size: 14px;
        margin-bottom: 6px; }
      .nnlp-stage-sub { text-align: center; font-size: 11px; color: #666; }
      .nnlp-card { display: flex; align-items: center; gap: 8px; background: white;
        border: 1px solid #90caf9; border-radius: 6px; padding: 7px 8px;
        margin: 7px 2px; cursor: pointer; font-size: 13px; user-select: none; }
      .nnlp-card:hover { background: #bbdefb; }
      .nnlp-card .ic { font-size: 18px; }
      #nnlp-network { width: 100%; height: 310px; }
      .nnlp-params { margin-top: 4px; }
      .nnlp-bar { height: 9px; border-radius: 4px; margin: 6px 4px;
        background: linear-gradient(90deg, #4682B4, #FF8C00); opacity: 0.85; }
      .nnlp-params-label { font-size: 12px; text-align: center; color: #444;
        margin: 4px 0; }
      .nnlp-down-arrow { text-align: center; font-size: 20px; color: #FF8C00; }
      .nnlp-infer { background: white; border: 2px dashed #FF8C00; border-radius: 6px;
        padding: 8px; text-align: center; font-size: 13px; font-weight: bold;
        cursor: pointer; }
      .nnlp-infer:hover { background: #ffe0b2; }
      .nnlp-info { min-height: 96px; margin-top: 8px; background: white;
        border: 1px solid #ccc; border-radius: 8px; padding: 10px 14px;
        font-size: 14px; line-height: 1.45; box-sizing: border-box; }
      .nnlp-info b { color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'nnlp-wrap';
    wrap.innerHTML = `
      <div class="nnlp-title">Neural Network Learning Pathway</div>
      <div class="nnlp-stages">
        <div class="nnlp-panel nnlp-left">
          <div class="nnlp-stage-label">1. Training Data</div>
          <div id="nnlp-cards"></div>
        </div>
        <div class="nnlp-arrowcol"><span class="nnlp-arrow">⇢</span></div>
        <div class="nnlp-panel nnlp-center">
          <div class="nnlp-stage-label">2. Neural Network — Training phase</div>
          <div id="nnlp-network"></div>
          <div class="nnlp-stage-sub">Parameter adjustment</div>
        </div>
        <div class="nnlp-arrowcol"><span class="nnlp-arrow">⇢</span></div>
        <div class="nnlp-panel nnlp-right" id="nnlp-params-panel">
          <div class="nnlp-stage-label">3. Model Parameters</div>
          <div class="nnlp-params" id="nnlp-bars"></div>
          <div class="nnlp-params-label">7 billion parameters (example)</div>
          <div class="nnlp-down-arrow">▼</div>
          <div class="nnlp-infer" id="nnlp-infer">Inference Output<br/>
            <span style="font-weight:normal;font-size:11px">"The answer is..."</span></div>
        </div>
      </div>
      <div class="nnlp-info" id="nnlp-info"></div>
    `;
    main.appendChild(wrap);

    const infoBox = document.getElementById('nnlp-info');
    function showInfo(title, text) {
        infoBox.innerHTML = '<b>' + title + ':</b> ' + text;
    }
    showInfo('Explore', DEFAULT_INFO);

    // training data cards
    const cardsDiv = document.getElementById('nnlp-cards');
    trainingData.forEach(function (d) {
        const card = document.createElement('div');
        card.className = 'nnlp-card';
        card.innerHTML = '<span class="ic">' + d.icon + '</span><span>' + d.label + '</span>';
        card.addEventListener('click', function () { showInfo(d.label, d.info); });
        cardsDiv.appendChild(card);
    });

    // parameter slider bars (varying widths to suggest weights)
    const barsDiv = document.getElementById('nnlp-bars');
    [82, 55, 95, 40, 70, 60, 88].forEach(function (w) {
        const bar = document.createElement('div');
        bar.className = 'nnlp-bar';
        bar.style.width = w + '%';
        barsDiv.appendChild(bar);
    });

    document.getElementById('nnlp-params-panel').addEventListener('click', function () {
        showInfo('Model Parameters', PARAMS_INFO);
    });
    document.getElementById('nnlp-infer').addEventListener('click', function (e) {
        e.stopPropagation();
        showInfo('Inference Output', INFERENCE_INFO);
    });

    // ---------- vis-network: 4-6-2 feed-forward network ----------
    const layers = [4, 6, 2];
    const xs = [-180, 0, 180];
    const nodes = [];
    let id = 1;
    const layerIds = [];
    layers.forEach(function (count, li) {
        const ids = [];
        const spacing = 260 / (count - 1 || 1);
        for (let i = 0; i < count; i++) {
            const y = -130 + i * spacing + (count === 1 ? 130 : 0);
            nodes.push({
                id: id, x: xs[li], y: y, shape: 'dot', size: 13,
                color: { background: li === 0 ? '#4682B4' : (li === 2 ? '#FF8C00' : '#9e9e9e'),
                         border: '#555' },
                fixed: true, label: undefined
            });
            ids.push(id);
            id++;
        }
        layerIds.push(ids);
    });

    // edges colored blue->orange by deterministic pseudo-weight
    const edges = [];
    let eid = 0;
    function weightColor(t) {
        // t in [0,1]: blue (#4682B4) to orange (#FF8C00)
        const r = Math.round(70 + t * (255 - 70));
        const g = Math.round(130 + t * (140 - 130));
        const b = Math.round(180 + t * (0 - 180));
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    for (let li = 0; li < layerIds.length - 1; li++) {
        layerIds[li].forEach(function (a, ai) {
            layerIds[li + 1].forEach(function (b, bi) {
                const t = ((ai * 7 + bi * 5 + li * 3) % 10) / 9; // deterministic spread
                edges.push({ id: 'e' + (eid++), from: a, to: b,
                    color: { color: weightColor(t), opacity: 0.7 },
                    width: 1 + t * 2.2 });
            });
        });
    }

    const container = document.getElementById('nnlp-network');
    const network = new vis.Network(container,
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
        {
            layout: { improvedLayout: false },
            physics: { enabled: false },
            interaction: {
                selectConnectedEdges: false,
                zoomView: false,
                dragView: false,
                dragNodes: false,
                navigationButtons: false,
                hover: true
            },
            edges: { smooth: false, arrows: { to: { enabled: false } } }
        });
    network.fit({ animation: false });

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            showInfo('Network node', NODE_INFO);
        } else if (params.edges.length > 0) {
            showInfo('Connection (weight)', EDGE_INFO);
        }
    });
});
