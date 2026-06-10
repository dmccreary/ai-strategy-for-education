// Concept Learning Graph — Fractions MicroSim
// Trace prerequisite dependencies in a concept graph and see why
// topological ordering matters for adaptive content sequencing.
// CANVAS_HEIGHT: 540
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const COLORS = {
        gray:   { background: '#9e9e9e', border: '#666' },
        blue:   { background: '#4682B4', border: '#2c5d8f' },
        teal:   { background: '#00897b', border: '#00564d' },
        orange: { background: '#FF8C00', border: '#c46a00' },
        deep:   { background: '#E65100', border: '#9c3c00' },
        faded:  { background: '#eeeeee', border: '#cccccc' }
    };

    const concepts = [
        { id: 1, label: 'Number Sense', x: 0, y: -200, color: 'gray',
          info: 'Understanding what numbers represent and how they relate. No mathematical prerequisites.' },
        { id: 2, label: 'Division', x: -150, y: -105, color: 'gray',
          info: 'Depends on: Number Sense. Must be understood before fractions can be meaningful.' },
        { id: 3, label: 'Fractions', x: -60, y: -10, color: 'blue',
          info: 'Depends on: Division, Number Sense. A fraction is a number expressing division of a whole.' },
        { id: 4, label: 'Equivalent\nFractions', x: -200, y: 90, color: 'blue',
          info: 'Depends on: Fractions. Different expressions of the same value.' },
        { id: 5, label: 'Fraction\nAddition', x: -330, y: 195, color: 'teal',
          info: 'Depends on: Equivalent Fractions. Requires common denominators — only possible once equivalent fractions are understood.' },
        { id: 6, label: 'Fraction\nMultiplication', x: 110, y: 90, color: 'teal',
          info: 'Depends on: Fractions. Simpler prerequisite structure than addition.' },
        { id: 7, label: 'Fraction\nDivision', x: -10, y: 195, color: 'orange',
          info: 'Depends on: Fraction Multiplication, Equivalent Fractions. The most complex operation in this sequence.' },
        { id: 8, label: 'Ratios and\nProportions', x: -130, y: 295, color: 'deep',
          info: 'Depends on: Equivalent Fractions, Fraction Division. A key bridge to algebra and statistics.' }
    ];

    // edges run dependent -> prerequisite
    const deps = [
        [3, 2], [3, 1], [4, 3], [5, 4], [6, 3], [7, 6], [7, 4], [8, 4], [8, 7]
    ];

    const labelOf = {};
    concepts.forEach(function (c) { labelOf[c.id] = c.label.replace(/\n/g, ' '); });

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .clg-wrap { width: 100%; background: white; box-sizing: border-box; }
      .clg-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .clg-row { display: flex; width: 100%; height: 490px; }
      .clg-net { width: 64%; height: 100%; position: relative; }
      #clg-network { width: 100%; height: 100%; }
      .clg-legend { position: absolute; bottom: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .clg-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .clg-panel { width: 36%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .clg-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .clg-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .clg-info .chain { margin-top: 8px; font-size: 13px; color: #555; }
      .clg-reset { align-self: flex-start; padding: 7px 14px; font-size: 13px;
        border: 1px solid #888; background: #f0f0f0; border-radius: 6px;
        cursor: pointer; }
      .clg-reset:hover { background: #e0e0e0; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'clg-wrap';
    wrap.innerHTML = `
      <div class="clg-title">Concept Learning Graph — Fractions</div>
      <div class="clg-row">
        <div class="clg-net">
          <div id="clg-network"></div>
          <div class="clg-legend">
            Depth: <span class="sw" style="background:#9e9e9e"></span>foundational
            <span class="sw" style="background:#4682B4"></span>level 2
            <span class="sw" style="background:#00897b"></span>level 3
            <span class="sw" style="background:#FF8C00"></span>advanced
            <span class="sw" style="background:#E65100"></span>bridge to algebra
          </div>
        </div>
        <div class="clg-panel">
          <div class="clg-info" id="clg-info">
            <h3>Trace the prerequisites</h3>
            Click any concept to highlight everything a student must master
            first — its full prerequisite chain. This dependency structure is
            what lets an adaptive engine sequence content correctly.
          </div>
          <button class="clg-reset" id="clg-reset">Reset highlighting</button>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function nodeSpec(c, colorKey, fade) {
        const col = COLORS[colorKey];
        return {
            id: c.id, label: c.label, x: c.x, y: c.y, fixed: true,
            shape: 'box', margin: 9, borderWidth: fade ? 1 : 2,
            color: { background: col.background, border: col.border },
            font: { size: 13, color: fade ? '#aaa' : 'white', face: 'Arial' },
            shadow: { enabled: !fade, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const nodes = new vis.DataSet(concepts.map(function (c) {
        return nodeSpec(c, c.color, false);
    }));

    const edges = new vis.DataSet(deps.map(function (d, i) {
        return {
            id: 'e' + i, from: d[0], to: d[1],
            title: labelOf[d[0]] + ' depends on ' + labelOf[d[1]],
            color: { color: '#888' }, width: 2,
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'curvedCW', roundness: 0.08 }
        };
    }));

    // adjacency: node -> direct prerequisites
    const prereqOf = {};
    deps.forEach(function (d) {
        (prereqOf[d[0]] = prereqOf[d[0]] || []).push(d[1]);
    });

    function ancestorsOf(id) {
        const seen = new Set([id]);
        const stack = [id];
        while (stack.length) {
            const cur = stack.pop();
            (prereqOf[cur] || []).forEach(function (p) {
                if (!seen.has(p)) { seen.add(p); stack.push(p); }
            });
        }
        return seen;
    }

    const container = document.getElementById('clg-network');
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

    const infoBox = document.getElementById('clg-info');

    function resetHighlight() {
        concepts.forEach(function (c) { nodes.update(nodeSpec(c, c.color, false)); });
        deps.forEach(function (d, i) {
            edges.update({ id: 'e' + i, color: { color: '#888' }, width: 2 });
        });
    }

    network.on('click', function (params) {
        if (params.nodes.length === 0) return;
        const id = params.nodes[0];
        const c = concepts.find(function (x) { return x.id === id; });
        const chain = ancestorsOf(id);

        concepts.forEach(function (n) {
            nodes.update(nodeSpec(n, chain.has(n.id) ? n.color : 'faded',
                !chain.has(n.id)));
        });
        deps.forEach(function (d, i) {
            const inChain = chain.has(d[0]) && chain.has(d[1]);
            edges.update({ id: 'e' + i,
                color: { color: inChain ? '#E65100' : '#e0e0e0' },
                width: inChain ? 3 : 1.5 });
        });

        const prereqNames = Array.from(chain)
            .filter(function (x) { return x !== id; })
            .map(function (x) { return labelOf[x]; });
        infoBox.innerHTML = '<h3>' + labelOf[id] + '</h3>' + c.info +
            '<div class="chain"><b>Prerequisite chain:</b> ' +
            (prereqNames.length ? prereqNames.join(' → ') : 'none — this is a foundational concept') +
            '</div>';
    });

    document.getElementById('clg-reset').addEventListener('click', function () {
        resetHighlight();
        infoBox.innerHTML = '<h3>Trace the prerequisites</h3>' +
            'Click any concept to highlight everything a student must master ' +
            'first — its full prerequisite chain.';
    });
});
