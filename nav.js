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
   - "url" always starts with "/" (site root) — works the same
     whether the script runs from /index.html or /business/foo.html.

   HOW TO ADD THIS TO A PAGE
   ------------------------------------------------------------
   Paste this one line just before </body>:

     <script src="/nav.js" defer></script>

   That's it — no other markup needed. The menu button appears
   automatically, fixed in the top-left corner.
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

(function () {
  "use strict";

  // ---- Build category → items map, preserving first-seen order ----
  var categories = [];
  var byCategory = {};
  BIZOMICS_NAV.forEach(function (item) {
    if (!byCategory[item.category]) {
      byCategory[item.category] = [];
      categories.push(item.category);
    }
    byCategory[item.category].push(item);
  });

  var currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

  function isCurrent(url) {
    var normalized = url.replace(/\/index\.html$/, "/");
    return normalized === currentPath;
  }

  // ---- Styles ----
  var style = document.createElement("style");
  style.textContent =
    "#biz-nav-toggle{position:fixed;top:16px;left:16px;z-index:301;width:44px;height:44px;" +
    "border-radius:50%;border:1px solid var(--border,rgba(255,255,255,0.12));" +
    "background:var(--bg-card,#0d1f19);color:var(--text,#eef5f2);cursor:pointer;" +
    "display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.25);" +
    "transition:border-color .2s, background .2s;font-family:'DM Sans',sans-serif;}" +
    "#biz-nav-toggle:hover{border-color:var(--accent,#10b981);background:var(--bg-hover,#122b22);}" +
    "#biz-nav-toggle svg{width:20px;height:20px;}" +
    "#biz-nav-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:299;" +
    "opacity:0;pointer-events:none;transition:opacity .25s;}" +
    "#biz-nav-overlay.open{opacity:1;pointer-events:auto;}" +
    "#biz-nav-panel{position:fixed;top:0;left:0;bottom:0;width:300px;max-width:85vw;z-index:300;" +
    "background:var(--bg-card,#0d1f19);border-right:1px solid var(--border,rgba(255,255,255,0.08));" +
    "transform:translateX(-100%);transition:transform .3s cubic-bezier(.4,0,.2,1);" +
    "overflow-y:auto;font-family:'DM Sans',sans-serif;}" +
    "#biz-nav-panel.open{transform:translateX(0);}" +
    "#biz-nav-header{padding:20px 22px 16px;border-bottom:1px solid var(--border,rgba(255,255,255,0.08));" +
    "display:flex;align-items:center;justify-content:space-between;}" +
    "#biz-nav-header .brand{font-family:'Fraunces',serif;font-weight:700;font-size:17px;color:var(--text,#eef5f2);}" +
    "#biz-nav-header .brand span{color:var(--accent,#10b981);}" +
    "#biz-nav-close{width:30px;height:30px;border-radius:50%;border:1px solid var(--border,rgba(255,255,255,0.1));" +
    "background:transparent;color:var(--text-muted,rgba(238,245,242,0.5));cursor:pointer;font-size:14px;}" +
    "#biz-nav-close:hover{border-color:var(--accent,#10b981);color:var(--accent-lt,#34d399);}" +
    "#biz-nav-body{padding:8px 14px 28px;}" +
    ".biz-nav-cat{margin-top:20px;}" +
    ".biz-nav-cat:first-child{margin-top:14px;}" +
    ".biz-nav-cat-title{font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:700;" +
    "color:var(--accent,#10b981);padding:0 10px 8px;}" +
    ".biz-nav-link{display:block;padding:10px 12px;border-radius:10px;text-decoration:none;" +
    "color:var(--text,#eef5f2);font-size:13.5px;font-weight:500;line-height:1.4;transition:background .15s;}" +
    ".biz-nav-link:hover{background:var(--bg-hover,#122b22);}" +
    ".biz-nav-link.current{background:var(--accent-glow,rgba(16,185,129,0.15));color:var(--accent-lt,#34d399);font-weight:700;}" +
    "@media (max-width:600px){#biz-nav-toggle{top:12px;left:12px;}}";
  document.head.appendChild(style);

  // ---- Toggle button ----
  var toggle = document.getElementById("biz-nav-trigger") || document.createElement("button");
  if (!toggle.id) {
    toggle.id = "biz-nav-toggle";
    toggle.setAttribute("aria-label", "Open site navigation");
    toggle.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    document.body.appendChild(toggle);
  }

  // ---- Overlay + panel ----
  var overlay = document.createElement("div");
  overlay.id = "biz-nav-overlay";
  document.body.appendChild(overlay);

  var panel = document.createElement("div");
  panel.id = "biz-nav-panel";

  var headerHtml =
    '<div id="biz-nav-header"><div class="brand">BIZ<span>-OMICS</span></div>' +
    '<button id="biz-nav-close" aria-label="Close navigation">✕</button></div>';

  var bodyHtml = '<div id="biz-nav-body">';
  categories.forEach(function (cat) {
    bodyHtml += '<div class="biz-nav-cat"><div class="biz-nav-cat-title">' + cat + '</div>';
    byCategory[cat].forEach(function (item) {
      var cls = "biz-nav-link" + (isCurrent(item.url) ? " current" : "");
      bodyHtml += '<a class="' + cls + '" href="' + item.url + '">' + item.label + "</a>";
    });
    bodyHtml += "</div>";
  });
  bodyHtml += "</div>";

  panel.innerHTML = headerHtml + bodyHtml;
  document.body.appendChild(panel);

  function openNav() {
    panel.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", openNav);
  overlay.addEventListener("click", closeNav);
  document.getElementById("biz-nav-close").addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
})();
