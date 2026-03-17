document.addEventListener('DOMContentLoaded', function () {

  const buttons = document.querySelectorAll('.tab-btn');

  // CLICK
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.dataset.target;
      const section = document.getElementById(id);

      if (!section) return;

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // SCROLL SPY con IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        buttons.forEach(b => b.classList.remove('active'));

        const activeBtn = document.querySelector(
          `.tab-btn[data-target="${entry.target.id}"]`
        );

        if (activeBtn) activeBtn.classList.add('active');
      }
    });
  }, {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

});
