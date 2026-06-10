// Institutional Agent Workforce MicroSim
// An institutional agent workforce organized by user group and task type,
// all governed by a shared AI governance framework.
// CANVAS_HEIGHT: 590
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        ember: {
            title: 'Ember — Progress Monitor (Teacher agent)',
            text: 'Monitors student engagement and mastery data. Sends proactive alerts when students show concerning patterns. Task type: Monitoring. Human review: Required before intervention action.'
        },
        quinn: {
            title: 'Quinn — Parent Comms (Teacher agent)',
            text: 'Drafts weekly family updates and responds to frequently asked parent questions. Task type: Communication. Human review: Teacher approves all outgoing messages.'
        },
        archer: {
            title: 'Archer — Lesson Planner (Teacher agent)',
            text: 'Suggests differentiated lesson adjustments based on class-level mastery data. Task type: Decision support. Human review: Teacher decides which suggestions to implement.'
        },
        nova: {
            title: 'Nova — Study Companion (Student agent)',
            text: 'Recommends daily study activities based on the student’s mastery state and learning plan. Task type: Decision support. Human review: Teacher can adjust recommendations.'
        },
        spark: {
            title: 'Spark — Encouragement Agent (Student agent)',
            text: 'Sends brief, personalized encouragement messages when the student achieves a milestone or returns after a gap. Task type: Communication. Autonomous — no human review required.'
        },
        echo: {
            title: 'Echo — Critical Thinking Coach (Student agent)',
            text: 'Asks Socratic follow-up questions when the student provides an answer, prompting deeper reasoning. Task type: Interaction. Autonomous within conversation; teacher reviews transcripts weekly.'
        },
        compass: {
            title: 'Compass — Portfolio Monitor (Administrator agent)',
            text: 'Tracks AI portfolio KPIs and flags projects that are off-track. Drafts the quarterly executive report. Task type: Monitoring + Communication. Human review: Executive review before board distribution.'
        },
        sage: {
            title: 'Sage-Admin — Planning Agent (Administrator agent)',
            text: 'Analyzes idea funnel data and suggests which ideas should advance to selection review. Task type: Decision support. Human review: Steering committee makes all selection decisions.'
        },
        governance: {
            title: 'AI Governance Framework',
            text: 'The set of policies, data access rules, and accountability structures that govern all agents. Defines which actions each agent may take autonomously and which require human approval.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .awd-wrap { width: 100%; background: white; box-sizing: border-box; }
      .awd-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .awd-row { display: flex; width: 100%; height: 540px; }
      .awd-net { width: 64%; height: 100%; position: relative; }
      #awd-network { width: 100%; height: 100%; }
      .awd-legend { position: absolute; bottom: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .awd-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .awd-panel { width: 36%; box-sizing: border-box; padding: 10px; }
      .awd-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .awd-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'awd-wrap';
    wrap.innerHTML = `
      <div class="awd-title">The Institutional Agent Workforce</div>
      <div class="awd-row">
        <div class="awd-net">
          <div id="awd-network"></div>
          <div class="awd-legend">
            <span class="sw" style="background:#4682B4"></span>Teacher agents
            &nbsp;<span class="sw" style="background:#00897b"></span>Student agents
            &nbsp;<span class="sw" style="background:#FF8C00"></span>Administrator agents
            &nbsp;<span class="sw" style="background:#E65100"></span>Governance
          </div>
        </div>
        <div class="awd-panel">
          <div class="awd-info" id="awd-info">
            <h3>Meet the agent workforce</h3>
            Click any agent to see its user group, task type, and — most
            importantly — its human oversight requirement. Every agent is
            governed by the shared governance framework at the bottom.
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
            font: { size: fontSize || 12.5, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }
    function headerNode(id, label, x, y) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: 'text',
            font: { size: 15, color: '#555', face: 'Arial', bold: { mod: 'bold' } }
        };
    }

    const BLUE = '#4682B4', BLUE_B = '#2c5d8f';
    const TEAL = '#00897b', TEAL_B = '#00564d';
    const ORG = '#FF8C00', ORG_B = '#c46a00';

    const nodes = new vis.DataSet([
        headerNode('h-teacher', 'Teacher', -300, -245),
        headerNode('h-student', 'Student', 0, -245),
        headerNode('h-admin', 'Administrator', 300, -245),
        makeNode('ember', 'Ember\nProgress Monitor', -300, -160, BLUE, BLUE_B),
        makeNode('quinn', 'Quinn\nParent Comms', -300, -45, BLUE, BLUE_B),
        makeNode('archer', 'Archer\nLesson Planner', -300, 70, BLUE, BLUE_B),
        makeNode('nova', 'Nova\nStudy Companion', 0, -160, TEAL, TEAL_B),
        makeNode('spark', 'Spark\nEncouragement', 0, -45, TEAL, TEAL_B),
        makeNode('echo', 'Echo\nCritical Thinking Coach', 0, 70, TEAL, TEAL_B),
        makeNode('compass', 'Compass\nPortfolio Monitor', 300, -105, ORG, ORG_B),
        makeNode('sage', 'Sage-Admin\nPlanning Agent', 300, 15, ORG, ORG_B),
        makeNode('governance', 'AI Governance Framework', 0, 220, '#E65100', '#9c3c00', 16)
    ]);

    function govEdge(from, showLabel) {
        return {
            from: from, to: 'governance',
            label: showLabel ? 'governed by' : undefined,
            title: 'governed by',
            font: showLabel ? { size: 10.5, color: '#777', background: 'white',
                                face: 'Arial' } : undefined,
            color: { color: '#bbb' }, width: 1.6, dashes: [4, 4],
            arrows: { to: { enabled: true, scaleFactor: 0.7 } },
            smooth: { type: 'curvedCW', roundness: 0.1 }
        };
    }

    const edges = new vis.DataSet([
        govEdge('ember', false), govEdge('quinn', false), govEdge('archer', true),
        govEdge('nova', false), govEdge('spark', false), govEdge('echo', true),
        govEdge('compass', false), govEdge('sage', true)
    ]);

    const container = document.getElementById('awd-network');
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

    const infoBox = document.getElementById('awd-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
