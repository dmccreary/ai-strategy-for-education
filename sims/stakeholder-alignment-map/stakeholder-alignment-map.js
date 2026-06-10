// Stakeholder Alignment Map MicroSim
// Interactive stakeholder map showing alignment, influence, and concerns
// for an institutional AI strategy.
// CANVAS_HEIGHT: 540
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const DEEP_ORANGE = '#E65100';
    const STEELBLUE = '#4682B4';
    const TEAL = '#00897b';
    const GRAY = '#9e9e9e';

    const nodeInfo = {
        strategy: {
            title: 'AI Strategy',
            text: 'The institution’s AI strategy sits at the center. Every stakeholder group around it must be engaged in the mode shown on its edge — sponsorship, approval, adoption, consultation, implementation, or negotiation.'
        },
        supt: {
            title: 'Superintendent / Provost',
            text: 'Executive sponsor. Must publicly champion the strategy, allocate budget, and remove obstacles. Primary concern: board and community trust.'
        },
        board: {
            title: 'School Board / Trustees',
            text: 'Governance body. Approves policy and budget. Primary concern: student safety, equity, and fiscal responsibility.'
        },
        teachers: {
            title: 'Teachers / Faculty',
            text: 'Front-line adopters. Must find AI tools genuinely helpful, not threatening. Primary concern: role displacement, workload, and academic integrity.'
        },
        students: {
            title: 'Students',
            text: 'Primary beneficiaries. Active voices in equity and access concerns. Primary concern: privacy, fairness, and whether AI tools help them learn.'
        },
        families: {
            title: 'Families & Parents',
            text: 'Community stakeholders. Strong influence on board and community trust. Primary concern: data privacy, screen time, and equity.'
        },
        it: {
            title: 'IT & Data Staff',
            text: 'Implementation enablers. Must integrate AI tools with existing systems securely. Primary concern: security, support burden, and technical debt.'
        },
        hr: {
            title: 'HR & Unions',
            text: 'Workforce stakeholders. Concerned about role changes and workload implications. Primary concern: job security and working conditions.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .sam-wrap { width: 100%; background: white; box-sizing: border-box; }
      .sam-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .sam-row { display: flex; width: 100%; height: 490px; }
      .sam-net { width: 64%; height: 100%; position: relative; }
      #sam-network { width: 100%; height: 100%; }
      .sam-legend { position: absolute; top: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .sam-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .sam-panel { width: 36%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .sam-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .sam-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .sam-hint { font-size: 12px; color: #777; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'sam-wrap';
    wrap.innerHTML = `
      <div class="sam-title">Stakeholder Alignment Map</div>
      <div class="sam-row">
        <div class="sam-net">
          <div id="sam-network"></div>
          <div class="sam-legend">
            <span class="sw" style="background:${DEEP_ORANGE}"></span>Strategy
            &nbsp;<span class="sw" style="background:${STEELBLUE}"></span>Executive / governance
            &nbsp;<span class="sw" style="background:${TEAL}"></span>Learning community
            &nbsp;<span class="sw" style="background:${GRAY}"></span>Operations
          </div>
        </div>
        <div class="sam-panel">
          <div class="sam-info" id="sam-info">
            <h3>Explore the stakeholders</h3>
            Click any stakeholder to see their role, typical concerns, and the
            engagement strategy that builds alignment. Thicker edges mean more
            influence over whether the strategy succeeds.
          </div>
          <div class="sam-hint">Edge labels show the engagement mode:
            Sponsor, Approve, Adopt, Consult, Implement, Negotiate.</div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function ringPos(radius, angleDeg) {
        const a = (angleDeg - 90) * Math.PI / 180;
        return { x: Math.round(radius * Math.cos(a)),
                 y: Math.round(radius * Math.sin(a)) };
    }
    function makeNode(id, label, pos, bg, border, fontSize) {
        return {
            id: id, label: label, x: pos.x, y: pos.y, fixed: true,
            shape: 'box', margin: 9, borderWidth: 2,
            color: { background: bg, border: border },
            font: { size: fontSize, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const nodes = new vis.DataSet([
        makeNode('strategy', 'AI Strategy', { x: 0, y: 0 }, DEEP_ORANGE, '#9c3c00', 18),
        // inner ring — high influence
        makeNode('supt', 'Superintendent /\nProvost', ringPos(150, 318), STEELBLUE, '#2c5d8f', 14),
        makeNode('board', 'School Board /\nTrustees', ringPos(150, 42), STEELBLUE, '#2c5d8f', 14),
        // outer ring
        makeNode('teachers', 'Teachers /\nFaculty', ringPos(270, 95), TEAL, '#00564d', 13),
        makeNode('students', 'Students', ringPos(270, 152), TEAL, '#00564d', 13),
        makeNode('families', 'Families &\nParents', ringPos(270, 208), TEAL, '#00564d', 13),
        makeNode('hr', 'HR & Unions', ringPos(280, 252), GRAY, '#666', 13),
        makeNode('it', 'IT & Data Staff', ringPos(265, 297), GRAY, '#666', 13)
    ]);

    function spokeEdge(to, label, width) {
        return {
            from: 'strategy', to: to, label: label,
            title: 'Engagement mode: ' + label,
            font: { size: 11, color: '#555', background: 'white', face: 'Arial' },
            color: { color: '#999' }, width: width,
            arrows: { to: { enabled: false } },
            smooth: { type: 'curvedCW', roundness: 0.06 }
        };
    }

    const edges = new vis.DataSet([
        spokeEdge('supt', 'Sponsor', 5),
        spokeEdge('board', 'Approve', 5),
        spokeEdge('teachers', 'Adopt', 3),
        spokeEdge('students', 'Consult', 2.5),
        spokeEdge('families', 'Consult', 2.5),
        spokeEdge('it', 'Implement', 1.5),
        spokeEdge('hr', 'Negotiate', 1.5)
    ]);

    const container = document.getElementById('sam-network');
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

    const infoBox = document.getElementById('sam-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
