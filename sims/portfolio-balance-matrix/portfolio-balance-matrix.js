// Portfolio Balance Matrix MicroSim
// Bubble chart mapping candidate AI projects by implementation difficulty
// and potential student impact, across four portfolio quadrants.
// CANVAS_HEIGHT: 620
// Library: Chart.js

document.addEventListener('DOMContentLoaded', function () {

    const MID = 3; // quadrant boundary on both axes

    const projects = [
        { label: 'AI Sub Plans', x: 1, y: 2, r: 8, color: '#43a047',
          info: 'Quick Win: low difficulty, moderate impact. Ideal first project.' },
        { label: 'Differentiated Homework', x: 1.5, y: 3, r: 10, color: '#43a047',
          info: 'Quick Win: uses existing tools, benefits most students.' },
        { label: 'Parent Q&A Chatbot', x: 2, y: 2, r: 8, color: '#43a047',
          info: 'Quick Win: reduces after-hours questions for staff.' },
        { label: 'xAPI/LRS Infrastructure', x: 4, y: 5, r: 14, color: '#FF8C00',
          info: 'Strategic Bet: complex implementation, but enables AI-personalized learning plans across all platforms.' },
        { label: 'Alpha School Schedule Pilot', x: 5, y: 5, r: 16, color: '#FF8C00',
          info: 'Strategic Bet: requires full schedule redesign, community engagement, and staff retraining. Transformative if successful.' },
        { label: 'AI Grading for Essays', x: 3, y: 3, r: 10, color: '#fbc02d',
          info: 'Effort Trap: significant teacher training required; academic integrity concerns. Re-evaluate.' },
        { label: 'AI Attendance Tracking', x: 4, y: 1, r: 6, color: '#fbc02d',
          info: 'Effort Trap: moderate difficulty for low additional impact — attendance is already well-tracked.' }
    ];
    const defaults = projects.map(function (p) { return { x: p.x, y: p.y }; });

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .pbm-wrap { width: 100%; background: white; box-sizing: border-box; }
      .pbm-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .pbm-chart { position: relative; width: 100%; height: 440px;
        padding: 0 10px; box-sizing: border-box; }
      .pbm-bar { display: flex; align-items: center; gap: 14px;
        margin: 6px 10px 0 10px; }
      .pbm-bar button { padding: 7px 14px; font-size: 13px; cursor: pointer;
        border: 1px solid #888; background: #f0f0f0; border-radius: 6px; }
      .pbm-bar button:hover { background: #e0e0e0; }
      .pbm-hint { font-size: 12px; color: #777; }
      .pbm-info { min-height: 72px; margin: 8px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 14px; line-height: 1.45;
        box-sizing: border-box; }
      .pbm-info b { color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'pbm-wrap';
    wrap.innerHTML = `
      <div class="pbm-title">Portfolio Balance Matrix</div>
      <div class="pbm-chart"><canvas id="pbm-canvas"></canvas></div>
      <div class="pbm-bar">
        <button id="pbm-reset">Reset positions</button>
        <span class="pbm-hint">Click a bubble for details — or drag it to a
        new position to explore how the portfolio balance changes.</span>
      </div>
      <div class="pbm-info" id="pbm-info">
        <b>Explore:</b> A balanced portfolio mixes Quick Wins (build momentum)
        with a small number of Strategic Bets (transform learning). Click any
        project bubble to see its assessment.
      </div>
    `;
    main.appendChild(wrap);

    // plugin: paint the four quadrants and their labels
    const quadrantPlugin = {
        id: 'quadrants',
        beforeDraw: function (chart) {
            const x = chart.scales.x, y = chart.scales.y;
            const midX = x.getPixelForValue(MID);
            const midY = y.getPixelForValue(MID);
            const ctx = chart.ctx;
            ctx.save();
            function rect(x1, y1, x2, y2, color) {
                ctx.fillStyle = color;
                ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            }
            rect(x.left, y.top, midX, midY, 'rgba(67,160,71,0.10)');    // top-left
            rect(midX, y.top, x.right, midY, 'rgba(255,140,0,0.10)');   // top-right
            rect(x.left, midY, midX, y.bottom, 'rgba(158,158,158,0.10)'); // bottom-left
            rect(midX, midY, x.right, y.bottom, 'rgba(251,192,45,0.12)'); // bottom-right
            ctx.font = 'bold 13px Arial';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#2e7d32';
            ctx.fillText('Quick Wins — Do first', x.left + 8, y.top + 18);
            ctx.fillStyle = '#b35900';
            ctx.textAlign = 'right';
            ctx.fillText('Strategic Bets — Plan carefully', x.right - 8, y.top + 18);
            ctx.fillStyle = '#666';
            ctx.textAlign = 'left';
            ctx.fillText('Low priority — Deprioritize', x.left + 8, y.bottom - 10);
            ctx.fillStyle = '#9a7d0a';
            ctx.textAlign = 'right';
            ctx.fillText('Effort Traps — Question value', x.right - 8, y.bottom - 10);
            ctx.restore();
        }
    };

    const ctx = document.getElementById('pbm-canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Projects',
                data: projects.map(function (p) {
                    return { x: p.x, y: p.y, r: p.r };
                }),
                backgroundColor: projects.map(function (p) { return p.color + 'cc'; }),
                borderColor: projects.map(function (p) { return p.color; }),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0.5, max: 5.5,
                    title: { display: true,
                             text: 'Implementation Difficulty (low → high)' },
                    ticks: { stepSize: 1 }
                },
                y: {
                    min: 0.5, max: 5.5,
                    title: { display: true,
                             text: 'Potential Impact on Students (low → high)' },
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            const p = projects[item.dataIndex];
                            const d = item.raw;
                            return p.label + ' (difficulty ' +
                                d.x.toFixed(1) + ', impact ' + d.y.toFixed(1) + ')';
                        }
                    }
                }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const p = projects[elements[0].index];
                    document.getElementById('pbm-info').innerHTML =
                        '<b>' + p.label + ':</b> ' + p.info;
                }
            }
        },
        plugins: [quadrantPlugin]
    });

    // ---------- drag support ----------
    let dragIndex = -1;
    const canvas = chart.canvas;

    canvas.addEventListener('mousedown', function (e) {
        const points = chart.getElementsAtEventForMode(e, 'nearest',
            { intersect: true }, false);
        if (points.length > 0) dragIndex = points[0].index;
    });
    canvas.addEventListener('mousemove', function (e) {
        if (dragIndex < 0) return;
        const rect = canvas.getBoundingClientRect();
        let xv = chart.scales.x.getValueForPixel(e.clientX - rect.left);
        let yv = chart.scales.y.getValueForPixel(e.clientY - rect.top);
        xv = Math.max(0.5, Math.min(5.5, xv));
        yv = Math.max(0.5, Math.min(5.5, yv));
        const d = chart.data.datasets[0].data[dragIndex];
        d.x = xv; d.y = yv;
        chart.update('none');
    });
    window.addEventListener('mouseup', function () { dragIndex = -1; });

    document.getElementById('pbm-reset').addEventListener('click', function () {
        chart.data.datasets[0].data.forEach(function (d, i) {
            d.x = defaults[i].x;
            d.y = defaults[i].y;
        });
        chart.update();
        document.getElementById('pbm-info').innerHTML =
            '<b>Positions reset.</b> Click any project bubble to see its assessment.';
    });
});
