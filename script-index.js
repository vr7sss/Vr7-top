document.addEventListener('DOMContentLoaded', function() {
  // Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  if (menuToggle && mobileMenu && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    menuOverlay.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Counter Animation
  const stats = document.querySelectorAll('.stat-number');
  const animateStats = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.innerText.replace(/,/g, '').replace(/\+/g, ''));
      const count = 0;
      const speed = 2000 / target;
      
      const updateCount = () => {
        const current = parseInt(stat.innerText.replace(/,/g, '').replace(/\+/g, '')) || 0;
        const increment = Math.ceil(target / 100);
        
        if (current < target) {
          stat.innerText = (current + increment).toLocaleString() + (stat.innerText.includes('+') ? '+' : '');
          setTimeout(updateCount, 20);
        } else {
          stat.innerText = target.toLocaleString() + (stat.innerText.includes('+') ? '+' : '');
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('hero-stats')) {
          animateStats();
        }
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.member-card, .hero-stats, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
  });

  // Floating Elements Animation
  const floatingElements = document.querySelectorAll('.floating-element');
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    floatingElements.forEach(el => {
      const speed = el.getAttribute('data-speed');
      const xOffset = (x - 0.5) * 50 * speed;
      const yOffset = (y - 0.5) * 50 * speed;
      el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  });
});
