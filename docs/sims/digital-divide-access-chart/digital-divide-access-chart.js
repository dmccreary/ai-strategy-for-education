// Digital Divide Access Chart MicroSim
// Device, broadband, and AI-tool access disparities across school types.
// CANVAS_HEIGHT: 560
// Library: Chart.js

document.addEventListener('DOMContentLoaded', function () {

    const schoolTypes = [
        'Wealthy suburban district',
        'Mid-income suburban district',
        'Urban Title I district',
        'Rural under-resourced district'
    ];

    const metrics = [
        { label: 'Students with reliable home broadband (%)',
          color: '#4682B4',
          data: [95, 82, 64, 55],
          implication: function (v) {
              return v + '% of students in this school type have home ' +
                  'broadband. AI tutoring that requires home internet cannot ' +
                  'benefit the ' + (100 - v) + '% who don’t.';
          } },
        { label: 'Students with a personal device at home (%)',
          color: '#00897b',
          data: [92, 79, 61, 58],
          implication: function (v) {
              return v + '% of students here have a personal device at home. ' +
                  'Take-home AI study tools assume a device — the other ' +
                  (100 - v) + '% need school-provided hardware to participate.';
          } },
        { label: 'Schools with current AI-compatible device fleet (%)',
          color: '#FF8C00',
          data: [88, 72, 48, 42],
          implication: function (v) {
              return 'Only ' + v + '% of schools in this group have device ' +
                  'fleets that can run current AI tools. The remaining ' +
                  (100 - v) + '% need fleet upgrades before classroom AI use ' +
                  'is realistic.';
          } }
    ];

    const BENCHMARKS = [95, 92, 88]; // wealthy-suburban values per metric
    let showGap = false;

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .dda-wrap { width: 100%; background: white; box-sizing: border-box; }
      .dda-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .dda-chart { position: relative; width: 100%; height: 380px;
        padding: 0 10px; box-sizing: border-box; }
      .dda-bar { display: flex; align-items: center; gap: 14px;
        margin: 6px 10px 0 10px; }
      .dda-bar button { padding: 7px 14px; font-size: 13px; cursor: pointer;
        border: 1px solid #888; background: #f0f0f0; border-radius: 6px; }
      .dda-bar button:hover { background: #e0e0e0; }
      .dda-bar button.on { background: #ffcdd2; border-color: #c62828; }
      .dda-info { min-height: 80px; margin: 8px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 14px; line-height: 1.45;
        box-sizing: border-box; }
      .dda-info b { color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'dda-wrap';
    wrap.innerHTML = `
      <div class="dda-title">The Digital Divide — Access by School Type</div>
      <div class="dda-chart"><canvas id="dda-canvas"></canvas></div>
      <div class="dda-bar">
        <button id="dda-gap">Show equity gap</button>
        <span style="font-size:12px;color:#777">Click any bar to see the
        implication for AI access in that school type.</span>
      </div>
      <div class="dda-info" id="dda-info">
        <b>Explore:</b> Compare the three access measures across the four
        school types. The divide compounds: students with no broadband, no
        device, and an outdated school fleet are shut out of AI learning
        three different ways.
      </div>
    `;
    main.appendChild(wrap);

    // plugin: equity-gap benchmark lines (wealthy-suburban values)
    const gapPlugin = {
        id: 'equityGap',
        afterDatasetsDraw: function (chart) {
            if (!showGap) return;
            const ctx = chart.ctx;
            const x = chart.scales.x, y = chart.scales.y;
            ctx.save();
            BENCHMARKS.forEach(function (v, i) {
                const px = x.getPixelForValue(v);
                ctx.strokeStyle = '#c62828';
                ctx.setLineDash([6, 5]);
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(px, y.top);
                ctx.lineTo(px, y.bottom);
                ctx.stroke();
            });
            ctx.setLineDash([]);
            ctx.fillStyle = '#c62828';
            ctx.font = '11px Arial';
            ctx.textAlign = 'right';
            ctx.fillText('Wealthy-suburban benchmarks',
                x.getPixelForValue(BENCHMARKS[2]) - 6, y.top + 12);
            ctx.restore();
        }
    };

    const ctx = document.getElementById('dda-canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: schoolTypes,
            datasets: metrics.map(function (m) {
                return {
                    label: m.label,
                    data: m.data,
                    backgroundColor: m.color + 'cc',
                    borderColor: m.color,
                    borderWidth: 1.5
                };
            })
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0, max: 100,
                    title: { display: true, text: 'Percent with access' }
                }
            },
            plugins: {
                legend: { position: 'top', align: 'start',
                          labels: { boxWidth: 12, font: { size: 11 } } },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            return item.dataset.label + ': ' +
                                item.formattedValue + '% (' + item.label + ')';
                        }
                    }
                }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    const el = elements[0];
                    const m = metrics[el.datasetIndex];
                    const v = m.data[el.index];
                    document.getElementById('dda-info').innerHTML =
                        '<b>' + schoolTypes[el.index] + ':</b> ' +
                        m.implication(v);
                }
            }
        },
        plugins: [gapPlugin]
    });

    const gapBtn = document.getElementById('dda-gap');
    gapBtn.addEventListener('click', function () {
        showGap = !showGap;
        gapBtn.classList.toggle('on', showGap);
        gapBtn.textContent = showGap ? 'Hide equity gap' : 'Show equity gap';
        chart.update();
    });
});
