// Learning Graph Taxonomy Structure MicroSim
// How concept nodes, prerequisite edges, and taxonomy groups combine
// to form a learning graph.
// CANVAS_HEIGHT: 490
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const GROUP_COLORS = {
        ARITH:   { background: '#4682B4', border: '#2c5d8f', label: 'Arithmetic' },
        ALGEBRA: { background: '#00897b', border: '#00564d', label: 'Algebra' },
        ADV:     { background: '#FF8C00', border: '#c46a00', label: 'Algebra (advanced)' },
        BIO:     { background: '#43a047', border: '#1b5e20', label: 'Biology' }
    };

    const concepts = [
        { id: 1, label: 'Number Sense', group: 'ARITH', x: -290, y: -40 },
        { id: 2, label: 'Addition', group: 'ARITH', x: -175, y: -48 },
        { id: 3, label: 'Multiplication', group: 'ARITH', x: -60, y: -40 },
        { id: 4, label: 'Linear\nEquations', group: 'ALGEBRA', x: 55, y: -48 },
        { id: 5, label: 'Slope', group: 'ALGEBRA', x: 170, y: -40 },
        { id: 6, label: 'Linear\nFunctions', group: 'ADV', x: 285, y: -48 },
        { id: 7, label: 'Photosynthesis', group: 'BIO', x: 60, y: 110 },
        { id: 8, label: 'Cell Biology', group: 'BIO', x: -75, y: 102 }
    ];

    // edges run dependent -> prerequisite
    const deps = [[2, 1], [3, 2], [4, 3], [5, 4], [6, 5], [7, 8]];

    const byId = {};
    concepts.forEach(function (c) { byId[c.id] = c; });
    function plainLabel(id) { return byId[id].label.replace(/\n/g, ' '); }

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .lgt-wrap { width: 100%; background: white; box-sizing: border-box; }
      .lgt-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .lgt-row { display: flex; width: 100%; height: 440px; }
      .lgt-net { width: 64%; height: 100%; }
      #lgt-network { width: 100%; height: 100%; }
      .lgt-panel { width: 36%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .lgt-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .lgt-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .lgt-info .meta { margin-top: 8px; font-size: 13px; color: #555; }
      .lgt-legend { font-size: 12px; color: #444; background: #fafafa;
        border: 1px solid #ddd; border-radius: 6px; padding: 8px 10px; }
      .lgt-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .lgt-legend div { margin: 2px 0; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'lgt-wrap';
    wrap.innerHTML = `
      <div class="lgt-title">Learning Graph Structure — Nodes, Edges, Taxonomy</div>
      <div class="lgt-row">
        <div class="lgt-net"><div id="lgt-network"></div></div>
        <div class="lgt-panel">
          <div class="lgt-info" id="lgt-info">
            <h3>Three building blocks</h3>
            A learning graph has <b>nodes</b> (concepts), <b>edges</b>
            (prerequisite dependencies), and a <b>taxonomy</b> (color-coded
            groups that organize concepts into clusters). Click any node to
            inspect it.
          </div>
          <div class="lgt-legend" id="lgt-legend">
            <div><b>Taxonomy groups</b></div>
            <div><span class="sw" style="background:#4682B4"></span>ARITH — Arithmetic</div>
            <div><span class="sw" style="background:#00897b"></span>ALGEBRA — Algebra</div>
            <div><span class="sw" style="background:#FF8C00"></span>ALGEBRA — advanced concept</div>
            <div><span class="sw" style="background:#43a047"></span>BIO — Biology (separate cluster)</div>
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    const nodes = new vis.DataSet(concepts.map(function (c) {
        const col = GROUP_COLORS[c.group];
        return {
            id: c.id, label: c.label, x: c.x, y: c.y, fixed: true,
            shape: 'box', margin: 9, borderWidth: 2,
            color: { background: col.background, border: col.border },
            font: { size: 16, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }));

    const edges = new vis.DataSet(deps.map(function (d, i) {
        return {
            id: 'e' + i, from: d[0], to: d[1],
            title: plainLabel(d[0]) + ' depends on ' + plainLabel(d[1]),
            color: { color: '#888' }, width: 2,
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'curvedCW', roundness: 0.08 }
        };
    }));

    const prereqOf = {};
    deps.forEach(function (d) {
        (prereqOf[d[0]] = prereqOf[d[0]] || []).push(d[1]);
    });

    const container = document.getElementById('lgt-network');
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

    const infoBox = document.getElementById('lgt-info');
    network.on('click', function (params) {
        if (params.nodes.length === 0) return;
        const c = byId[params.nodes[0]];
        const group = GROUP_COLORS[c.group];
        const prereqs = (prereqOf[c.id] || []).map(plainLabel);
        infoBox.innerHTML = '<h3>' + plainLabel(c.id) + '</h3>' +
            'Taxonomy group: <b>' + (c.group === 'ADV' ? 'ALGEBRA' : c.group) +
            '</b> (' + group.label + ')' +
            '<div class="meta"><b>Prerequisites:</b> ' +
            (prereqs.length ? prereqs.join(', ') : 'none — foundational concept') +
            '</div>' +
            '<div class="meta">Note how the Biology cluster is completely ' +
            'disconnected from the math clusters — taxonomy groups let one ' +
            'learning graph hold many subjects.</div>';
    });
});
