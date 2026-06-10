// RAG Architecture Diagram MicroSim
// Trace the flow of a student question through a Retrieval-Augmented
// Generation system grounded in private institutional documents.
// CANVAS_HEIGHT: 500
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        question: {
            title: 'Student Question',
            text: 'A student or teacher asks a question in natural language: “Explain photosynthesis for a struggling 6th grader.”'
        },
        retrieval: {
            title: 'Retrieval Engine',
            text: 'Searches the institution’s private document collection (curriculum guides, standards, teacher notes) for the most relevant passages.'
        },
        library: {
            title: 'Institution Document Library',
            text: 'Contains: district curriculum standards, textbook content, lesson plans, student assessment data (anonymized). Never leaves institutional servers.'
        },
        context: {
            title: 'Retrieved Context',
            text: 'The 3–5 most relevant passages from the document library, passed to the language model along with the original question.'
        },
        llm: {
            title: 'Language Model',
            text: 'Generates a response grounded in the retrieved context. Without RAG, the model answers from general training data. With RAG, it answers from your specific curriculum.'
        },
        response: {
            title: 'Grounded Response',
            text: 'A response that reflects your district’s specific standards, vocabulary, and pedagogical approach — not generic internet content.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .rag-wrap { width: 100%; background: white; box-sizing: border-box; }
      .rag-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .rag-row { display: flex; width: 100%; height: 450px; }
      .rag-net { width: 66%; height: 100%; }
      #rag-network { width: 100%; height: 100%; }
      .rag-panel { width: 34%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .rag-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .rag-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .rag-hint { font-size: 12px; color: #777; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'rag-wrap';
    wrap.innerHTML = `
      <div class="rag-title">RAG Architecture — Retrieval-Augmented Generation</div>
      <div class="rag-row">
        <div class="rag-net"><div id="rag-network"></div></div>
        <div class="rag-panel">
          <div class="rag-info" id="rag-info">
            <h3>Trace the question</h3>
            Click each node, left to right, to follow a student question
            through the RAG pipeline — and see why grounding answers in your
            own documents matters for curriculum alignment.
          </div>
          <div class="rag-hint">The Document Library never leaves
            institutional servers — only the few most relevant passages are
            sent to the language model.</div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function makeNode(id, label, x, y, bg, border, shape, fontColor) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: shape || 'box', margin: 10, borderWidth: 2,
            color: { background: bg, border: border },
            font: { size: 15, color: fontColor || 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    // slight y zigzag avoids the vis-network horizontal edge-label bug
    const nodes = new vis.DataSet([
        makeNode('question', 'Student\nQuestion', -300, 55, '#e0e0e0', '#888', 'box', '#333'),
        makeNode('retrieval', 'Retrieval\nEngine', -150, 25, '#FF8C00', '#c46a00'),
        makeNode('library', 'Institution\nDocument Library', -150, -110, '#4682B4', '#2c5d8f', 'database'),
        makeNode('context', 'Retrieved\nContext', 0, 55, '#00897b', '#00564d'),
        makeNode('llm', 'Language\nModel', 150, 20, '#FF8C00', '#c46a00'),
        makeNode('response', 'Grounded\nResponse', 300, 55, '#4caf50', '#2e7d32')
    ]);

    function flowEdge(from, to, label, roundness) {
        return {
            from: from, to: to, label: label,
            font: { size: 11, color: '#555', background: 'white', face: 'Arial' },
            color: { color: '#777' }, width: 2,
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { type: 'curvedCW', roundness: roundness !== undefined ? roundness : 0.08 }
        };
    }

    const edges = new vis.DataSet([
        flowEdge('question', 'retrieval', 'query'),
        flowEdge('retrieval', 'library', 'search'),
        flowEdge('library', 'context', 'top results', 0.15),
        flowEdge('context', 'llm', 'context + question'),
        flowEdge('question', 'llm', 'original question', 0.45),
        flowEdge('llm', 'response', 'generates')
    ]);

    const container = document.getElementById('rag-network');
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

    const infoBox = document.getElementById('rag-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
