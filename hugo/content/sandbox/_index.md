---
title: Sandbox
description: The sandbox is a place
---

<div class="sandbox">
<div class="menu">
  <div class="vertical-center" style="float:left;">
    <button id="run" class="dark-button" style="margin:.5rem; padding:.5rem 1rem;">Run</button>
    <button id="download" class="dark-button" style="margin:.5rem; padding:.5rem 1rem;">Download</button>
    <button id="svg" class="dark-button" style="margin:.5rem; padding:.5rem 1rem;">SVG</button>
  </div>
  <a class="vertical-center" style="float:right; padding:.5rem;">
    <img src="/icons/full-screen-view.svg" alt="Full Screen Button" width="32px">
  </a>
</div>
<div class="sandbox-grid">
  <div id="editor">
  </div>
  <div class="canvas">
    <div id="interactive-container">
    </div>
  </div>
</div>
</div>

<script src="https://pagecdn.io/lib/ace/1.4.5/ace.js" integrity="sha256-5Xkhn3k/1rbXB+Q/DX/2RuAtaB4dRRyQvMs83prFjpM=" crossorigin="anonymous"></script>
<script type="module" src="/js/sandbox.js"></script>
