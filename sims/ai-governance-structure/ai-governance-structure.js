// AI Governance Structure MicroSim
// Interactive organizational chart of a hybrid AI governance model —
// trace how a tool adoption request moves through the system.
// CANVAS_HEIGHT: 540
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        steering: {
            title: 'AI Steering Committee',
            text: 'The senior governance body. Sets the AI strategy, approves the annual portfolio, reviews quarterly reports, and resolves policy disputes. Typically chaired by the superintendent or provost with board representation.'
        },
        coe: {
            title: 'Center of Excellence (CoE)',
            text: 'The operational hub. Maintains standards, runs the idea funnel, evaluates vendors, manages the shared code repository, and provides enablement support. Reports to the Steering Committee.'
        },
        privacy: {
            title: 'Privacy & Compliance Office',
            text: 'Reviews all AI tools for FERPA, COPPA, and state privacy law compliance before approval. Conducts annual audits of deployed tools. Reports concerns to the Steering Committee.'
        },
        principal: {
            title: 'School Principal / Department Chair',
            text: 'Local champion. Submits ideas to the funnel, facilitates teacher adoption, monitors school-level outcomes, and escalates issues to the CoE. Has delegated authority to approve low-risk tools from the approved vendor list.'
        },
        champion: {
            title: 'Teacher AI Champion',
            text: 'The teacher most familiar with AI tools in a given school. Provides peer training, gathers feedback on tool effectiveness, and surfaces issues and ideas to the principal.'
        },
        funnel: {
            title: 'Idea Funnel',
            text: 'The process (managed by the CoE) through which AI ideas from any level of the organization are evaluated and selected. Covered in the Idea Funnel and Selecting Projects chapters.'
        },
        vendors: {
            title: 'Approved Vendor List',
            text: 'A maintained list of vendors whose tools have been evaluated for privacy compliance, bias risk, and xAPI capability. Schools can adopt tools from this list with minimal additional approval.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .ags-wrap { width: 100%; background: white; box-sizing: border-box; }
      .ags-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .ags-row { display: flex; width: 100%; height: 490px; }
      .ags-net { width: 64%; height: 100%; position: relative; }
      #ags-network { width: 100%; height: 100%; }
      .ags-legend { position: absolute; top: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .ags-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .ags-panel { width: 36%; box-sizing: border-box; padding: 10px; }
      .ags-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .ags-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'ags-wrap';
    wrap.innerHTML = `
      <div class="ags-title">Hybrid AI Governance Structure</div>
      <div class="ags-row">
        <div class="ags-net">
          <div id="ags-network"></div>
          <div class="ags-legend">
            <span class="sw" style="background:#E65100"></span>Senior governance
            &nbsp;<span class="sw" style="background:#FF8C00"></span>Operational hub
            &nbsp;<span class="sw" style="background:#4682B4"></span>Compliance
            &nbsp;<span class="sw" style="background:#00897b"></span>School level
            &nbsp;<span class="sw" style="background:#9e9e9e"></span>Process / asset
          </div>
        </div>
        <div class="ags-panel">
          <div class="ags-info" id="ags-info">
            <h3>Trace a tool request</h3>
            Click any node to see its decision-making authority. Follow the
            edges to trace how a teacher’s tool idea moves up through the
            funnel — and how standards and approvals flow back down.
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
        makeNode('steering', 'AI Steering\nCommittee', 0, -190, '#E65100', '#9c3c00', 16),
        makeNode('coe', 'Center of\nExcellence (CoE)', -160, -65, '#FF8C00', '#c46a00', 15),
        makeNode('privacy', 'Privacy &\nCompliance Office', 175, -65, '#4682B4', '#2c5d8f'),
        makeNode('principal', 'School Principal /\nDepartment Chair', 70, 62, '#00897b', '#00564d'),
        makeNode('champion', 'Teacher AI\nChampion', 210, 165, '#00897b', '#00564d'),
        makeNode('funnel', 'Idea Funnel', -200, 100, '#9e9e9e', '#666'),
        makeNode('vendors', 'Approved\nVendor List', -350, 12, '#9e9e9e', '#666')
    ]);

    function labeledEdge(from, to, label, dashed) {
        return {
            from: from, to: to, label: label,
            font: { size: 10.5, color: '#555', background: 'white', face: 'Arial' },
            color: { color: '#777' }, width: 2,
            dashes: dashed ? [5, 5] : false,
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'curvedCW', roundness: 0.1 }
        };
    }

    const edges = new vis.DataSet([
        labeledEdge('steering', 'coe', 'strategy direction'),
        labeledEdge('steering', 'privacy', 'policy mandate'),
        labeledEdge('coe', 'funnel', 'manages'),
        labeledEdge('coe', 'vendors', 'maintains'),
        labeledEdge('coe', 'principal', 'standards + support'),
        labeledEdge('principal', 'champion', 'delegates to'),
        labeledEdge('principal', 'funnel', 'submits to', true),
        labeledEdge('champion', 'funnel', 'submits to', true)
    ]);

    const container = document.getElementById('ags-network');
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

    const infoBox = document.getElementById('ags-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
