/**
 * CHAITHANYA NEELAM PORTFOLIO — INTERACTIVE ENGINE
 * Powered by Vanilla JS + Lucide Icons
 */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ==========================================
  // 1. TYPEWRITER EFFECT
  // ==========================================
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      'Full-Stack Developer',
      'SaaS Founder',
      'TypeScript & React Specialist',
      'Backend Systems Engineer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }


  // ==========================================
  // 2. HERO ANIMATED INTERACTIVE CANVAS
  // ==========================================
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 30), 40);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4f46e5';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(79, 70, 229, ${0.25 * (1 - mdist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
  }


  // ==========================================
  // 3. STICKY NAVBAR & ACTIVE SCROLL SPY
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });


  // ==========================================
  // 4. MOBILE MENU DRAWER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }


  // ==========================================
  // 5. THEME TOGGLE (LIGHT / DARK)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');

  function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    if (newTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    } else {
      document.body.removeAttribute('data-theme');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
    }
    localStorage.setItem('theme', newTheme);
    if (window.lucide) lucide.createIcons();
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    if (window.lucide) lucide.createIcons();
  }


  // ==========================================
  // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  // ==========================================
  // 7. SPOTLIGHT CARD MOUSE TRACKING
  // ==========================================
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  // ==========================================
  // 8. MAGNETIC BUTTON EFFECT
  // ==========================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });


  // ==========================================
  // 9. SKILLS CATEGORY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // ==========================================
  // 10. PROJECT DETAILS MODAL
  // ==========================================
  const projectData = {
    '1': {
      title: 'StudBridge — Multi-Tenant SaaS Education Platform',
      category: 'Full-Stack SaaS Platform (Mar 2026 – Apr 2026)',
      description: 'Single-handedly architected and shipped a multi-tenant SaaS application tailored for educational institutions. Designed with high security standards, granular permission roles (RBAC), and automated video/storage workflows.',
      highlights: [
        'Multi-tenant database isolation allowing partner schools to operate independently.',
        'Role-Based Access Control (RBAC) for Admins, Teachers, and Students.',
        'Automated Google Workspace API "Media Bridge" synchronizing Google Meet & Drive storage.',
        'High-concurrency games serving engine running 300+ curriculum modules.'
      ],
      tech: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'RBAC Security', 'Google APIs', 'Vercel'],
      github: 'https://github.com/chaithanyaneelam/Nexus-Platform'
    },
    '2': {
      title: 'Retail Core Services — E-Commerce Microservices Backend',
      category: 'Full-Stack Backend & Spatial Data (Feb 2026 – Mar 2026)',
      description: 'Engineered an enterprise-grade, location-aware e-commerce backend architecture using TypeScript and Node.js on a strict Controller-Service-Repository pattern.',
      highlights: [
        'Spatial Delivery Routing utilizing PostgreSQL + PostGIS extension for geospatial routing.',
        'Strict Controller-Service-Repository architecture ensuring decoupling.',
        'Argon2 password hashing, JWT session rotation, and Zod runtime schema validation.',
        'Scalable RESTful endpoints for vendor catalog management and real-time order processing.'
      ],
      tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'PostGIS', 'Zod Validation', 'Argon2 Hashing', 'JWT Auth', 'REST APIs'],
      github: 'https://github.com/chaithanyaneelam/retail-core-service'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-description');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTech = document.getElementById('modal-tech');
  const modalGithubLink = document.getElementById('modal-github-link');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtns = [document.getElementById('close-modal'), document.getElementById('modal-close-btn')];

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.textContent = data.description;
        modalGithubLink.setAttribute('href', data.github);

        modalHighlights.innerHTML = data.highlights
          .map((h) => `<li><i data-lucide="check" class="accent-icon"></i><span>${h}</span></li>`)
          .join('');

        modalTech.innerHTML = data.tech
          .map((t) => `<span class="tag-accent">${t}</span>`)
          .join('');

        if (window.lucide) lucide.createIcons();

        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      });
    }
  });

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }


  // ==========================================
  // 11. RESUME MODAL & PRINT HANDLER
  // ==========================================
  const resumeBtn = document.getElementById('resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeModalBtns = [document.getElementById('close-resume-modal'), document.getElementById('close-resume-btn')];
  const downloadPrintBtn = document.getElementById('download-print-resume');

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    closeResumeModalBtns.forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', () => {
          resumeModal.classList.add('hidden');
          document.body.style.overflow = 'auto';
        });
      }
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });

    if (downloadPrintBtn) {
      downloadPrintBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }


  // ==========================================
  // 12. COPY TO CLIPBOARD & TOAST SYSTEM
  // ==========================================
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function showToast(message) {
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.remove('hidden');

      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    }
  }

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast('Failed to copy');
        });
      }
    });
  });


  // ==========================================
  // 13. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        if (window.lucide) lucide.createIcons();
        showToast('Message sent successfully! Chaithanya will get back to you soon.');
      }, 1000);
    });
  }

});
