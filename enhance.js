/* ===================== Mikro-interakcje i ruch =====================
   - scroll-reveal sekcji (oparty o scroll/rAF — działa wszędzie)
   Respektuje prefers-reduced-motion. Bezpieczne: nic nie zostaje ukryte.
-------------------------------------------------------------------*/
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function run(){
    const sel = ['.section-head', '.svc', '.svc-note', '.team-group', '.price-grid',
                 '.priv', '.cta-band', '.trust-inner'];
    const reveals = [];
    sel.forEach(s => document.querySelectorAll(s).forEach(el => { el.classList.add('reveal'); reveals.push(el); }));

    if (reduce) {
      reveals.forEach(el => el.classList.add('in'));
      return;
    }

    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const inView = (el, frac) => {
      const r = el.getBoundingClientRect();
      return r.top < vh() * (frac || 0.9) && r.bottom > 0;
    };

    function check(){
      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        if (inView(el)) { el.classList.add('in'); reveals.splice(i, 1); }
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
    }, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
