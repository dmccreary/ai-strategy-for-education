// Build vs Buy Decision Framework MicroSim
// Interactive decision flowchart for build-versus-buy evaluation of
// AI use cases in an educational institution.
// CANVAS_HEIGHT: 580
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        start: {
            title: 'New AI Use Case',
            text: 'Every evaluation starts here. Write the use case down in one sentence — who benefits, what changes — before tracing the decision path.'
        },
        d1: {
            title: 'Does a mature packaged product exist?',
            text: 'Search the vendor landscape first. A mature product means 3+ school-district deployments with published outcomes data.'
        },
        d2: {
            title: 'Can the vendor meet data/privacy requirements?',
            text: 'FERPA, COPPA, state privacy laws, and district data agreements must all be satisfied before any student data enters a vendor system.'
        },
        d3: {
            title: 'Is the use case highly institution-specific?',
            text: 'If your use case requires knowledge of your specific curriculum, community, or workflow that no vendor has, custom becomes more justifiable.'
        },
        a: {
            title: 'Buy: Packaged Product',
            text: 'Lowest implementation cost. Focus effort on procurement, onboarding, and outcome measurement.'
        },
        b: {
            title: 'Buy: API + Light Configuration',
            text: 'Good for use cases where packaged products exist but don’t meet privacy requirements. Requires technical staff or a partner.'
        },
        c: {
            title: 'Build: Custom Solution',
            text: 'Reserve for genuinely unique needs. Document the total cost of ownership before committing — custom solutions are far more expensive to maintain than to build.'
        },
        d: {
            title: 'Revisit in 6–12 Months',
            text: 'If no mature product exists and the use case is not institution-specific enough to justify a custom build, wait. The vendor market moves fast.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .bvb-wrap { width: 100%; background: white; box-sizing: border-box; }
      .bvb-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .bvb-row { display: flex; width: 100%; height: 530px; }
      .bvb-net { width: 64%; height: 100%; }
      #bvb-network { width: 100%; height: 100%; }
      .bvb-panel { width: 36%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .bvb-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .bvb-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .bvb-legend { font-size: 12px; color: #666; background: #fafafa;
        border: 1px solid #ddd; border-radius: 6px; padding: 8px 10px; }
      .bvb-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'bvb-wrap';
    wrap.innerHTML = `
      <div class="bvb-title">Build vs Buy — Decision Framework</div>
      <div class="bvb-row">
        <div class="bvb-net"><div id="bvb-network"></div></div>
        <div class="bvb-panel">
          <div class="bvb-info" id="bvb-info">
            <h3>Trace a decision path</h3>
            Pick a real AI use case from your institution, then click through
            the flowchart from the top. Click any node to read its decision
            criteria, and follow the Yes / No edges to a recommendation.
          </div>
          <div class="bvb-legend">
            <span class="sw" style="background:#FF8C00"></span>Decision
            &nbsp;<span class="sw" style="background:#4caf50"></span>Buy packaged
            &nbsp;<span class="sw" style="background:#00897b"></span>Buy API
            &nbsp;<span class="sw" style="background:#4682B4"></span>Build
            &nbsp;<span class="sw" style="background:#9e9e9e"></span>Wait
          </div>
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
            font: { size: 14, color: fontColor || 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const nodes = new vis.DataSet([
        makeNode('start', 'New AI Use Case', 0, -250, '#e0e0e0', '#888',
            'ellipse', '#333'),
        makeNode('d1', 'Mature packaged\nproduct exists?', 0, -140, '#FF8C00', '#c46a00'),
        makeNode('d2', 'Vendor meets data /\nprivacy requirements?', -190, -15, '#FF8C00', '#c46a00'),
        makeNode('d3', 'Use case highly\ninstitution-specific?', 190, -15, '#FF8C00', '#c46a00'),
        makeNode('a', 'Buy:\nPackaged Product', -290, 130, '#4caf50', '#2e7d32'),
        makeNode('b', 'Buy: API + Light\nConfiguration', -95, 130, '#00897b', '#00564d'),
        makeNode('c', 'Build:\nCustom Solution', 95, 130, '#4682B4', '#2c5d8f'),
        makeNode('d', 'Revisit in\n6–12 Months', 290, 130, '#9e9e9e', '#666')
    ]);

    function flowEdge(from, to, label, color) {
        return {
            from: from, to: to, label: label,
            font: { size: 13, color: color || '#555', background: 'white',
                    face: 'Arial' },
            color: { color: '#777' }, width: 2,
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { type: 'curvedCW', roundness: 0.05 }
        };
    }

    const edges = new vis.DataSet([
        flowEdge('start', 'd1', ''),
        flowEdge('d1', 'd2', 'Yes', '#2e7d32'),
        flowEdge('d1', 'd3', 'No', '#c62828'),
        flowEdge('d2', 'a', 'Yes', '#2e7d32'),
        flowEdge('d2', 'b', 'No', '#c62828'),
        flowEdge('d3', 'c', 'Yes', '#2e7d32'),
        flowEdge('d3', 'd', 'No', '#c62828')
    ]);

    const container = document.getElementById('bvb-network');
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

    const infoBox = document.getElementById('bvb-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
