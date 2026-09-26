/* ============================================================
   BIZ-OMICS · SITE NAVIGATION
   ------------------------------------------------------------
   Adds a slide-out menu to any page that includes this script.
   Works from any folder depth because links start with "/".

   HOW TO EDIT THE MENU
   ------------------------------------------------------------
   Everything you see and can change lives in BIZOMICS_NAV below.
   Each line is one link:

     { category: "Section heading", label: "What the student sees", url: "/path/to/page.html" }

   - Add a line to add a link. Delete a line to remove one.
   - Links with the same "category" get grouped under one heading,
     in the order you write them.
   - Reorder categories by moving the block of lines up or down.
   - "url" always starts with "/" (site root).

   SECTION COLOURS
   ------------------------------------------------------------
   Headings named "Economics" show in amber, "Business" in blue,
   "Start Here" in purple, "More" in green; anything else is neutral. Change these in
   CATEGORY_COLOURS below.

   HOW TO ADD THIS TO A PAGE
   ------------------------------------------------------------
   Paste this one line just before </body>:

     <script src="/nav.js" defer></script>

   THEMING
   ------------------------------------------------------------
   Matches the 2026 BIZ-OMICS look (navy, Space Grotesk / Inter).
   Carries its own dark palette, and switches to its light palette
   whenever <html> or <body> has data-theme="light".
   ============================================================ */

const BIZOMICS_NAV = [
  { category: "Start Here", label: "BIZ-OMICS Home", url: "/index.html" },
  { category: "Start Here", label: "Economics Hub", url: "/economics/index.html" },
  { category: "Start Here", label: "Business Hub", url: "/business/index.html" },
  { category: "Start Here", label: "Foundations (KS3)", url: "/foundations/index.html" },
  { category: "Start Here", label: "Find a Tutor", url: "/tutoring.html" },

  { category: "Economics", label: "Adaptive Multiple Choice Bank", url: "/economics/adaptive-mcq/index.html" },
  { category: "Economics", label: "Arcade Games", url: "/economics/Economics_Games.html" },
  { category: "Economics", label: "Competitions", url: "/economics/competitions_calendar.html" },
  { category: "Economics", label: "Contextual Examples", url: "/economics/Economics_Context.html" },
  { category: "Economics", label: "Diagram Bank", url: "/economics/diagrams.html" },
  { category: "Economics", label: "Digital Text Books", url: "/economics/digital-textbook.html" },
  { category: "Economics", label: "Key Term Glossary Bank", url: "/economics/Economics_Glossary.html" },
  { category: "Economics", label: "Magazines", url: "/economics/magazine.html" },
  { category: "Economics", label: "News", url: "/economics/Economics_News.html" },
  { category: "Economics", label: "Reading List", url: "/economics/reading_listening.html" },
  { category: "Economics", label: "Schools of Thought", url: "/economics/schools_of_thought.html" },
  { category: "Economics", label: "Simulated Resources", url: "/economics/shop.html" },
  { category: "Economics", label: "University Rankings", url: "/economics/university_rankings.html" },

  { category: "Business", label: "Context Examples", url: "/business/Business_Context.html" },
  { category: "Business", label: "Diagram Bank", url: "/business/Business_Diagrams_Bank.html" },
  { category: "Business", label: "Key Term Glossary Bank", url: "/business/Business_Key_Terms_Glossary_Bank.html" },
  { category: "Business", label: "News", url: "/business/business-news.html" },
  { category: "Business", label: "Simulated Resources", url: "/business/exam-boards.html" },
  { category: "Business", label: "University Support", url: "/business/business_futures.html" },

  { category: "More", label: "Explore All Free Resources", url: "/explore.html" },
];

const CATEGORY_COLOURS = {
  "Start Here": "#8b5cf6",
  "Economics":  "#f59e0b",
  "Business":   "#3b82f6",
  "More":       "#10b981"
};

(function () {
  "use strict";

  var LOGO = "data:image/png;base64,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";

  // ---- Group links by category, preserving order ----
  var categories = [];
  var byCategory = {};
  BIZOMICS_NAV.forEach(function (item) {
    if (!byCategory[item.category]) { byCategory[item.category] = []; categories.push(item.category); }
    byCategory[item.category].push(item);
  });

  var currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  function isCurrent(url) { return url.replace(/\/index\.html$/, "/") === currentPath; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  // ---- Fonts (only if the page hasn't loaded them already) ----
  if (!document.querySelector('link[href*="Space+Grotesk"]')) {
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap";
    document.head.appendChild(f);
  }

  // ---- Styles ----
  var css = [
    "#biz-nav-toggle{--bn-bg:#0e1424;--bn-bd:rgba(255,255,255,0.12);--bn-tx:#f1f5f9;",
      "position:fixed;top:14px;left:16px;z-index:298;width:42px;height:42px;border-radius:12px;",
      "border:1px solid var(--bn-bd);background:var(--bn-bg);color:var(--bn-tx);cursor:pointer;",
      "display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.3);",
      "transition:border-color .2s,transform .2s,opacity .2s;}",
    "#biz-nav-toggle:hover{border-color:#f59e0b;transform:translateY(-1px);}",
    "#biz-nav-toggle:focus-visible{outline:2px solid #f59e0b;outline-offset:2px;}",
    "#biz-nav-toggle svg{width:20px;height:20px;}",
    "body.biz-nav-open #biz-nav-toggle{opacity:0;pointer-events:none;}",

    "#biz-nav-overlay{position:fixed;inset:0;background:rgba(3,6,14,0.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);",
      "z-index:299;opacity:0;pointer-events:none;transition:opacity .25s;}",
    "#biz-nav-overlay.open{opacity:1;pointer-events:auto;}",

    "#biz-nav-panel{--p-bg:#0b1120;--p-bg2:#111a2e;--p-bd:rgba(255,255,255,0.08);--p-tx:#f1f5f9;--p-mu:#94a3b8;--p-hover:rgba(255,255,255,0.05);",
      "position:fixed;top:0;left:0;bottom:0;width:320px;max-width:86vw;z-index:300;",
      "background:radial-gradient(ellipse 120% 40% at 0% 0%,rgba(245,158,11,0.08),transparent 60%),var(--p-bg);",
      "border-right:1px solid var(--p-bd);box-shadow:20px 0 60px rgba(0,0,0,0.35);",
      "transform:translateX(-102%);transition:transform .32s cubic-bezier(.2,.8,.2,1);",
      "display:flex;flex-direction:column;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;color:var(--p-tx);-webkit-font-smoothing:antialiased;}",
    "#biz-nav-panel.open{transform:translateX(0);}",

    "#biz-nav-header{padding:18px 18px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;}",
    "#biz-nav-header a{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--p-tx);}",
    "#biz-nav-header img{width:36px;height:36px;display:block;filter:drop-shadow(0 4px 10px rgba(59,130,246,0.25));}",
    "#biz-nav-header .brand{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:18px;letter-spacing:-0.02em;}",
    "#biz-nav-header .brand span{color:#f59e0b;}",
    "#biz-nav-close{width:34px;height:34px;border-radius:50%;border:1px solid var(--p-bd);background:transparent;",
      "color:var(--p-mu);cursor:pointer;font-size:13px;display:grid;place-items:center;transition:all .15s;flex-shrink:0;}",
    "#biz-nav-close:hover{border-color:#f59e0b;color:#f59e0b;}",

    "#biz-nav-search{position:relative;margin:4px 18px 10px;}",
    "#biz-nav-search svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;stroke:var(--p-mu);fill:none;stroke-width:2;stroke-linecap:round;pointer-events:none;}",
    "#biz-nav-search input{width:100%;box-sizing:border-box;padding:10px 12px 10px 34px;border-radius:11px;",
      "border:1px solid var(--p-bd);background:var(--p-bg2);color:var(--p-tx);font:inherit;font-size:13.5px;outline:none;",
      "transition:border-color .15s,box-shadow .15s;}",
    "#biz-nav-search input::placeholder{color:var(--p-mu);}",
    "#biz-nav-search input:focus{border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.14);}",
    "#biz-nav-search input::-webkit-search-cancel-button{display:none;}",

    "#biz-nav-body{flex:1;overflow-y:auto;padding:0 12px 24px;border-top:1px solid var(--p-bd);}",
    ".biz-nav-cat{margin-top:18px;}",
    ".biz-nav-cat-title{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',ui-monospace,monospace;",
      "font-size:10.5px;text-transform:uppercase;letter-spacing:0.14em;font-weight:600;color:var(--c);padding:0 10px 8px;}",
    ".biz-nav-cat-title::before{content:'';width:7px;height:7px;border-radius:2px;background:var(--c);}",
    ".biz-nav-link{position:relative;display:flex;align-items:center;justify-content:space-between;gap:8px;",
      "padding:9px 12px;border-radius:10px;text-decoration:none;color:var(--p-tx);font-size:14px;font-weight:500;line-height:1.35;",
      "transition:background .15s,color .15s;}",
    ".biz-nav-link::after{content:'\\2192';color:var(--p-mu);opacity:0;transform:translateX(-4px);transition:all .15s;}",
    ".biz-nav-link:hover{background:var(--p-hover);}",
    ".biz-nav-link:hover::after{opacity:1;transform:none;color:var(--c);}",
    ".biz-nav-link.current{background:color-mix(in srgb,var(--c) 14%,transparent);color:var(--c);font-weight:600;}",
    ".biz-nav-link.current::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:3px;background:var(--c);}",
    ".biz-nav-link.hidden,.biz-nav-cat.hidden{display:none;}",
    "#biz-nav-empty{display:none;padding:18px 12px;font-size:13px;color:var(--p-mu);}",
    "#biz-nav-empty a{color:#f59e0b;}",

    /* ---- Light mode ---- */
    "[data-theme=\"light\"] #biz-nav-toggle{--bn-bg:#ffffff;--bn-bd:rgba(15,23,42,0.12);--bn-tx:#0f172a;box-shadow:0 6px 20px rgba(15,23,42,0.1);}",
    "[data-theme=\"light\"] #biz-nav-panel{--p-bg:#ffffff;--p-bg2:#f6f7fb;--p-bd:rgba(15,23,42,0.1);--p-tx:#0f172a;--p-mu:#5b6478;--p-hover:rgba(15,23,42,0.04);",
      "box-shadow:20px 0 60px rgba(15,23,42,0.12);}",
    "[data-theme=\"light\"] #biz-nav-overlay{background:rgba(15,23,42,0.3);}",

    "@media (max-width:600px){#biz-nav-toggle{top:12px;left:12px;}}",
    "@media (prefers-reduced-motion:reduce){#biz-nav-panel,#biz-nav-overlay,#biz-nav-toggle{transition:none;}}"
  ].join("");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Toggle button ----
  var toggle = document.getElementById("biz-nav-trigger") || document.createElement("button");
  if (!toggle.id) {
    toggle.id = "biz-nav-toggle";
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="14" y2="17"/></svg>';
    document.body.appendChild(toggle);
  }
  toggle.setAttribute("aria-label", "Open site menu");
  toggle.setAttribute("aria-controls", "biz-nav-panel");
  toggle.setAttribute("aria-expanded", "false");

  // ---- Overlay + panel ----
  var overlay = document.createElement("div");
  overlay.id = "biz-nav-overlay";
  document.body.appendChild(overlay);

  var panel = document.createElement("nav");
  panel.id = "biz-nav-panel";
  panel.setAttribute("aria-label", "Site menu");

  var html =
    '<div id="biz-nav-header"><a href="/index.html"><img src="' + LOGO + '" alt=""><span class="brand">BIZ-<span>OMICS</span></span></a>' +
    '<button id="biz-nav-close" aria-label="Close menu">\u2715</button></div>' +
    '<div id="biz-nav-search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>' +
    '<input type="search" id="biz-nav-filter" placeholder="Search the menu\u2026" autocomplete="off" aria-label="Search the menu"></div>' +
    '<div id="biz-nav-body">';
  categories.forEach(function (cat) {
    var c = CATEGORY_COLOURS[cat] || "#94a3b8";
    html += '<div class="biz-nav-cat" style="--c:' + c + '"><div class="biz-nav-cat-title">' + esc(cat) + '</div>';
    byCategory[cat].forEach(function (item) {
      var cur = isCurrent(item.url);
      html += '<a class="biz-nav-link' + (cur ? ' current' : '') + '"' + (cur ? ' aria-current="page"' : '') +
              ' href="' + esc(item.url) + '" data-k="' + esc((item.label + ' ' + item.category).toLowerCase()) + '">' + esc(item.label) + '</a>';
    });
    html += '</div>';
  });
  html += '<div id="biz-nav-empty">No matches. <a href="/explore.html">Browse all free resources \u2192</a></div></div>';
  panel.innerHTML = html;
  document.body.appendChild(panel);

  var filter = document.getElementById("biz-nav-filter");

  // ---- Live filter ----
  filter.addEventListener("input", function () {
    var words = filter.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var any = false;
    panel.querySelectorAll(".biz-nav-cat").forEach(function (catEl) {
      var shown = 0;
      catEl.querySelectorAll(".biz-nav-link").forEach(function (a) {
        var k = a.getAttribute("data-k");
        var ok = words.every(function (w) { return k.indexOf(w) !== -1; });
        a.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      catEl.classList.toggle("hidden", shown === 0);
      if (shown) any = true;
    });
    document.getElementById("biz-nav-empty").style.display = any ? "none" : "block";
  });
  filter.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var first = panel.querySelector(".biz-nav-link:not(.hidden)");
      if (first) { e.preventDefault(); window.location.href = first.getAttribute("href"); }
    }
  });

  // ---- Open / close ----
  function openNav() {
    panel.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("biz-nav-open");
    document.body.style.overflow = "hidden";
    toggle.setAttribute("aria-expanded", "true");
    if (window.matchMedia("(hover: hover)").matches) setTimeout(function () { filter.focus(); }, 150);
  }
  function closeNav() {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("biz-nav-open");
    document.body.style.overflow = "";
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", openNav);
  overlay.addEventListener("click", closeNav);
  document.getElementById("biz-nav-close").addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("open")) closeNav();
  });
})();
