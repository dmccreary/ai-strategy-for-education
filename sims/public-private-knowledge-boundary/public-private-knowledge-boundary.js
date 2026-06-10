// Public vs Private Knowledge Boundary MicroSim
// Classify institutional information as public training knowledge or
// private data requiring governance, and see the two access pathways.
// CANVAS_HEIGHT: 600
// Library: DOM infographic (vis-network CDN unused by design — card panels)

document.addEventListener('DOMContentLoaded', function () {

    const publicCards = [
        { icon: '📖', label: 'Published textbooks',
          info: 'The AI model already understands this type of information from training. Example: it can explain photosynthesis at any grade level because thousands of published textbooks covered it.' },
        { icon: '🔬', label: 'Scientific research papers',
          info: 'The AI model already understands this type of information from training. Example: it can summarize the research consensus on retrieval practice and learning.' },
        { icon: '📋', label: 'State curriculum standards',
          info: 'The AI model already understands this type of information from training. Example: it can align a lesson plan to widely published state standards — though always verify the edition year.' },
        { icon: '⚖️', label: 'Federal laws and regulations',
          info: 'The AI model already understands this type of information from training. Example: it can explain FERPA requirements in plain language for a staff workshop.' },
        { icon: '📰', label: 'News and public records',
          info: 'The AI model already understands this type of information from training — up to its training cutoff. Example: it knows about major education policy debates, but not last month’s school-board vote.' }
    ];

    const privateCards = [
        { icon: '🎓', label: 'Student grade records',
          info: 'The AI model has NO knowledge of this unless you provide it. Key governance question: does sending student grades to an external AI service comply with FERPA and your data-sharing agreements?' },
        { icon: '🗂️', label: 'Staff performance evaluations',
          info: 'The AI model has NO knowledge of this unless you provide it. Key governance question: who is authorized to expose personnel records to a third-party service, and under what contract terms?' },
        { icon: '💰', label: 'District budget documents',
          info: 'The AI model has NO knowledge of this unless you provide it. Key governance question: are draft budget figures confidential until board approval, and would AI processing count as disclosure?' },
        { icon: '📒', label: 'School discipline logs',
          info: 'The AI model has NO knowledge of this unless you provide it. Key governance question: discipline data is among the most sensitive student data — what de-identification is required before any AI use?' },
        { icon: '📝', label: 'Internal policy drafts',
          info: 'The AI model has NO knowledge of this unless you provide it. Key governance question: could a leaked draft cause harm, and does your AI vendor retain or train on submitted text?' }
    ];

    const PATHWAY_CONTEXT = 'You can paste private documents into your prompt — the context window pathway. This is fast and requires no technical setup, but the data leaves your systems and enters the AI provider’s infrastructure. Review your vendor’s data-use terms before sending anything sensitive. Pathway covered in depth in the chapter on learning telemetry and data governance.';
    const PATHWAY_RAG = 'Retrieval-Augmented Generation (RAG) connects the AI to your private data stores without training the model on that data. Documents stay in systems you control; only the most relevant passages are retrieved at question time. A more privacy-conscious approach — covered in a later chapter.';
    const DEFAULT_INFO = 'Click any card to see whether the AI already knows it — and what governance question it raises. Click an arrow to compare the two access pathways.';

    // ---------- styles ----------
    const style = document.createElement('style');
    style.textContent = `
      .ppb-wrap { width: 100%; box-sizing: border-box; background: white; }
      .ppb-title { text-align: center; font-size: 20px; font-weight: bold;
        padding: 8px 4px 4px 4px; }
      .ppb-panels { display: flex; width: 100%; height: 300px; position: relative; }
      .ppb-panel { width: 42%; box-sizing: border-box; padding: 8px 10px;
        border-radius: 8px; position: relative; }
      .ppb-left { background: #e3f2fd; margin-left: 1%; }
      .ppb-right { background: #fff8e1; margin-right: 1%; }
      .ppb-divider { width: 14%; position: relative; }
      .ppb-divline { position: absolute; left: 50%; top: 4px; bottom: 4px;
        border-left: 4px dashed #555; transform: translateX(-50%); }
      .ppb-divlabel { position: absolute; top: 38%; left: 50%;
        transform: translate(-50%, -50%) rotate(-90deg);
        white-space: nowrap; font-size: 12px; font-weight: bold; color: #333;
        background: white; padding: 2px 6px; }
      .ppb-divnote { position: absolute; bottom: 2px; left: 50%;
        transform: translateX(-50%); width: 96%; font-size: 9.5px;
        color: #666; text-align: center; background: white; border-radius: 4px;
        padding: 2px; }
      .ppb-panel h2 { font-size: 15px; text-align: center; margin: 2px 0 6px 0; }
      .ppb-lock { position: absolute; top: 6px; right: 10px; font-size: 24px; }
      .ppb-card { display: flex; align-items: center; gap: 8px; background: white;
        border: 1px solid #bbb; border-radius: 6px; padding: 5px 8px;
        margin: 5px 0; cursor: pointer; font-size: 13px; user-select: none; }
      .ppb-left .ppb-card:hover { background: #bbdefb; }
      .ppb-right .ppb-card:hover { background: #ffe0b2; }
      .ppb-connectors { position: relative; width: 100%; height: 104px; }
      .ppb-ai { position: absolute; left: 50%; bottom: 6px;
        transform: translateX(-50%); background: #4682B4; color: white;
        border-radius: 10px; padding: 8px 16px; font-weight: bold;
        font-size: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.25); }
      .ppb-arrow { position: absolute; cursor: pointer; font-size: 13px;
        font-weight: bold; padding: 6px 10px; border-radius: 6px;
        border: 2px dashed; background: white; user-select: none; }
      .ppb-arrow:hover { filter: brightness(0.93); }
      .ppb-arrow-cw { left: 8%; top: 12px; border-color: #FF8C00; color: #b35900; }
      .ppb-arrow-rag { right: 8%; top: 12px; border-color: #00796b; color: #00564d; }
      .ppb-svg { position: absolute; inset: 0; width: 100%; height: 100%;
        pointer-events: none; }
      .ppb-info { min-height: 110px; margin: 6px 1% 0 1%; background: #f8f9fa;
        border: 1px solid #ccc; border-radius: 8px; padding: 10px 14px;
        font-size: 14px; line-height: 1.45; box-sizing: border-box; }
      .ppb-info b { color: #1a3a6c; }
    `;
    document.head.appendChild(style);

    // ---------- DOM ----------
    const main = document.querySelector('main');
    const wrap = document.createElement('div');
    wrap.className = 'ppb-wrap';
    wrap.innerHTML = `
      <div class="ppb-title">The Public / Private Knowledge Boundary</div>
      <div class="ppb-panels">
        <div class="ppb-panel ppb-left">
          <h2>Public Knowledge</h2>
          <div id="ppb-public"></div>
        </div>
        <div class="ppb-divider">
          <div class="ppb-divline"></div>
          <div class="ppb-divlabel">Training Cutoff / Privacy Boundary</div>
          <div class="ppb-divnote">Also: AI may lack recent public knowledge
            published after training cutoff.</div>
        </div>
        <div class="ppb-panel ppb-right">
          <span class="ppb-lock">🔒</span>
          <h2>Private Knowledge</h2>
          <div id="ppb-private"></div>
        </div>
      </div>
      <div class="ppb-connectors">
        <svg class="ppb-svg" viewBox="0 0 1000 104" preserveAspectRatio="none">
          <path d="M 250 40 Q 380 80 460 88" fill="none" stroke="#FF8C00"
            stroke-width="3" stroke-dasharray="8,6"
            marker-end="url(#ppb-arr-o)"/>
          <path d="M 750 40 Q 620 80 540 88" fill="none" stroke="#00796b"
            stroke-width="3" stroke-dasharray="8,6"
            marker-end="url(#ppb-arr-t)"/>
          <defs>
            <marker id="ppb-arr-o" markerWidth="8" markerHeight="8" refX="6"
              refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#FF8C00"/></marker>
            <marker id="ppb-arr-t" markerWidth="8" markerHeight="8" refX="6"
              refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#00796b"/></marker>
          </defs>
        </svg>
        <div class="ppb-arrow ppb-arrow-cw" id="ppb-cw">Context Window (manual)</div>
        <div class="ppb-arrow ppb-arrow-rag" id="ppb-rag">🔒 RAG (technical bridge)</div>
        <div class="ppb-ai">AI</div>
      </div>
      <div class="ppb-info" id="ppb-info"></div>
    `;
    main.appendChild(wrap);

    const infoBox = document.getElementById('ppb-info');
    function showInfo(title, text) {
        infoBox.innerHTML = '<b>' + title + ':</b> ' + text;
    }
    showInfo('Explore', DEFAULT_INFO);

    function addCards(containerId, cards) {
        const div = document.getElementById(containerId);
        cards.forEach(function (c) {
            const el = document.createElement('div');
            el.className = 'ppb-card';
            el.innerHTML = '<span>' + c.icon + '</span><span>' + c.label + '</span>';
            el.addEventListener('click', function () { showInfo(c.label, c.info); });
            div.appendChild(el);
        });
    }
    addCards('ppb-public', publicCards);
    addCards('ppb-private', privateCards);

    document.getElementById('ppb-cw').addEventListener('click', function () {
        showInfo('Context Window pathway', PATHWAY_CONTEXT);
    });
    document.getElementById('ppb-rag').addEventListener('click', function () {
        showInfo('RAG pathway', PATHWAY_RAG);
    });
});
