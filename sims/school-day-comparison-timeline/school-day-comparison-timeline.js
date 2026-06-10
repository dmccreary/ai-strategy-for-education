// School Day Comparison Timeline MicroSim
// Compare how a traditional school day and an Alpha School day allocate
// the same seven hours.
// CANVAS_HEIGHT: 570
// Library: vis-timeline

document.addEventListener('DOMContentLoaded', function () {

    const DAY = '2025-01-06'; // arbitrary school day
    function t(hm) { return DAY + 'T' + hm + ':00'; }

    const events = [
        // Traditional day
        { id: 1, group: 'trad', start: t('08:00'), end: t('08:45'),
          content: 'Math',
          title: '8:00–8:45 Math Instruction',
          info: 'Whole-class lecture with limited differentiation. Teacher explains; students take notes and practice.' },
        { id: 2, group: 'trad', start: t('08:45'), end: t('09:30'),
          content: 'Reading / LA',
          title: '8:45–9:30 Reading / Language Arts',
          info: 'Whole-class or small-group instruction. One reading level for most students.' },
        { id: 3, group: 'trad', start: t('09:30'), end: t('10:00'),
          content: 'Specials',
          title: '9:30–10:00 Specials (PE, Art, Music)',
          info: '30–60 min of non-academic activity. Limited time for depth.' },
        { id: 4, group: 'trad', start: t('10:00'), end: t('10:45'),
          content: 'Science',
          title: '10:00–10:45 Science',
          info: 'Textbook-based instruction, periodic lab activities.' },
        { id: 5, group: 'trad', start: t('10:45'), end: t('11:30'),
          content: 'Soc. Studies',
          title: '10:45–11:30 Social Studies',
          info: 'Lecture and reading. Limited project time.' },
        { id: 6, group: 'trad', start: t('11:30'), end: t('12:00'),
          content: 'Lunch',
          title: '11:30–12:00 Lunch',
          info: 'Lunch break.' },
        { id: 7, group: 'trad', start: t('12:00'), end: t('13:00'),
          content: 'Indep. Practice',
          title: '12:00–13:00 Independent Practice / Homework preview',
          info: 'Seat work — often at the pace of the class, not the individual student.' },
        { id: 8, group: 'trad', start: t('13:00'), end: t('14:00'),
          content: 'Intervention',
          title: '13:00–14:00 Intervention / Enrichment',
          info: 'For students needing additional support or challenge. Usually one-size-fits-many.' },
        { id: 9, group: 'trad', start: t('14:00'), end: t('15:00'),
          content: 'Instruction / Specials',
          title: '14:00–15:00 More instruction / Specials',
          info: 'Additional whole-class instruction or a second specials block.' },
        // Alpha day
        { id: 10, group: 'alpha', start: t('08:00'), end: t('10:00'),
          content: 'AI-Tutored Core Academics (2 hrs)',
          title: '8:00–10:00 AI-Tutored Core Academics',
          info: 'Students work at their own pace through personalized AI curriculum. Math, reading, science, writing. Teacher monitors and intervenes as needed.' },
        { id: 11, group: 'alpha', start: t('10:00'), end: t('15:00'),
          content: 'Pro-Social Project-Based Learning (5 hrs)',
          title: '10:00–15:00 Pro-Social Project-Based Learning',
          info: 'Robotics, theater, music, sports, debate, community projects. Teacher as coach and mentor. Team-based and collaborative.' },
        { id: 12, group: 'alpha', start: t('12:00'), end: t('12:30'),
          content: 'Lunch',
          title: '12:00–12:30 Lunch (embedded in afternoon block)',
          info: 'Lunch embedded within the project-based learning block.' }
    ];

    const groups = [
        { id: 'trad', content: 'Traditional<br/>School Day' },
        { id: 'alpha', content: 'Alpha<br/>School Day' }
    ];

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .sdc-wrap { width: 100%; background: white; box-sizing: border-box; }
      .sdc-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 2px 4px; }
      .sdc-bar { display: flex; align-items: center; gap: 8px;
        margin: 4px 10px; flex-wrap: wrap; }
      .sdc-bar button { padding: 5px 12px; font-size: 13px; cursor: pointer;
        border: 1px solid #888; background: #f0f0f0; border-radius: 6px; }
      .sdc-bar button:hover { background: #e0e0e0; }
      .sdc-bar button.on { background: #ffe0b2; border-color: #E65100; }
      .sdc-legend { font-size: 12px; color: #555; margin-left: auto; }
      .sdc-legend .sw { display: inline-block; width: 11px; height: 11px;
        border-radius: 3px; margin: 0 3px 0 10px; vertical-align: -1px; }
      #sdc-timeline { width: 100%; height: 360px; }
      .sdc-info { min-height: 86px; margin: 6px 10px 0 10px;
        background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px;
        padding: 10px 14px; font-size: 14px; line-height: 1.45;
        box-sizing: border-box; }
      .sdc-info b { color: #1a3a6c; }
      .vis-item.day-trad { background-color: #4682B4; border-color: #2c5d8f;
        color: white; }
      .vis-item.day-alpha { background-color: #E65100; border-color: #9c3c00;
        color: white; }
      .vis-item.vis-selected { box-shadow: 0 0 6px 2px rgba(26,58,108,0.6); }
      .vis-item .vis-item-content { padding: 3px 6px !important;
        font-size: 12px; }
      .vis-labelset .vis-label { font-size: 13px; font-weight: bold; }
      .vis-tooltip { background: #2c3e50 !important; color: white !important;
        padding: 8px 12px !important; border-radius: 8px !important;
        font-size: 13px !important; max-width: 300px !important;
        white-space: normal !important; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'sdc-wrap';
    wrap.innerHTML = `
      <div class="sdc-title">A School Day, Two Ways — Traditional vs Alpha Model</div>
      <div class="sdc-bar">
        <button id="sdc-compare">Show Comparison</button>
        <button id="sdc-fit">Fit All</button>
        <span class="sdc-legend">
          <span class="sw" style="background:#4682B4"></span>Traditional
          <span class="sw" style="background:#E65100"></span>Alpha
        </span>
      </div>
      <div id="sdc-timeline"></div>
      <div class="sdc-info" id="sdc-info">
        <b>Compare:</b> Click any block to see what happens in it. Both days
        run 8:00–15:00 — notice which activities shift, disappear, or expand
        in the Alpha model.
      </div>
    `;
    main.appendChild(wrap);

    // ---------- timeline ----------
    function makeItems(overlay) {
        return events.map(function (e) {
            return {
                id: e.id,
                group: overlay ? 'combined' : e.group,
                start: e.start, end: e.end,
                content: e.content, title: e.title,
                className: 'day-' + e.group
            };
        });
    }

    const items = new vis.DataSet(makeItems(false));
    const groupSet = new vis.DataSet(groups);

    const timeline = new vis.Timeline(
        document.getElementById('sdc-timeline'), items, groupSet, {
            width: '100%',
            height: '360px',
            margin: { item: { horizontal: 0, vertical: 6 }, axis: 20 },
            orientation: 'top',
            stack: true,
            selectable: true,
            showCurrentTime: false,
            moveable: true,
            zoomable: false,
            zoomMin: 1000 * 60 * 30,
            zoomMax: 1000 * 60 * 60 * 12,
            min: new Date(DAY + 'T07:00:00'),
            max: new Date(DAY + 'T16:00:00'),
            tooltip: { followMouse: true }
        });
    timeline.setWindow(new Date(DAY + 'T07:45:00'), new Date(DAY + 'T15:15:00'));

    const infoBox = document.getElementById('sdc-info');
    timeline.on('select', function (props) {
        if (props.items.length > 0) {
            const e = events.find(function (x) { return x.id === props.items[0]; });
            if (e) {
                infoBox.innerHTML = '<b>' +
                    (e.group === 'trad' ? 'Traditional — ' : 'Alpha — ') +
                    e.title + ':</b> ' + e.info;
            }
        }
    });

    // comparison toggle: overlay both days in a single lane
    let overlay = false;
    const compareBtn = document.getElementById('sdc-compare');
    compareBtn.addEventListener('click', function () {
        overlay = !overlay;
        compareBtn.classList.toggle('on', overlay);
        compareBtn.textContent = overlay ? 'Show Side-by-Side' : 'Show Comparison';
        groupSet.clear();
        if (overlay) {
            groupSet.add([{ id: 'combined', content: 'Both Days<br/>(overlaid)' }]);
        } else {
            groupSet.add(groups);
        }
        items.clear();
        items.add(makeItems(overlay));
        timeline.setWindow(new Date(DAY + 'T07:45:00'),
            new Date(DAY + 'T15:15:00'));
    });

    document.getElementById('sdc-fit').addEventListener('click', function () {
        timeline.setWindow(new Date(DAY + 'T07:45:00'),
            new Date(DAY + 'T15:15:00'));
    });
});
