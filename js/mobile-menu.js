(function() {
  var btn = document.querySelector('.hamburger-btn');
  var panel = document.querySelector('.mobile-nav-panel');
  var header = document.querySelector('.site-header');

  if (!btn || !panel) return;

  document.body.appendChild(panel);

  function reposition() {
    var r = header.getBoundingClientRect();
    panel.style.top = (r.bottom + window.scrollY) + 'px';
    panel.style.left = '0';
    panel.style.right = '0';
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var open = panel.classList.contains('open');
    if (!open) reposition();
    panel.classList.toggle('open', !open);
    btn.classList.toggle('open', !open);
    btn.setAttribute('aria-expanded', String(!open));
  });

  window.addEventListener('resize', function() {
    if (panel.classList.contains('open')) reposition();
  });

  window.addEventListener('scroll', function() {
    if (panel.classList.contains('open')) reposition();
  });

  panel.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      panel.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function(e) {
    if (!btn.contains(e.target) && !panel.contains(e.target)) {
      panel.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
