// Algorithmic Bias Sources MicroSim
// How bias enters and propagates through an AI system — and where
// interventions can break the chain.
// CANVAS_HEIGHT: 520
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        inequity: {
            title: 'Historical Inequity',
            text: 'Historical inequities in education — unequal discipline rates, resource disparities, tracking by race or income — are recorded in the data that AI systems are trained on. The AI learns the pattern, including the inequity.'
        },
        data: {
            title: 'Biased Training Data',
            text: 'Training data that over-represents some groups and under-represents others, or that reflects historical biased decisions, will produce models that perpetuate those patterns.'
        },
        framing: {
            title: 'Problem Framing Bias',
            text: 'The choice of what the AI is optimizing for can embed bias. Optimizing for “likelihood of college graduation based on historical rates” bakes in historical access disparities.'
        },
        training: {
            title: 'Model Training',
            text: 'The technical training process itself can amplify biases in data, particularly when the training set is small or unrepresentative of some groups.'
        },
        system: {
            title: 'Biased AI System',
            text: 'The resulting AI system produces recommendations, scores, or classifications that systematically disadvantage certain groups — even though no individual decision was intentionally discriminatory.'
        },
        outcomes: {
            title: 'Disparate Student Outcomes',
            text: 'Certain student groups receive less beneficial AI tutoring recommendations, are disproportionately flagged by early-alert systems, or are steered toward less ambitious pathways.'
        },
        audit: {
            title: 'Bias Audit',
            text: 'INTERVENTION: Before deployment, evaluate model performance by demographic group. Require vendors to provide disaggregated test results.'
        },
        monitoring: {
            title: 'Outcome Monitoring',
            text: 'INTERVENTION: After deployment, monitor actual outcomes by demographic group. If disparities appear, investigate and intervene.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .abs-wrap { width: 100%; background: white; box-sizing: border-box; }
      .abs-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .abs-row { display: flex; width: 100%; height: 470px; }
      .abs-net { width: 64%; height: 100%; position: relative; }
      #abs-network { width: 100%; height: 100%; }
      .abs-legend { position: absolute; top: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .abs-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .abs-panel { width: 36%; box-sizing: border-box; padding: 10px; }
      .abs-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .abs-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'abs-wrap';
    wrap.innerHTML = `
      <div class="abs-title">How Bias Enters an AI System — and Where to Intervene</div>
      <div class="abs-row">
        <div class="abs-net">
          <div id="abs-network"></div>
          <div class="abs-legend">
            <span class="sw" style="background:#c62828"></span>Bias source
            &nbsp;<span class="sw" style="background:#9e9e9e"></span>Technical process
            &nbsp;<span class="sw" style="background:#E65100"></span>Biased result
            &nbsp;<span class="sw" style="background:#43a047"></span>Intervention point
          </div>
        </div>
        <div class="abs-panel">
          <div class="abs-info" id="abs-info">
            <h3>Trace the causal chain</h3>
            Click each node, left to right, to follow how historical inequity
            becomes disparate student outcomes — then click the two green
            intervention nodes to see where the chain can be broken.
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

    const RED = '#c62828', RED_B = '#8e0000';
    const GREEN = '#43a047', GREEN_B = '#1b5e20';

    const nodes = new vis.DataSet([
        makeNode('inequity', 'Historical\nInequity', -340, -25, RED, RED_B, 16),
        makeNode('data', 'Biased\nTraining Data', -185, -85, RED, RED_B),
        makeNode('framing', 'Problem\nFraming Bias', -185, 70, RED, RED_B),
        makeNode('training', 'Model\nTraining', -15, -10, '#9e9e9e', '#666'),
        makeNode('system', 'Biased\nAI System', 145, -20, '#E65100', '#9c3c00', 16),
        makeNode('outcomes', 'Disparate Student\nOutcomes', 320, 40, RED, RED_B, 16),
        makeNode('audit', 'Bias Audit', -15, -160, GREEN, GREEN_B),
        makeNode('monitoring', 'Outcome\nMonitoring', 145, -170, GREEN, GREEN_B)
    ]);

    function chainEdge(from, to) {
        return {
            from: from, to: to,
            color: { color: '#8e0000' }, width: 2.5,
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { type: 'curvedCW', roundness: 0.08 }
        };
    }
    function interventionEdge(from, to, label) {
        return {
            from: from, to: to, label: label,
            font: { size: 11, color: '#1b5e20', background: 'white',
                    face: 'Arial' },
            color: { color: GREEN }, width: 2, dashes: [6, 5],
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'curvedCW', roundness: 0.1 }
        };
    }

    const edges = new vis.DataSet([
        chainEdge('inequity', 'data'),
        chainEdge('framing', 'training'),
        chainEdge('data', 'training'),
        chainEdge('training', 'system'),
        chainEdge('system', 'outcomes'),
        interventionEdge('audit', 'training', 'catches before deployment'),
        interventionEdge('monitoring', 'system', 'detects post-deployment')
    ]);

    const container = document.getElementById('abs-network');
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

    const infoBox = document.getElementById('abs-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
