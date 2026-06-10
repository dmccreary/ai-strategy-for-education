// Pipeline Report Dashboard MicroSim
// Horizontal bar dashboard of ideas/projects at each idea-funnel stage,
// with dwell-time annotations, benchmark targets, and editable counts.
// CANVAS_HEIGHT: 640
// Library: Chart.js

document.addEventListener('DOMContentLoaded', function () {

    const stages = [
        { label: 'Stage 1 — Gathering', count: 47, dwell: 14, color: '#90caf9',
          info: 'Healthy: 30+ new ideas per cycle from diverse stakeholder groups. Warning signs: ideas coming only from administrators, or volume dropping cycle over cycle — both suggest the gathering sessions need refreshing.' },
        { label: 'Stage 2 — Registry', count: 38, dwell: 7, color: '#4682B4',
          info: 'Healthy: most submitted ideas entered with complete metadata within a week. Warning sign: if fewer than 50% of submitted ideas are entering the registry, the submission form may be too complex or the inbox is understaffed.' },
        { label: 'Stage 3 — Under Evaluation', count: 22, dwell: 21, color: '#00897b',
          info: 'Healthy: rubric scoring completed within one review cycle. Warning sign: ideas languishing more than 30 days suggests the review panel needs more capacity or a simpler rubric.' },
        { label: 'Stage 4 — Selection Review', count: 12, dwell: 30, color: '#FF8C00',
          info: 'Healthy: a clear portfolio decision each cycle — fund, defer, or decline with feedback. Warning sign: a growing backlog here means leadership review meetings are not keeping pace.' },
        { label: 'Stage 5 — Funded / In Progress', count: 7, dwell: 90, color: '#E65100',
          info: 'Healthy: 5–10 active projects with charters and success metrics. Warning sign: more than 10 active projects usually means resources are spread too thin for any to succeed.' },
        { label: 'Stage 6 — Evaluating Outcomes', count: 4, dwell: 45, color: '#bf360c',
          info: 'Healthy: every completed project gets a KPI review and a lessons-learned write-up that feeds the next cycle. Warning sign: zero projects here means outcomes are not being measured.' }
    ];

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .prd-wrap { width: 100%; background: white; box-sizing: border-box; }
      .prd-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .prd-chart { position: relative; width: 100%; height: 360px;
        padding: 0 10px; box-sizing: border-box; }
      .prd-controls { display: grid; grid-template-columns: 1fr 1fr 1fr;
        gap: 4px 18px; margin: 8px 14px 0 14px; }
      .prd-ctl { font-size: 11.5px; color: #444; }
      .prd-ctl input { width: 100%; }
      .prd-info { min-height: 92px; margin: 8px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 13.5px; line-height: 1.45;
        box-sizing: border-box; }
      .prd-info b { color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'prd-wrap';
    wrap.innerHTML = `
      <div class="prd-title">AI Pipeline Report Dashboard</div>
      <div class="prd-chart"><canvas id="prd-canvas"></canvas></div>
      <div class="prd-controls" id="prd-controls"></div>
      <div class="prd-info" id="prd-info">
        <b>Diagnose the pipeline:</b> Click any bar to see what a healthy
        stage looks like and the warning signs of a bottleneck. Use the
        sliders to model your own institution's counts. Dashed lines show
        recommended targets.
      </div>
    `;
    main.appendChild(wrap);

    // sliders
    const controls = document.getElementById('prd-controls');
    stages.forEach(function (s, i) {
        const div = document.createElement('div');
        div.className = 'prd-ctl';
        div.innerHTML = '<label>' + s.label + ': <span id="prd-v' + i + '">' +
            s.count + '</span></label>' +
            '<input type="range" min="0" max="60" step="1" value="' + s.count +
            '" id="prd-s' + i + '">';
        controls.appendChild(div);
    });

    // plugin: dwell-time annotations + benchmark target lines
    const annotationPlugin = {
        id: 'prdAnnotations',
        afterDatasetsDraw: function (chart) {
            const ctx = chart.ctx;
            const x = chart.scales.x, y = chart.scales.y;
            ctx.save();
            // dwell labels at the end of each bar
            const meta = chart.getDatasetMeta(0);
            ctx.font = '11px Arial';
            ctx.fillStyle = '#555';
            ctx.textAlign = 'left';
            meta.data.forEach(function (bar, i) {
                ctx.fillText('Avg dwell: ' + stages[i].dwell + ' days',
                    bar.x + 6, bar.y + 4);
            });
            // benchmark lines
            function target(xVal, label, yIndex) {
                const px = x.getPixelForValue(xVal);
                ctx.strokeStyle = '#c62828';
                ctx.setLineDash([6, 5]);
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(px, y.top);
                ctx.lineTo(px, y.bottom);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = '#c62828';
                ctx.textAlign = 'left';
                ctx.fillText(label, px + 4, y.top + 12 + yIndex * 14);
            }
            target(30, 'Target Stage 1: 30+', 0);
            target(5, 'Target Stage 5: 5–10', 1);
            ctx.restore();
        }
    };

    const ctx = document.getElementById('prd-canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stages.map(function (s) { return s.label; }),
            datasets: [{
                label: 'Items in stage',
                data: stages.map(function (s) { return s.count; }),
                backgroundColor: stages.map(function (s) { return s.color + 'cc'; }),
                borderColor: stages.map(function (s) { return s.color; }),
                borderWidth: 1.5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 110 } },
            scales: {
                x: {
                    min: 0, max: 60,
                    title: { display: true, text: 'Ideas / projects in stage' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            const s = stages[item.dataIndex];
                            return item.formattedValue + ' items — avg dwell ' +
                                s.dwell + ' days';
                        }
                    }
                }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const s = stages[elements[0].index];
                    document.getElementById('prd-info').innerHTML =
                        '<b>' + s.label + ':</b> ' + s.info;
                }
            }
        },
        plugins: [annotationPlugin]
    });

    stages.forEach(function (s, i) {
        document.getElementById('prd-s' + i).addEventListener('input', function (e) {
            const v = parseInt(e.target.value, 10);
            document.getElementById('prd-v' + i).textContent = v;
            chart.data.datasets[0].data[i] = v;
            chart.update('none');
        });
    });
});
