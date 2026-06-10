// AI Concept Hierarchy MicroSim
// How AI, Machine Learning, Neural Networks, LLMs, Generative AI, Tokens,
// and Context Windows relate to each other.
// CANVAS_HEIGHT: 560
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    // vis-network CSS (navigation button icons)
    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const TEAL = '#4682B4';
    const ORANGE = '#FF8C00';

    const conceptInfo = {
        ai: {
            term: 'Artificial Intelligence',
            def: 'Computer systems that perform tasks normally requiring human intelligence, such as understanding language, recognizing patterns, and making decisions. It is the broadest term in this hierarchy.',
            example: 'Education example: a district chatbot that answers parents’ enrollment questions in plain language.'
        },
        ml: {
            term: 'Machine Learning',
            def: 'A way of building AI where the system learns patterns from data instead of following hand-written rules. Performance improves as the system sees more examples.',
            example: 'Education example: an early-warning system that learns from past student data to flag students at risk of falling behind.'
        },
        nn: {
            term: 'Neural Network',
            def: 'A machine-learning architecture made of layers of simple processing units whose connection weights are adjusted during training. It is the key architecture behind modern AI.',
            example: 'Education example: the handwriting recognition that scores scanned answer sheets uses a neural network.'
        },
        llm: {
            term: 'Large Language Model (LLM)',
            def: 'A neural network with billions of parameters trained on massive amounts of text to predict the next token. LLMs power most generative AI tools used in schools today.',
            example: 'Education example: the model behind a lesson-plan drafting assistant.'
        },
        genai: {
            term: 'Generative AI',
            def: 'AI that creates new content — text, images, or audio — rather than only classifying existing data. Text-based generative AI is the LLM branch of this family.',
            example: 'Education example: generating a first draft of a parent newsletter that staff then edit.'
        },
        token: {
            term: 'Token',
            def: 'A fragment of text — roughly 4 characters — that the model processes as a single unit. Models read and write everything as sequences of tokens.',
            example: 'Education example: a 500-word student essay contains roughly 665 tokens; at $0.01 per 1,000 tokens, that costs less than one cent to process.'
        },
        cw: {
            term: 'Context Window',
            def: 'The maximum amount of text a model can consider at once, measured in tokens. Anything beyond the window is invisible to the model.',
            example: 'Education example: a 100,000-token context window can hold an entire student handbook, so the AI can answer questions about all of it at once.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .ach-wrap { width: 100%; background: white; box-sizing: border-box; }
      .ach-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .ach-row { display: flex; width: 100%; height: 510px; }
      .ach-net { width: 64%; height: 100%; position: relative; }
      #ach-network { width: 100%; height: 100%; }
      .ach-legend { position: absolute; bottom: 8px; right: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .ach-panel { width: 36%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .ach-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .ach-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .ach-info .ex { margin-top: 8px; font-size: 13px; color: #555;
        font-style: italic; }
      .ach-hint { font-size: 12px; color: #777; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'ach-wrap';
    wrap.innerHTML = `
      <div class="ach-title">The AI Concept Hierarchy</div>
      <div class="ach-row">
        <div class="ach-net">
          <div id="ach-network"></div>
          <div class="ach-legend">Larger node = more foundational concept</div>
        </div>
        <div class="ach-panel">
          <div class="ach-info" id="ach-info">
            <h3>Explore the hierarchy</h3>
            Click any node to see a plain-language definition and a concrete
            education example.
            <div class="ex">Hover over an edge label to see what the
            relationship means.</div>
          </div>
          <div class="ach-hint">Tip: use the navigation buttons in the lower
          left of the diagram to zoom or recenter.</div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function node(id, label, x, y, size, color) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: 'box', margin: 10,
            color: { background: color, border: '#2c5d8f' },
            font: { size: size, face: 'Arial', color: 'white' }
        };
    }

    const nodes = new vis.DataSet([
        node('ai', 'Artificial Intelligence', 0, -210, 22, TEAL),
        node('ml', 'Machine Learning', 0, -100, 19, TEAL),
        node('nn', 'Neural Network', -160, 15, 16, TEAL),
        node('llm', 'Large Language\nModel (LLM)', 110, 10, 16, TEAL),
        node('genai', 'Generative AI', -90, 150, 14, ORANGE),
        node('token', 'Token', 110, 160, 14, ORANGE),
        node('cw', 'Context Window', 280, 150, 14, ORANGE)
    ]);

    function edge(from, to, label, tip) {
        return {
            from: from, to: to, label: label, title: tip,
            font: { size: 11, face: 'Arial', color: '#555', align: 'middle',
                    background: 'white' },
            color: { color: '#888' },
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'curvedCW', roundness: 0.1 }
        };
    }

    const edges = new vis.DataSet([
        edge('ai', 'ml', 'dominant modern approach',
            'Machine learning is the dominant modern approach to building AI systems.'),
        edge('ml', 'nn', 'key architecture',
            'Neural networks are the key architecture used in modern machine learning.'),
        edge('ml', 'llm', 'trained at scale on text',
            'LLMs are machine-learning systems trained at enormous scale on text.'),
        edge('llm', 'genai', 'text branch of',
            'LLMs are the text-generating branch of the generative AI family.'),
        edge('llm', 'token', 'processes text as',
            'An LLM reads and writes all text as sequences of tokens.'),
        edge('llm', 'cw', 'bounded by',
            'An LLM can only consider as much text as fits in its context window.')
    ]);

    const container = document.getElementById('ach-network');
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
        },
        nodes: {
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        }
    });
    network.fit({ animation: false });

    const infoBox = document.getElementById('ach-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const c = conceptInfo[params.nodes[0]];
            if (c) {
                infoBox.innerHTML = '<h3>' + c.term + '</h3>' + c.def +
                    '<div class="ex">' + c.example + '</div>';
            }
        }
    });
});
