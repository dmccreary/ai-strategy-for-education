// AI Center of Excellence Organizational Chart MicroSim
// Interactive org chart showing CoE structure and its relationships
// to operational units across the institution.
// CANVAS_HEIGHT: 540
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const STEELBLUE = '#4682B4';
    const DEEP_ORANGE = '#E65100';
    const GRAY = '#9e9e9e';

    const OUTER_INFO = 'An operational unit that submits ideas to the funnel, follows CoE standards, and receives enablement support.';

    const nodeInfo = {
        coe: {
            title: 'AI Center of Excellence',
            text: 'The CoE is a small cross-functional team that owns AI strategy, standards, pipeline management, and enablement for the entire institution.'
        },
        research: {
            title: 'Expertise & Research',
            text: 'Tracks AI capability developments, evaluates vendor claims, and maintains the institution’s AI knowledge base.'
        },
        standards: {
            title: 'Standards & Policy',
            text: 'Defines the policies, evaluation rubrics, and data-governance rules that every AI project must meet.'
        },
        funnel: {
            title: 'Idea Funnel',
            text: 'Runs the idea-gathering, registry, and evaluation process. Feeds prioritized projects to the resourcing pipeline.'
        },
        enablement: {
            title: 'Enablement & Training',
            text: 'Provides professional development, shared tools, templates, and implementation support to operational units.'
        },
        curriculum: { title: 'Curriculum', text: OUTER_INFO },
        it: { title: 'IT', text: OUTER_INFO },
        finance: { title: 'Finance', text: OUTER_INFO },
        instruction: { title: 'Instruction', text: OUTER_INFO },
        hr: { title: 'HR', text: OUTER_INFO },
        families: { title: 'Families', text: OUTER_INFO }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .coe-wrap { width: 100%; background: white; box-sizing: border-box; }
      .coe-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .coe-row { display: flex; width: 100%; height: 490px; }
      .coe-net { width: 64%; height: 100%; position: relative; }
      #coe-network { width: 100%; height: 100%; }
      .coe-legend { position: absolute; bottom: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .coe-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .coe-panel { width: 36%; box-sizing: border-box; padding: 10px; }
      .coe-info { background: #fdf6ef; border: 1px solid #e0c4a8;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .coe-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #8a3c00; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'coe-wrap';
    wrap.innerHTML = `
      <div class="coe-title">AI Center of Excellence — Organizational Structure</div>
      <div class="coe-row">
        <div class="coe-net">
          <div id="coe-network"></div>
          <div class="coe-legend">
            <span class="sw" style="background:${DEEP_ORANGE}"></span>CoE core
            &nbsp;<span class="sw" style="background:${STEELBLUE}"></span>CoE function
            &nbsp;<span class="sw" style="background:${GRAY}"></span>Operational unit
          </div>
        </div>
        <div class="coe-panel">
          <div class="coe-info" id="coe-info">
            <h3>Explore the CoE</h3>
            Click any node to see its role. The four steelblue functions form
            the Center of Excellence; gray nodes are the operational units it
            serves.
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function ringPos(radius, angleDeg) {
        const a = (angleDeg - 90) * Math.PI / 180; // 0° = top
        return { x: Math.round(radius * Math.cos(a)),
                 y: Math.round(radius * Math.sin(a)) };
    }

    function makeNode(id, label, pos, bg, border, fontSize, fontColor) {
        return {
            id: id, label: label, x: pos.x, y: pos.y, fixed: true,
            shape: 'box', margin: 9, borderWidth: 2,
            color: { background: bg, border: border },
            font: { size: fontSize, color: fontColor, face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const nodes = new vis.DataSet([
        makeNode('coe', 'AI Center\nof Excellence', { x: 0, y: 0 },
            DEEP_ORANGE, '#9c3c00', 17, 'white'),
        // middle ring — four functions (angles avoid horizontal label edges)
        makeNode('research', 'Expertise &\nResearch', ringPos(150, 38), STEELBLUE, '#2c5d8f', 13, 'white'),
        makeNode('standards', 'Standards &\nPolicy', ringPos(150, 142), STEELBLUE, '#2c5d8f', 13, 'white'),
        makeNode('funnel', 'Idea Funnel', ringPos(150, 218), STEELBLUE, '#2c5d8f', 13, 'white'),
        makeNode('enablement', 'Enablement &\nTraining', ringPos(150, 322), STEELBLUE, '#2c5d8f', 13, 'white'),
        // outer ring — operational units (offset angles, avoid 90/270)
        makeNode('curriculum', 'Curriculum', ringPos(295, 10), GRAY, '#666', 12, 'white'),
        makeNode('it', 'IT', ringPos(295, 70), GRAY, '#666', 12, 'white'),
        makeNode('finance', 'Finance', ringPos(295, 130), GRAY, '#666', 12, 'white'),
        makeNode('instruction', 'Instruction', ringPos(295, 190), GRAY, '#666', 12, 'white'),
        makeNode('hr', 'HR', ringPos(295, 250), GRAY, '#666', 12, 'white'),
        makeNode('families', 'Families', ringPos(295, 310), GRAY, '#666', 12, 'white')
    ]);

    const edgeList = [];
    // CoE to its four functions
    ['research', 'standards', 'enablement'].forEach(function (id) {
        edgeList.push({
            from: 'coe', to: id, color: { color: '#c47b3d' }, width: 2,
            arrows: { to: { enabled: false } }, smooth: false
        });
    });
    edgeList.push({
        from: 'coe', to: 'funnel', label: 'Pipeline',
        font: { size: 11, color: '#8a3c00', background: 'white' },
        color: { color: DEEP_ORANGE }, width: 2.5,
        arrows: { to: { enabled: true, scaleFactor: 1 } }, smooth: false
    });
    // CoE to outer units — bidirectional "Standards & Support"
    ['curriculum', 'it', 'finance', 'instruction', 'hr', 'families'].forEach(function (id) {
        edgeList.push({
            from: 'coe', to: id, label: 'Standards & Support',
            title: 'The CoE provides standards and support to ' + nodeInfo[id].title +
                   ', which submits ideas back to the funnel.',
            font: { size: 9, color: '#888', background: 'white' },
            color: { color: '#bbb' }, width: 1.3, dashes: [4, 4],
            arrows: { to: { enabled: true, scaleFactor: 0.6 },
                      from: { enabled: true, scaleFactor: 0.6 } },
            smooth: { type: 'curvedCW', roundness: 0.08 }
        });
    });

    const edges = new vis.DataSet(edgeList);
    const container = document.getElementById('coe-network');
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

    const infoBox = document.getElementById('coe-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
