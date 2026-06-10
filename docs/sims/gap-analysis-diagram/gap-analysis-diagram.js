// Gap Analysis Diagram MicroSim
// Radar chart mapping current institutional capability against AI strategy
// requirements across five dimensions, with editable self-assessment.
// CANVAS_HEIGHT: 660
// Library: Chart.js

document.addEventListener('DOMContentLoaded', function () {

    const dimensions = [
        { label: 'Infrastructure', current: 2, required: 4,
          info: 'Moving from level 2 to 4 means: one-to-one AI-capable devices, reliable building-wide broadband, an operating Learning Record Store, and at least one district-approved AI platform.' },
        { label: 'Policy', current: 1, required: 4,
          info: 'Moving from level 1 to 4 means: a board-adopted AI use policy, an updated academic integrity code, data governance rules, and an agent oversight framework.' },
        { label: 'Capability', current: 2, required: 3,
          info: 'Moving from level 2 to 3 means: all staff complete AI literacy basics, and a cohort of AI champions runs peer training in every school.' },
        { label: 'Culture', current: 3, required: 4,
          info: 'Moving from level 3 to 4 means: pilot failures are treated as learning, data informs decisions routinely, and stakeholders trust how the institution uses AI.' },
        { label: 'Resources', current: 2, required: 3,
          info: 'Moving from level 2 to 3 means: a dedicated AI budget line, protected staff time for the Center of Excellence, and at least one external partner relationship.' }
    ];

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .gad-wrap { width: 100%; background: white; box-sizing: border-box; }
      .gad-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .gad-chart { position: relative; width: 100%; height: 400px;
        padding: 0 10px; box-sizing: border-box; }
      .gad-controls { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: 4px 14px; margin: 8px 14px 0 14px; }
      .gad-ctl { font-size: 11.5px; color: #444; }
      .gad-ctl input { width: 100%; }
      .gad-info { min-height: 88px; margin: 8px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 13.5px; line-height: 1.45;
        box-sizing: border-box; }
      .gad-info b { color: #1a3a6c; }
      @media (max-width: 700px) {
        .gad-controls { grid-template-columns: 1fr 1fr; }
      }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'gad-wrap';
    wrap.innerHTML = `
      <div class="gad-title">Gap Analysis — Current State vs Strategy Requirements</div>
      <div class="gad-chart"><canvas id="gad-canvas"></canvas></div>
      <div class="gad-controls" id="gad-controls"></div>
      <div class="gad-info" id="gad-info">
        <b>Assess your institution:</b> Move the sliders to match your own
        self-assessment (1–5) in each dimension. The shaded area between the
        curves is your strategy gap. Click a vertex for what closing that gap
        looks like in practice.
      </div>
    `;
    main.appendChild(wrap);

    // sliders
    const controls = document.getElementById('gad-controls');
    dimensions.forEach(function (d, i) {
        const div = document.createElement('div');
        div.className = 'gad-ctl';
        div.innerHTML = '<label>Current: ' + d.label + ' (<span id="gad-v' + i +
            '">' + d.current + '</span>)</label>' +
            '<input type="range" min="1" max="5" step="1" value="' + d.current +
            '" id="gad-s' + i + '">';
        controls.appendChild(div);
    });

    // plugin: "Strategy Gap" label near the widest gap
    const gapLabelPlugin = {
        id: 'gadGapLabel',
        afterDatasetsDraw: function (chart) {
            const r = chart.scales.r;
            if (!r) return;
            const current = chart.data.datasets[0].data;
            const required = chart.data.datasets[1].data;
            let maxGap = -1, maxI = 0;
            for (let i = 0; i < current.length; i++) {
                const g = required[i] - current[i];
                if (g > maxGap) { maxGap = g; maxI = i; }
            }
            if (maxGap <= 0) return;
            const mid = (required[maxI] + current[maxI]) / 2;
            const pos = r.getPointPositionForValue(maxI, mid);
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = 'italic 13px Arial';
            ctx.fillStyle = '#b35900';
            ctx.textAlign = 'center';
            ctx.fillText('Strategy Gap', pos.x, pos.y);
            ctx.restore();
        }
    };

    const ctx = document.getElementById('gad-canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dimensions.map(function (d) { return d.label; }),
            datasets: [
                {
                    label: 'Current State',
                    data: dimensions.map(function (d) { return d.current; }),
                    borderColor: '#4682B4',
                    borderDash: [7, 5],
                    borderWidth: 2,
                    pointBackgroundColor: '#4682B4',
                    pointRadius: 4,
                    fill: false
                },
                {
                    label: 'AI Strategy Requirements',
                    data: dimensions.map(function (d) { return d.required; }),
                    borderColor: '#E65100',
                    borderWidth: 3,
                    pointBackgroundColor: '#E65100',
                    pointRadius: 4,
                    backgroundColor: 'rgba(255, 224, 178, 0.4)',
                    fill: '-1'   // shade the gap down to the Current State line
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0, max: 5,
                    ticks: { stepSize: 1 },
                    pointLabels: { font: { size: 13 } }
                }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            const i = item.dataIndex;
                            const cur = chart.data.datasets[0].data[i];
                            const req = chart.data.datasets[1].data[i];
                            return 'Current: ' + cur + ' | Required: ' + req +
                                ' | Gap: ' + Math.max(0, req - cur);
                        }
                    }
                }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const d = dimensions[elements[0].index];
                    const cur = chart.data.datasets[0].data[elements[0].index];
                    document.getElementById('gad-info').innerHTML =
                        '<b>' + d.label + ' (current ' + cur + ', required ' +
                        d.required + '):</b> ' + d.info;
                }
            }
        },
        plugins: [gapLabelPlugin]
    });

    dimensions.forEach(function (d, i) {
        document.getElementById('gad-s' + i).addEventListener('input', function (e) {
            const v = parseInt(e.target.value, 10);
            document.getElementById('gad-v' + i).textContent = v;
            chart.data.datasets[0].data[i] = v;
            chart.update('none');
        });
    });
});
