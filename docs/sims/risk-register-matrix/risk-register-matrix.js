// Risk Register Matrix MicroSim
// Plot and prioritize institutional AI risks by likelihood and severity
// on a 5x5 heat-map matrix with draggable risk markers.
// CANVAS_HEIGHT: 565
// Library: p5.js
let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;
let containerWidth;

let addButton, clearButton, thresholdSelect, noteInput;

// matrix plot area inside the drawing region
let plotLeft = 90;
let plotTop = 60;
let plotBottomPad = 50;
let plotRightPad = 230; // leave room for the infobox panel

let risks = [];
let selectedRisk = null;
let dragRisk = null;
let addedCount = 0;

function defaultRisks() {
    return [
        { name: 'Data breach', likelihood: 2, severity: 5, builtin: true, note: '' },
        { name: 'Bias in alerts', likelihood: 3, severity: 4, builtin: true, note: '' },
        { name: 'Over-reliance', likelihood: 4, severity: 3, builtin: true, note: '' },
        { name: 'Vendor lock-in', likelihood: 2, severity: 4, builtin: true, note: '' },
        { name: 'Hallucination', likelihood: 3, severity: 3, builtin: true, note: '' }
    ];
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    risks = defaultRisks();

    addButton = createButton('Add Risk');
    addButton.parent(document.querySelector('main'));
    addButton.position(10, drawHeight + 8);
    addButton.mousePressed(addRisk);

    clearButton = createButton('Clear Added Risks');
    clearButton.parent(document.querySelector('main'));
    clearButton.position(95, drawHeight + 8);
    clearButton.mousePressed(clearAdded);

    thresholdSelect = createSelect();
    thresholdSelect.parent(document.querySelector('main'));
    thresholdSelect.option('none');
    thresholdSelect.option('5');
    thresholdSelect.option('8');
    thresholdSelect.option('10');
    thresholdSelect.option('12');
    thresholdSelect.selected('none');
    thresholdSelect.position(450, drawHeight + 8);

    noteInput = createInput('');
    noteInput.parent(document.querySelector('main'));
    noteInput.position(170, drawHeight + 45);
    noteInput.size(canvasWidth - 170 - margin);
    noteInput.attribute('placeholder', 'Select a risk, then type a mitigation note here');
    noteInput.input(function () {
        if (selectedRisk) selectedRisk.note = noteInput.value();
    });

    describe('A 5 by 5 risk matrix heat map. Institutional AI risks appear ' +
        'as draggable circles positioned by likelihood and severity, with ' +
        'risk scores, a highlight threshold, and mitigation notes.', LABEL);
}

function addRisk() {
    addedCount++;
    const r = { name: 'New risk ' + addedCount, likelihood: 3, severity: 3,
                builtin: false, note: '' };
    risks.push(r);
    selectedRisk = r;
    noteInput.value('');
}

function clearAdded() {
    risks = risks.filter(function (r) { return r.builtin; });
    if (selectedRisk && !selectedRisk.builtin) selectedRisk = null;
    addedCount = 0;
}

function cellColor(score) {
    if (score <= 4) return color('#c8e6c9');   // low - light green
    if (score <= 10) return color('#fff59d');  // medium - yellow
    if (score <= 16) return color('#ffcc80');  // high - orange
    return color('#ef9a9a');                   // critical - red
}

function plotRight() { return canvasWidth - plotRightPad; }
function plotBottom() { return drawHeight - plotBottomPad; }

function xForLikelihood(l) {
    return map(l, 0.5, 5.5, plotLeft, plotRight());
}
function yForSeverity(s) {
    return map(s, 0.5, 5.5, plotBottom(), plotTop);
}

function draw() {
    updateCanvasSize();

    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // heat-map cells
    const cellW = (plotRight() - plotLeft) / 5;
    const cellH = (plotBottom() - plotTop) / 5;
    for (let li = 1; li <= 5; li++) {
        for (let si = 1; si <= 5; si++) {
            fill(cellColor(li * si));
            stroke(255);
            rect(plotLeft + (li - 1) * cellW, plotTop + (5 - si) * cellH,
                cellW, cellH);
        }
    }

    // axis tick labels
    noStroke();
    fill(60);
    textSize(13);
    textAlign(CENTER, TOP);
    for (let li = 1; li <= 5; li++) {
        text(li, plotLeft + (li - 0.5) * cellW, plotBottom() + 6);
    }
    textAlign(RIGHT, CENTER);
    for (let si = 1; si <= 5; si++) {
        text(si, plotLeft - 8, plotTop + (5 - si + 0.5) * cellH);
    }
    textAlign(CENTER, TOP);
    textSize(14);
    text('Likelihood (1 = rare, 5 = almost certain)',
        (plotLeft + plotRight()) / 2, plotBottom() + 24);
    push();
    translate(30, (plotTop + plotBottom()) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Severity (1 = minor, 5 = severe)', 0, 0);
    pop();

    // title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('AI Risk Register Matrix', (plotLeft + plotRight()) / 2, 10);
    textSize(13);
    fill(90);
    text('Drag risks to refine your assessment — click one to add a note',
        (plotLeft + plotRight()) / 2, 36);

    // threshold
    const thr = thresholdSelect.value() === 'none' ? 0
        : parseInt(thresholdSelect.value(), 10);

    // risk circles
    let hovered = null;
    risks.forEach(function (r) {
        const score = r.likelihood * r.severity;
        const x = xForLikelihood(r.likelihood);
        const y = yForSeverity(r.severity);
        const dimmed = thr > 0 && score < thr;
        const isSel = r === selectedRisk;

        stroke(isSel ? '#1a3a6c' : 60);
        strokeWeight(isSel ? 3 : 1.5);
        fill(dimmed ? color(200, 200, 200, 160) : color(70, 130, 180, 220));
        circle(x, y, 38);
        noStroke();
        fill(dimmed ? 150 : 255);
        textSize(13);
        textAlign(CENTER, CENTER);
        text(score, x, y);
        fill(dimmed ? 170 : 30);
        textSize(11);
        textAlign(CENTER, TOP);
        text(r.name, x, y + 22);

        if (dist(mouseX, mouseY, x, y) < 19) hovered = r;
    });

    // hover tooltip
    if (hovered && !dragRisk) {
        const label = hovered.name + ' — score ' +
            (hovered.likelihood * hovered.severity);
        textSize(13);
        const w = textWidth(label) + 16;
        const x = constrain(mouseX, plotLeft, plotRight() - w);
        fill(255, 255, 255, 240);
        stroke(150);
        rect(x, mouseY - 34, w, 22, 6);
        noStroke();
        fill(30);
        textAlign(LEFT, CENTER);
        text(label, x + 8, mouseY - 23);
    }

    // infobox panel for the selected risk
    const ibx = plotRight() + 14;
    fill(255, 255, 255, 235);
    stroke(200);
    rect(ibx, plotTop, canvasWidth - ibx - 12, 230, 10);
    noStroke();
    fill(30);
    textSize(14);
    textAlign(LEFT, TOP);
    if (selectedRisk) {
        const score = selectedRisk.likelihood * selectedRisk.severity;
        text('Risk: ' + selectedRisk.name, ibx + 10, plotTop + 12);
        textSize(13);
        fill(60);
        text('Likelihood: ' + selectedRisk.likelihood, ibx + 10, plotTop + 40);
        text('Severity: ' + selectedRisk.severity, ibx + 10, plotTop + 60);
        text('Score: ' + score + ' (' + scoreBand(score) + ')',
            ibx + 10, plotTop + 80);
        text('Mitigation note:', ibx + 10, plotTop + 106);
        fill(40);
        text(selectedRisk.note || '(type a note in the field below)',
            ibx + 10, plotTop + 126, canvasWidth - ibx - 32, 95);
    } else {
        text('Click a risk circle to', ibx + 10, plotTop + 12);
        text('inspect it and add a', ibx + 10, plotTop + 32);
        text('mitigation note.', ibx + 10, plotTop + 52);
    }

    // legend below infobox
    const ly = plotTop + 244;
    textSize(12);
    const bands = [
        ['1–4 Low', '#c8e6c9'], ['5–10 Medium', '#fff59d'],
        ['11–16 High', '#ffcc80'], ['17–25 Critical', '#ef9a9a']
    ];
    bands.forEach(function (bnd, i) {
        fill(bnd[1]);
        stroke(150);
        rect(ibx, ly + i * 24, 16, 16, 3);
        noStroke();
        fill(60);
        textAlign(LEFT, CENTER);
        text(bnd[0], ibx + 24, ly + i * 24 + 8);
    });

    // control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Highlight risks above score:', 250, drawHeight + 20);
    text('Mitigation note:', 60, drawHeight + 57);
}

function scoreBand(s) {
    if (s <= 4) return 'Low';
    if (s <= 10) return 'Medium';
    if (s <= 16) return 'High';
    return 'Critical';
}

function mousePressed() {
    for (let i = risks.length - 1; i >= 0; i--) {
        const r = risks[i];
        const x = xForLikelihood(r.likelihood);
        const y = yForSeverity(r.severity);
        if (dist(mouseX, mouseY, x, y) < 19) {
            dragRisk = r;
            selectedRisk = r;
            noteInput.value(r.note);
            return;
        }
    }
}

function mouseDragged() {
    if (!dragRisk) return;
    let l = map(mouseX, plotLeft, plotRight(), 0.5, 5.5);
    let s = map(mouseY, plotBottom(), plotTop, 0.5, 5.5);
    dragRisk.likelihood = constrain(Math.round(l), 1, 5);
    dragRisk.severity = constrain(Math.round(s), 1, 5);
}

function mouseReleased() {
    dragRisk = null;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    noteInput.size(canvasWidth - 170 - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        containerWidth = container.offsetWidth;
        canvasWidth = containerWidth;
    }
}
