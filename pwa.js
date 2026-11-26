/* ============================================================
   BIZ-OMICS · APP SUPPORT
   ------------------------------------------------------------
   Included on every page (one line in the <head>). It:
   1. Switches on the offline helper (sw.js) so the site can be
      installed as an app and works offline for pages already seen.
   2. On iPhone/iPad, when opened from the Home Screen icon there
      is no browser Back button, so it adds a small one in the
      bottom-left corner. Nothing appears anywhere else.
   ============================================================ */
(function () {
  if ('serviceWorker' in navigator && window.top === window.self) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function () {});
    });
  }

  var iosApp = window.navigator.standalone === true;
  if (!iosApp) return;

  function addBack() {
    var atHome = location.pathname === '/' || location.pathname === '/index.html';
    if (atHome && history.length <= 1) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Back');
    b.textContent = '←';
    b.style.cssText = [
      'position:fixed', 'left:12px',
      'bottom:calc(12px + env(safe-area-inset-bottom))',
      'z-index:2147483000', 'width:40px', 'height:40px',
      'border-radius:50%', 'border:1px solid rgba(255,255,255,.25)',
      'background:rgba(7,11,22,.72)', 'color:#fff', 'font:600 20px/1 system-ui,sans-serif',
      'backdrop-filter:blur(6px)', '-webkit-backdrop-filter:blur(6px)',
      'box-shadow:0 2px 10px rgba(0,0,0,.35)', 'cursor:pointer', 'opacity:.85'
    ].join(';');
    b.addEventListener('click', function () {
      if (history.length > 1) history.back();
      else location.href = '/';
    });
    document.body.appendChild(b);
  }
  if (document.body) addBack();
  else document.addEventListener('DOMContentLoaded', addBack);
})();
