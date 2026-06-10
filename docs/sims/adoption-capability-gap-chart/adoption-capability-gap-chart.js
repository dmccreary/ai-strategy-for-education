// Adoption-Capability Gap Chart MicroSim
// Diverging AI capability (exponential) and institutional adoption (linear)
// curves, with the shaded "Strategy Gap" between them.
// CANVAS_HEIGHT: 520
// Library: Chart.js

document.addEventListener('DOMContentLoaded', function () {

    const years = ['2019', '2020', '2021', '2022', '2023',
                   '2024', '2025', '2026', '2027', '2028'];

    // exponential capability curve, normalized so 2028 = 100
    const capability = years.map(function (y, i) {
        return +(100 * Math.pow(2, i - (years.length - 1))).toFixed(1);
    });
    // linear adoption from 5 to 40
    const adoption = years.map(function (y, i) {
        return +(5 + (35 * i) / (years.length - 1)).toFixed(1);
    });

    const GAP_INFO = 'The strategy gap is the space between what AI can do ' +
        'and what your institution is organized to use. The idea funnel, ' +
        'governance framework, and six-month review cadences in this course ' +
        'are tools for managing this gap deliberately.';

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .acg-wrap { width: 100%; background: white; box-sizing: border-box; }
      .acg-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .acg-chart { position: relative; width: 100%; height: 360px;
        padding: 0 10px; box-sizing: border-box; }
      .acg-info { min-height: 96px; margin: 8px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 14px; line-height: 1.45;
        box-sizing: border-box; }
      .acg-info b { color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'acg-wrap';
    wrap.innerHTML = `
      <div class="acg-title">AI Capability vs Institutional Adoption</div>
      <div class="acg-chart"><canvas id="acg-canvas"></canvas></div>
      <div class="acg-info" id="acg-info">
        <b>Explore:</b> Hover any point for exact values. Click inside the
        shaded area between the curves to learn what the Strategy Gap means.
        Click a legend item to toggle that series.
      </div>
    `;
    main.appendChild(wrap);

    // plugin: label "The Strategy Gap" centered between the curves
    const gapLabelPlugin = {
        id: 'gapLabel',
        afterDatasetsDraw: function (chart) {
            const meta0 = chart.getDatasetMeta(0);
            const meta1 = chart.getDatasetMeta(1);
            if (meta0.hidden || meta1.hidden) return;
            // position the label around 2025 (index 6)
            const i = 6;
            if (!meta0.data[i] || !meta1.data[i]) return;
            const x = meta0.data[i].x;
            const y = (meta0.data[i].y + meta1.data[i].y) / 2;
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = 'italic 15px Arial';
            ctx.fillStyle = '#777';
            ctx.textAlign = 'center';
            ctx.fillText('The Strategy Gap', x, y);
            ctx.restore();
        }
    };

    const ctx = document.getElementById('acg-canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'AI Capability',
                    data: capability,
                    borderColor: '#E65100',
                    backgroundColor: 'rgba(255, 224, 178, 0.4)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#E65100',
                    tension: 0.25,
                    fill: '+1'   // shade down to the adoption curve
                },
                {
                    label: 'Institutional Adoption',
                    data: adoption,
                    borderColor: '#4682B4',
                    borderDash: [7, 5],
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#4682B4',
                    tension: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'nearest', intersect: false },
            scales: {
                y: {
                    min: 0, max: 100,
                    title: { display: true,
                             text: 'Relative Capability / Adoption Level' }
                },
                x: { title: { display: true, text: 'Year' } }
            },
            plugins: {
                legend: { position: 'top', align: 'start' },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            return 'Year: ' + item.label + ' | ' +
                                item.dataset.label + ': ' + item.formattedValue;
                        }
                    }
                }
            },
            onClick: function (event) {
                // click inside the shaded gap region -> show gap infobox
                const xScale = chart.scales.x;
                const yScale = chart.scales.y;
                const pos = event.native;
                const rect = chart.canvas.getBoundingClientRect();
                const px = pos.clientX - rect.left;
                const py = pos.clientY - rect.top;
                if (px < xScale.left || px > xScale.right) return;
                const xVal = xScale.getValueForPixel(px);
                const i = Math.max(0, Math.min(years.length - 1, Math.round(xVal)));
                const capY = yScale.getPixelForValue(capability[i]);
                const adoY = yScale.getPixelForValue(adoption[i]);
                const top = Math.min(capY, adoY), bottom = Math.max(capY, adoY);
                if (py >= top && py <= bottom) {
                    document.getElementById('acg-info').innerHTML =
                        '<b>The Strategy Gap:</b> ' + GAP_INFO;
                }
            }
        },
        plugins: [gapLabelPlugin]
    });
});
