// Learning Data Pipeline MicroSim
// xAPI data flowing from learning platforms through the LRS and analytics
// to personalized learning plans and teacher dashboards.
// CANVAS_HEIGHT: 550
// Library: vis-network

document.addEventListener('DOMContentLoaded', function () {

    const visCss = document.createElement('link');
    visCss.rel = 'stylesheet';
    visCss.href = 'https://cdn.jsdelivr.net/npm/vis-network@9.1.9/styles/vis-network.min.css';
    document.head.appendChild(visCss);

    const nodeInfo = {
        textbook: {
            title: 'Intelligent Textbook',
            text: 'Emits xAPI statements for every student action: page views, question responses, simulation interactions, AI tutor questions.'
        },
        assess: {
            title: 'Assessment Platform',
            text: 'Emits xAPI statements for quiz and test attempts, including individual question responses and timestamps.'
        },
        homework: {
            title: 'Homework Tool',
            text: 'Emits xAPI statements for practice problem attempts, hint usage, and completion events.'
        },
        tutor: {
            title: 'AI Tutoring System',
            text: 'Emits xAPI statements for tutoring sessions: questions asked, explanations provided, mastery checkpoints passed.'
        },
        lrs: {
            title: 'Learning Record Store (LRS)',
            text: 'The institution-controlled database that aggregates all xAPI statements from all platforms. The LRS is the institution’s learning data asset.'
        },
        analytics: {
            title: 'Learning Analytics Engine',
            text: 'Processes LRS data to produce class-level, school-level, and district-level insights. Identifies patterns, gaps, and trends.'
        },
        predictive: {
            title: 'Predictive Analytics Model',
            text: 'Uses historical patterns in LRS data to predict each student’s probability of mastery, struggle, or disengagement before it fully manifests.'
        },
        lms: {
            title: 'AI-Driven LMS',
            text: 'Synthesizes analytics and predictions to generate a personalized learning plan for each student, updated daily.'
        },
        dashboard: {
            title: 'Teacher Dashboard',
            text: 'Shows class-level analytics, individual student alerts, and mastery tracking. Teachers review and can override AI recommendations.'
        },
        plan: {
            title: 'Student Personalized Plan',
            text: 'The student sees a recommended sequence of activities tailored to their current mastery state, pace, and learning style preferences.'
        }
    };

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .ldp-wrap { width: 100%; background: white; box-sizing: border-box; }
      .ldp-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .ldp-row { display: flex; width: 100%; height: 500px; }
      .ldp-net { width: 66%; height: 100%; position: relative; }
      #ldp-network { width: 100%; height: 100%; }
      .ldp-legend { position: absolute; bottom: 8px; left: 8px;
        background: rgba(255,255,255,0.95); border: 1px solid #ccc;
        border-radius: 6px; padding: 5px 9px; font-size: 11px; color: #444;
        z-index: 5; }
      .ldp-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      .ldp-panel { width: 34%; box-sizing: border-box; padding: 10px; }
      .ldp-info { background: #f6f9fc; border: 1px solid #b6cbe0;
        border-radius: 8px; padding: 12px 14px; font-size: 14px;
        line-height: 1.5; height: 100%; box-sizing: border-box; }
      .ldp-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'ldp-wrap';
    wrap.innerHTML = `
      <div class="ldp-title">The Learning Data Pipeline</div>
      <div class="ldp-row">
        <div class="ldp-net">
          <div id="ldp-network"></div>
          <div class="ldp-legend">
            <span class="sw" style="background:#4682B4"></span>Learning platform
            &nbsp;<span class="sw" style="background:#E65100"></span>LRS
            &nbsp;<span class="sw" style="background:#FF8C00"></span>Analytics
            &nbsp;<span class="sw" style="background:#00897b"></span>AI-driven LMS
            &nbsp;<span class="sw" style="background:#43a047"></span>People-facing output
          </div>
        </div>
        <div class="ldp-panel">
          <div class="ldp-info" id="ldp-info">
            <h3>Follow the data</h3>
            Click any node to trace how a single student action becomes part
            of a personalized learning plan — from platform, to Learning
            Record Store, through analytics, to teacher and student.
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
            font: { size: fontSize || 12, color: 'white', face: 'Arial' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.18)', size: 4, x: 2, y: 2 }
        };
    }

    const BLUE = '#4682B4', BLUE_B = '#2c5d8f';
    const nodes = new vis.DataSet([
        makeNode('textbook', 'Intelligent\nTextbook', -450, -165, BLUE, BLUE_B),
        makeNode('assess', 'Assessment\nPlatform', -450, -55, BLUE, BLUE_B),
        makeNode('homework', 'Homework\nTool', -450, 55, BLUE, BLUE_B),
        makeNode('tutor', 'AI Tutoring\nSystem', -450, 165, BLUE, BLUE_B),
        makeNode('lrs', 'Learning\nRecord Store\n(LRS)', -185, 5, '#E65100', '#9c3c00', 14),
        makeNode('analytics', 'Learning\nAnalytics Engine', 35, -100, '#FF8C00', '#c46a00'),
        makeNode('predictive', 'Predictive\nAnalytics Model', 35, 110, '#FF8C00', '#c46a00'),
        makeNode('lms', 'AI-Driven\nLMS', 255, 5, '#00897b', '#00564d', 14),
        makeNode('dashboard', 'Teacher\nDashboard', 465, -95, '#43a047', '#1b5e20'),
        makeNode('plan', 'Student\nPersonalized Plan', 465, 105, '#43a047', '#1b5e20')
    ]);

    function flowEdge(from, to, label, showLabel) {
        return {
            from: from, to: to,
            label: showLabel ? label : undefined,
            title: label,
            font: showLabel ? { size: 10, color: '#555', background: 'white',
                                face: 'Arial' } : undefined,
            color: { color: '#777' }, width: 2,
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: { type: 'curvedCW', roundness: 0.08 }
        };
    }

    const edges = new vis.DataSet([
        flowEdge('textbook', 'lrs', 'xAPI statements', true),
        flowEdge('assess', 'lrs', 'xAPI statements', false),
        flowEdge('homework', 'lrs', 'xAPI statements', false),
        flowEdge('tutor', 'lrs', 'xAPI statements', true),
        flowEdge('lrs', 'analytics', 'aggregated data', true),
        flowEdge('lrs', 'predictive', 'historical patterns', true),
        flowEdge('analytics', 'lms', 'insights', true),
        flowEdge('predictive', 'lms', 'risk scores', true),
        flowEdge('lms', 'dashboard', 'class alerts & recommendations', true),
        flowEdge('lms', 'plan', 'daily plan', true)
    ]);

    const container = document.getElementById('ldp-network');
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

    const infoBox = document.getElementById('ldp-info');
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const info = nodeInfo[params.nodes[0]];
            if (info) {
                infoBox.innerHTML = '<h3>' + info.title + '</h3>' + info.text;
            }
        }
    });
});
