// AI Agent Anatomy MicroSim
// The four components of an AI agent cycle — perceive, plan, act, remember —
// and the institutional environment they operate within.
// CANVAS_HEIGHT: 560
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const TEAL = '#4682B4';
    const ORANGE = '#FF8C00';

    const nodeInfo = {
        perceive: {
            title: 'Perceive',
            text: 'Receives inputs — a prompt, a database query result, a scheduled trigger, or a new event in a connected system.',
            example: 'Education example: a student-monitoring agent receives a new batch of quiz scores from the LMS every Sunday evening.'
        },
        plan: {
            title: 'Plan',
            text: 'Uses the LLM to reason about how to accomplish the assigned goal; may break the task into steps or decide which tool to invoke next.',
            example: 'Education example: the agent decides to first compute each student’s score trend, then compare against thresholds, then draft a summary for the counselor.'
        },
        act: {
            title: 'Act',
            text: 'Executes one step — queries a database, writes a file, sends a message, or calls another AI tool.',
            example: 'Education example: the agent queries the gradebook for each flagged student’s last five quiz scores.'
        },
        remember: {
            title: 'Remember',
            text: 'Stores the result of this step so subsequent steps can build on it; may also update a persistent memory store between sessions.',
            example: 'Education example: the agent saves this week’s at-risk list so next week’s run can report who improved.'
        },
        agent: {
            title: 'AI Agent',
            text: 'An AI system that runs the perceive → plan → act → remember cycle continuously toward an assigned goal, using an LLM as its reasoning engine.',
            example: 'The cycle repeats until the goal is met, a limit is reached, or a human pauses it.'
        },
        data: {
            title: 'Data Sources',
            text: 'The agent reads from — and may write to — institutional data stores. Data governance policies apply here.',
            example: 'This governance question is addressed in the chapter on Learning Telemetry and xAPI.'
        },
        outputs: {
            title: 'Outputs',
            text: 'The agent produces outputs — reports, messages, lesson drafts — that humans review before any consequential action.',
            example: 'Human review of outputs is covered in the Responsible AI chapter.'
        },
        oversight: {
            title: 'Human Oversight',
            text: 'A human supervisor can inspect the agent’s plan before it executes, set hard limits on permitted actions, or pause the agent at any point.',
            example: 'The Governance and Policy chapter covers structures that make oversight practically effective.'
        },
        override: {
            title: 'Pause / Override',
            text: 'In responsible agent deployments, human override is always technically possible.',
            example: 'The Governance and Policy chapter covers governance structures that make override practically effective — not just theoretically available.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .aaa-wrap { width: 100%; background: white; box-sizing: border-box; }
      .aaa-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .aaa-row { display: flex; width: 100%; height: 510px; }
      .aaa-net { width: 62%; height: 100%; }
      #aaa-network { width: 100%; height: 100%; }
      .aaa-panel { width: 38%; box-sizing: border-box; padding: 10px;
        display: flex; flex-direction: column; gap: 10px; }
      .aaa-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; flex: 1; }
      .aaa-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
      .aaa-info .ex { margin-top: 8px; font-size: 13px; color: #555;
        font-style: italic; }
      .aaa-legend { font-size: 12px; color: #666; background: #fafafa;
        border: 1px solid #ddd; border-radius: 6px; padding: 8px 10px; }
      .aaa-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'aaa-wrap';
    wrap.innerHTML = `
      <div class="aaa-title">Anatomy of an AI Agent</div>
      <div class="aaa-row">
        <div class="aaa-net"><div id="aaa-network"></div></div>
        <div class="aaa-panel">
          <div class="aaa-info" id="aaa-info">
            <h3>Explore the agent cycle</h3>
            Click any of the four cycle stages, the agent itself, or the three
            environment elements to see what it does — with an education
            example.
            <div class="ex">The orange arrows show the cycle running
            clockwise: perceive → plan → act → remember.</div>
          </div>
          <div class="aaa-legend">
            <span class="sw" style="background:#4682B4"></span>Agent cycle stage
            &nbsp; <span class="sw" style="background:#f0f0f0;border:1px solid #999"></span>Institutional environment
            &nbsp; <span class="sw" style="background:#c62828"></span>Human override
          </div>
        </div>
      </div>
    `;
    main.appendChild(wrap);

    // ---------- network ----------
    function cycleNode(id, label, x, y) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: 'box', margin: 12, borderWidth: 2,
            color: { background: TEAL, border: '#2c5d8f' },
            font: { size: 16, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        };
    }
    function envNode(id, label, x, y) {
        return {
            id: id, label: label, x: x, y: y, fixed: true,
            shape: 'box', margin: 8, borderWidth: 1, shapeProperties: { borderRadius: 12 },
            color: { background: '#f0f0f0', border: '#999' },
            font: { size: 13, color: '#333', face: 'Arial' }
        };
    }

    const nodes = new vis.DataSet([
        { id: 'agent', label: '🤖\nAI Agent', x: 0, y: 0, fixed: true,
          shape: 'circle',
          color: { background: '#d6e6f5', border: TEAL }, borderWidth: 3,
          font: { size: 14, color: '#1a3a6c', face: 'Arial', multi: true } },
        cycleNode('perceive', '1. Perceive', 0, -160),
        cycleNode('plan', '2. Plan', 170, 5),
        cycleNode('act', '3. Act', 0, 170),
        cycleNode('remember', '4. Remember', -170, 5),
        envNode('data', '🗄️ Data Sources', 0, -265),
        envNode('outputs', '📄 Outputs', 235, 150),
        envNode('oversight', '🧑 Human Oversight', -235, 150),
        { id: 'override', label: '⏸ Pause / Override', x: -440, y: 195, fixed: true,
          shape: 'box', margin: 6, borderWidth: 1,
          color: { background: '#c62828', border: '#8e0000' },
          font: { size: 11, color: 'white', face: 'Arial' } }
    ]);

    function cycleEdge(from, to) {
        return {
            from: from, to: to,
            color: { color: ORANGE }, width: 2.5,
            arrows: { to: { enabled: true, scaleFactor: 1.1 } },
            smooth: { type: 'curvedCW', roundness: 0.35 }
        };
    }
    function envEdge(from, to) {
        return {
            from: from, to: to,
            color: { color: '#bbb' }, width: 1.5, dashes: [5, 5],
            arrows: { to: { enabled: false } },
            smooth: false
        };
    }

    const edges = new vis.DataSet([
        cycleEdge('perceive', 'plan'),
        cycleEdge('plan', 'act'),
        cycleEdge('act', 'remember'),
        cycleEdge('remember', 'perceive'),
        envEdge('data', 'perceive'),
        envEdge('act', 'outputs'),
        envEdge('oversight', 'remember'),
        envEdge('override', 'oversight')
    ]);

    const container = document.getElementById('aaa-network');
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

    const infoBox = document.getElementById('aaa-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text +
                    '<div class="ex">' + info.example + '</div>';
            }
        }
    });
});
