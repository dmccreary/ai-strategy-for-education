// SWOT Analysis Builder MicroSim
// Build an institutional SWOT analysis quadrant by quadrant, with loadable
// examples by institution type and context.
// CANVAS_HEIGHT: 605
// Library: p5.js
let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;
let containerWidth;

let typeSelect, contextSelect, loadButton, clearButton, printButton;

const QUADRANTS = [
    { key: 'strengths', title: 'Strengths — Internal, Positive',
      color: '#c8e6c9', border: '#2e7d32', titleColor: '#1b5e20',
      def: 'Internal capabilities your institution already has that support an AI strategy.' },
    { key: 'weaknesses', title: 'Weaknesses — Internal, Negative',
      color: '#ffe0b2', border: '#e65100', titleColor: '#9c3c00',
      def: 'Internal limitations that will slow or complicate AI adoption.' },
    { key: 'opportunities', title: 'Opportunities — External, Positive',
      color: '#bbdefb', border: '#1565c0', titleColor: '#0d3c78',
      def: 'External trends and resources your institution could take advantage of.' },
    { key: 'threats', title: 'Threats — External, Negative',
      color: '#ffcdd2', border: '#c62828', titleColor: '#8e0000',
      def: 'External risks that could undermine the strategy if unaddressed.' }
];

// Example entries by institution context. The institution type is reflected
// in the heading; context drives the substance of the example entries.
const EXAMPLES = {
    'Urban Title I': {
        strengths: ['Strong parent community engagement culture',
            'Experienced bilingual teaching staff',
            '1:1 device deployment completed in 2023',
            'Existing relationship with university research partner'],
        weaknesses: ['Limited IT staff for AI implementation support',
            'No current LRS infrastructure',
            'Budget constraints reduce training time available',
            'High teacher turnover in Grades 6–8'],
        opportunities: ['10,000 intelligent textbooks will provide free, high-quality AI-tutored content aligned to state standards',
            'BEAD funding may close home broadband gap',
            'AI early-alert systems address persistent K–3 literacy gap'],
        threats: ['Device fleet aging without replacement budget',
            'Vendor lock-in risk if AI platform adopted without data portability requirement',
            'Community skepticism about AI following recent national media stories']
    },
    'Wealthy suburban': {
        strengths: ['Modern 1:1 device fleet refreshed on a 3-year cycle',
            'In-house data team and operating LRS',
            'High staff retention and strong PD culture',
            'Active, tech-literate parent community'],
        weaknesses: ['Initiative fatigue from overlapping technology programs',
            'AI policy lags behind classroom experimentation',
            'Uneven AI literacy across veteran staff'],
        opportunities: ['Free intelligent textbooks reduce per-student content cost',
            'University partnerships for AI research pilots',
            'Early-adopter reputation attracts grant funding'],
        threats: ['High parent expectations amplify any AI misstep',
            'Privacy-conscious community may resist data collection',
            'Neighboring districts compete for AI-skilled staff']
    },
    'Mid-income suburban': {
        strengths: ['Stable enrollment and budget',
            'Recent LMS consolidation simplifies integration',
            'A cohort of enthusiastic early-adopter teachers'],
        weaknesses: ['Device fleet only partially AI-capable',
            'No dedicated data or AI staff',
            'Professional development time is limited'],
        opportunities: ['Free intelligent textbooks fill content gaps',
            'Regional service cooperative offers shared AI expertise',
            'State grants target mid-size district modernization'],
        threats: ['Budget referendum uncertainty',
            'Vendor pricing aimed at larger districts',
            'Staff poaching by wealthier neighbors']
    },
    'Rural under-resourced': {
        strengths: ['Tight-knit community with strong school trust',
            'Small class sizes enable rapid piloting',
            'Teachers accustomed to wearing many hats'],
        weaknesses: ['Limited home broadband across the service area',
            'Aging device fleet and minimal IT support',
            'Few staff available to lead AI initiatives'],
        opportunities: ['BEAD broadband funding targets rural areas first',
            'Free intelligent textbooks offset thin curriculum budgets',
            'AI tutoring can offset hard-to-staff subject gaps'],
        threats: ['Declining enrollment reduces per-pupil funding',
            'Long bus rides limit after-school AI access',
            'Vendor support assumes urban connectivity']
    },
    'Private school': {
        strengths: ['Agile governance — decisions move quickly',
            'Strong donor base for technology initiatives',
            'Mission flexibility to redesign schedules'],
        weaknesses: ['Small staff stretched across many roles',
            'No formal data governance structures',
            'Tuition pressure limits new spending'],
        opportunities: ['Differentiation: AI-personalized learning as enrollment draw',
            'Free intelligent textbooks reduce content spend',
            'Partnerships with AI-forward peer schools'],
        threats: ['Families may switch schools over AI concerns',
            'Reputational risk from a single privacy incident',
            'Accreditation standards lag AI practice']
    }
};

let entries = { strengths: [], weaknesses: [], opportunities: [], threats: [] };
let headerNote = 'Choose an institution type and context, then click "Load example".';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    typeSelect = createSelect();
    typeSelect.parent(document.querySelector('main'));
    ['K-12 district', 'Elementary school', 'Middle school', 'High school',
     'Community college', 'Four-year university'].forEach(function (t) {
        typeSelect.option(t);
    });
    typeSelect.position(140, drawHeight + 8);

    contextSelect = createSelect();
    contextSelect.parent(document.querySelector('main'));
    ['Wealthy suburban', 'Mid-income suburban', 'Urban Title I',
     'Rural under-resourced', 'Private school'].forEach(function (c) {
        contextSelect.option(c);
    });
    contextSelect.selected('Urban Title I');
    contextSelect.position(440, drawHeight + 8);

    loadButton = createButton('Load example');
    loadButton.parent(document.querySelector('main'));
    loadButton.position(10, drawHeight + 45);
    loadButton.mousePressed(loadExample);

    clearButton = createButton('Clear');
    clearButton.parent(document.querySelector('main'));
    clearButton.position(125, drawHeight + 45);
    clearButton.mousePressed(clearAll);

    printButton = createButton('Print / Export');
    printButton.parent(document.querySelector('main'));
    printButton.position(190, drawHeight + 45);
    printButton.mousePressed(function () { window.print(); });

    describe('SWOT analysis builder with four quadrants: strengths, ' +
        'weaknesses, opportunities, and threats. Dropdowns select an ' +
        'institution type and context; a button loads representative ' +
        'example entries.', LABEL);
}

function loadExample() {
    const ex = EXAMPLES[contextSelect.value()];
    entries = {
        strengths: ex.strengths.slice(),
        weaknesses: ex.weaknesses.slice(),
        opportunities: ex.opportunities.slice(),
        threats: ex.threats.slice()
    };
    headerNote = 'Example SWOT — ' + contextSelect.value() + ' ' +
        typeSelect.value();
}

function clearAll() {
    entries = { strengths: [], weaknesses: [], opportunities: [], threats: [] };
    headerNote = 'Quadrants cleared. Load an example or adapt this framework on paper.';
}

function draw() {
    updateCanvasSize();

    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('SWOT Analysis Builder', canvasWidth / 2, 8);
    textSize(13);
    fill(90);
    text(headerNote, canvasWidth / 2, 33);

    // quadrant geometry
    const gridTop = 56;
    const gridH = drawHeight - gridTop - 10;
    const qW = (canvasWidth - 30) / 2;
    const qH = (gridH - 10) / 2;

    QUADRANTS.forEach(function (q, i) {
        const col = i % 2, row = Math.floor(i / 2);
        const x = 10 + col * (qW + 10);
        const y = gridTop + row * (qH + 10);

        fill(q.color);
        stroke(q.border);
        strokeWeight(1.5);
        rect(x, y, qW, qH, 8);
        strokeWeight(1);

        noStroke();
        fill(q.titleColor);
        textSize(15);
        textAlign(LEFT, TOP);
        text(q.title, x + 10, y + 8);

        // hover definition
        if (mouseX > x && mouseX < x + qW && mouseY > y && mouseY < y + qH) {
            fill(80);
            textSize(11.5);
            text(q.def, x + 10, y + 28, qW - 20, 30);
        }

        // entries
        fill(40);
        textSize(12.5);
        let ey = y + 52;
        entries[q.key].forEach(function (e) {
            if (ey > y + qH - 14) return;
            text('• ' + e, x + 12, ey, qW - 24, qH - (ey - y) - 6);
            // advance by wrapped line count (approximate)
            const lines = Math.ceil(textWidth(e) / (qW - 40)) || 1;
            ey += lines * 16 + 6;
        });
        if (entries[q.key].length === 0) {
            fill(150);
            textSize(12);
            text('(empty — click "Load example")', x + 12, y + 52);
        }
    });

    // control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Institution type:', 10, drawHeight + 20);
    text('Institution context:', 310, drawHeight + 20);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        containerWidth = container.offsetWidth;
        canvasWidth = containerWidth;
    }
}
