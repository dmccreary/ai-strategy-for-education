// Idea Funnel Stages MicroSim
// The six stages from raw idea to funded, evaluated project.
// CANVAS_HEIGHT: 560
// Library: SVG funnel (vis-network CDN unused by design — trapezoid layers)

document.addEventListener('DOMContentLoaded', function () {

    const stages = [
        { id: 1, name: 'Stage 1: Gather', color: '#b0bec5', text: '#333',
          qty: '50–200 ideas/year',
          info: 'Run one-hour AI literacy sessions. Open submission forms to teachers, staff, students, and families. Goal: many diverse ideas, no filtering yet.' },
        { id: 2, name: 'Stage 2: Register', color: '#4682B4', text: 'white',
          qty: 'All submitted ideas',
          info: 'Enter every submitted idea into the idea registry with standardized metadata: problem statement, proposed approach, expected benefit, affected stakeholders, rough cost, and risk flag.' },
        { id: 3, name: 'Stage 3: Evaluate', color: '#00897b', text: 'white',
          qty: 'Ideas above minimum threshold',
          info: 'Score each idea on a rubric: feasibility (1–5), risk (1–5), benefit (1–5), cost (1–5), equity impact (1–5). Expert review panel scores ideas above a threshold.' },
        { id: 4, name: 'Stage 4: Select', color: '#FF8C00', text: 'white',
          qty: 'Top 10–20%',
          info: 'Review scored ideas as a portfolio. Select projects balancing quick wins (high feasibility, lower impact) and strategic bets (transformative but harder). Board or executive approval.' },
        { id: 5, name: 'Stage 5: Resource', color: '#E65100', text: 'white',
          qty: 'Funded projects (3–10/year)',
          info: 'Assign team members, budget, and timeline to funded projects. Create project charters. Establish success metrics.' },
        { id: 6, name: 'Stage 6: Evaluate Outcomes', color: '#bf360c', text: 'white',
          qty: 'Completed projects',
          info: 'Measure results against pre-defined KPIs. Document lessons learned. Feed insights back into Stage 1 for the next cycle.' }
    ];

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .ifs-wrap { width: 100%; background: white; box-sizing: border-box; }
      .ifs-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .ifs-row { display: flex; width: 100%; height: 510px; }
      .ifs-funnel { width: 60%; height: 100%; }
      .ifs-funnel svg { width: 100%; height: 100%; }
      .ifs-layer { cursor: pointer; transition: opacity 0.2s; }
      .ifs-layer text { pointer-events: none; }
      .ifs-panel { width: 40%; box-sizing: border-box; padding: 10px; }
      .ifs-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .ifs-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .ifs-info .qty { margin-top: 8px; font-size: 13px; color: #555;
        font-style: italic; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'ifs-wrap';
    wrap.innerHTML = `
      <div class="ifs-title">The Idea Funnel — Six Stages</div>
      <div class="ifs-row">
        <div class="ifs-funnel" id="ifs-funnel"></div>
        <div class="ifs-panel">
          <div class="ifs-info" id="ifs-info">
            <h3>From many ideas to funded projects</h3>
            Click any funnel layer to see what happens at that stage and what
            gate an idea must pass to continue downward. The arrow on the
            right shows outcomes feeding back into the next gathering cycle.
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- SVG funnel ----------
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const VB_W = 760, VB_H = 500;
    const cx = 430;                 // funnel horizontal center
    const topY = 14, layerH = 68, gap = 9;
    const widths = [520, 450, 380, 310, 240, 175];

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VB_W + ' ' + VB_H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    document.getElementById('ifs-funnel').appendChild(svg);

    // arrowhead marker
    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.innerHTML = '<marker id="ifs-arr" markerWidth="8" markerHeight="8" ' +
        'refX="6" refY="3" orient="auto">' +
        '<path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker>';
    svg.appendChild(defs);

    const layerGroups = [];

    stages.forEach(function (s, i) {
        const wTop = widths[i];
        const wBot = (i < stages.length - 1)
            ? (widths[i] + widths[i + 1]) / 2 - 18
            : widths[i] - 30;
        const y = topY + i * (layerH + gap);

        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', 'ifs-layer');

        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points',
            (cx - wTop / 2) + ',' + y + ' ' +
            (cx + wTop / 2) + ',' + y + ' ' +
            (cx + wBot / 2) + ',' + (y + layerH) + ' ' +
            (cx - wBot / 2) + ',' + (y + layerH));
        poly.setAttribute('fill', s.color);
        poly.setAttribute('stroke', '#555');
        poly.setAttribute('stroke-width', '1');
        poly.setAttribute('rx', '4');
        g.appendChild(poly);

        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('x', cx);
        label.setAttribute('y', y + layerH / 2 + 6);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '17');
        label.setAttribute('font-weight', 'bold');
        label.setAttribute('font-family', 'Arial, sans-serif');
        label.setAttribute('fill', s.text);
        label.textContent = s.name;
        g.appendChild(label);

        // left-side quantity label
        const qty = document.createElementNS(SVG_NS, 'text');
        qty.setAttribute('x', 150);
        qty.setAttribute('y', y + layerH / 2 + 4);
        qty.setAttribute('text-anchor', 'end');
        qty.setAttribute('font-size', '12');
        qty.setAttribute('font-family', 'Arial, sans-serif');
        qty.setAttribute('fill', '#666');
        qty.textContent = s.qty;
        svg.appendChild(qty);

        // right-side flow arrow to next stage
        if (i < stages.length - 1) {
            const x1 = cx + wBot / 2 + 26;
            const arrow = document.createElementNS(SVG_NS, 'path');
            arrow.setAttribute('d', 'M ' + (x1 + 14) + ' ' + (y + layerH - 18) +
                ' Q ' + (x1 + 30) + ' ' + (y + layerH + gap / 2) + ' ' +
                (x1 + 2) + ' ' + (y + layerH + gap + 16));
            arrow.setAttribute('fill', 'none');
            arrow.setAttribute('stroke', '#888');
            arrow.setAttribute('stroke-width', '2');
            arrow.setAttribute('marker-end', 'url(#ifs-arr)');
            svg.appendChild(arrow);
        }

        g.addEventListener('click', function () { selectStage(i); });
        svg.appendChild(g);
        layerGroups.push(g);
    });

    // feedback loop arrow: stage 6 back to stage 1 (far right side)
    const fb = document.createElementNS(SVG_NS, 'path');
    const lastY = topY + 5 * (layerH + gap) + layerH / 2;
    fb.setAttribute('d', 'M ' + (cx + 110) + ' ' + lastY +
        ' C 740 ' + lastY + ', 740 ' + (topY + layerH / 2) + ', ' +
        (cx + 285) + ' ' + (topY + layerH / 2));
    fb.setAttribute('fill', 'none');
    fb.setAttribute('stroke', '#aaa');
    fb.setAttribute('stroke-width', '2');
    fb.setAttribute('stroke-dasharray', '6,5');
    fb.setAttribute('marker-end', 'url(#ifs-arr)');
    svg.appendChild(fb);
    const fbLabel = document.createElementNS(SVG_NS, 'text');
    fbLabel.setAttribute('x', 742);
    fbLabel.setAttribute('y', VB_H / 2);
    fbLabel.setAttribute('text-anchor', 'middle');
    fbLabel.setAttribute('font-size', '11');
    fbLabel.setAttribute('font-family', 'Arial, sans-serif');
    fbLabel.setAttribute('fill', '#888');
    fbLabel.setAttribute('transform', 'rotate(90 742 ' + (VB_H / 2) + ')');
    fbLabel.textContent = 'lessons learned feed the next cycle';
    svg.appendChild(fbLabel);

    const infoBox = document.getElementById('ifs-info');
    function selectStage(idx) {
        layerGroups.forEach(function (g, i) {
            g.style.opacity = (i === idx) ? '1' : '0.35';
        });
        const s = stages[idx];
        infoBox.innerHTML = '<h3>' + s.name + '</h3>' + s.info +
            '<div class="qty">Typical volume: ' + s.qty + '</div>';
    }
});
