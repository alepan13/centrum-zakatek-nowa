/* ===================== Mikro-interakcje i ruch =====================
   - scroll-reveal sekcji (oparty o scroll/rAF — działa wszędzie)
   - rysowanie „nici z liścia" (stroke-dashoffset)
   - delikatny parallax mesha
   Respektuje prefers-reduced-motion. Bezpieczne: nic nie zostaje ukryte.
-------------------------------------------------------------------*/
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function run(){
    const sel = ['.section-head', '.prob-grid', '.steps-grid', '.values-grid',
                 '.team-group', '.price-grid', '.faq', '.cta-band', '.trust-inner'];
    const reveals = [];
    sel.forEach(s => document.querySelectorAll(s).forEach(el => { el.classList.add('reveal'); reveals.push(el); }));
    const threads = [...document.querySelectorAll('.leaf-thread')];

    // przygotuj rysowanie nici
    threads.forEach(svg => {
      const vine = svg.querySelector('.lt-vine');
      if (!vine) return;
      try { const len = vine.getTotalLength(); vine.style.strokeDasharray = len; vine.style.strokeDashoffset = len; } catch(e){}
    });

    if (reduce) {
      reveals.forEach(el => el.classList.add('in'));
      threads.forEach(svg => svg.classList.add('draw'));
      return;
    }

    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const inView = (el, frac) => {
      const r = el.getBoundingClientRect();
      return r.top < vh() * (frac || 0.9) && r.bottom > 0;
    };

    const blobs = [...document.querySelectorAll('.bg-canvas .blob')];

    function check(){
      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        if (inView(el)) { el.classList.add('in'); reveals.splice(i, 1); }
      }
      threads.forEach(svg => { if (!svg.classList.contains('draw') && inView(svg, 0.78)) svg.classList.add('draw'); });
      if (blobs.length) {
        const y = window.scrollY;
        blobs.forEach((b, i) => {
          const f = (i % 2 === 0 ? 1 : -1) * (0.02 + i * 0.006);
          b.style.translate = '0 ' + (y * f).toFixed(1) + 'px';
        });
      }
    }

    let ticking = false;
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { check(); ticking = false; }); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // wstępne wywołania (łapie elementy nad zgięciem po layoutcie)
    check();
    requestAnimationFrame(check);
    setTimeout(check, 250);

    // zabezpieczenie: po 2,5 s odsłoń wszystko, co jeszcze ukryte (gdyby coś poszło nie tak)
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
      threads.forEach(svg => svg.classList.add('draw'));
    }, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
