/**
 * ============================================================================
 * MOHIT KUMAR — PERSONAL DEVELOPER PORTFOLIO
 * Clean, Modular, Production-Quality Client Logic
 * Single Source of Truth: Verified Curriculum Vitae
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message) {
    const toast = document.getElementById('site-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================================================
  // 2. SCROLL SPY & STICKY NAV ACTIVE STATE
  // ==========================================================================
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function onScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================================================
  // 3. MOBILE MENU DRAWER
  // ==========================================================================
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    if (!menuBtn || !drawer) return;

    function toggleMenu() {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    }

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 4. RESUME MODAL & PRINT HANDLERS
  // ==========================================================================
  function initResumeModal() {
    const modal = document.getElementById('resume-modal');
    const openBtn = document.getElementById('btn-open-resume');
    const heroBtn = document.getElementById('hero-resume-trigger');
    const mobileBtn = document.getElementById('mobile-resume-btn');
    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('resume-modal-backdrop');
    const printBtn = document.getElementById('modal-print-btn');

    if (!modal) return;

    function openModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (heroBtn) heroBtn.addEventListener('click', openModal);
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.remove('open');
        openModal();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // 5. CLIPBOARD HELPERS (Email & Phone)
  // ==========================================================================
  function initCopyHelpers() {
    // Copy Email
    const copyEmailBox = document.getElementById('copy-email-box');
    if (copyEmailBox) {
      const copyBtn = copyEmailBox.querySelector('.c-copy-btn');
      function copyEmail(e) {
        e.preventDefault();
        const email = 'imohitkumarcse@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      }
      if (copyBtn) copyBtn.addEventListener('click', copyEmail);
    }

    // Copy Phone
    const copyPhoneBox = document.getElementById('copy-phone-box');
    if (copyPhoneBox) {
      const copyBtn = copyPhoneBox.querySelector('.c-copy-btn');
      function copyPhone(e) {
        e.preventDefault();
        const phone = '+919208341049';
        navigator.clipboard.writeText(phone).then(() => {
          showToast('Copied +91 92083 41049 to clipboard');
        }).catch(() => {
          showToast('Phone: +91 92083 41049');
        });
      }
      if (copyBtn) copyBtn.addEventListener('click', copyPhone);
    }
  }

  // ==========================================================================
  // 6. DIRECT EMAIL ACTION FORM
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('direct-email-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const body = document.getElementById('form-body').value.trim();

      if (!name || !subject || !body) {
        showToast('Please fill out all fields.');
        return;
      }

      const fullSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
      const fullBody = encodeURIComponent(`Hi Mohit,\n\n${body}\n\nBest regards,\n${name}`);

      // Open user's default email client addressed to Mohit
      const mailtoUrl = `mailto:imohitkumarcse@gmail.com?subject=${fullSubject}&body=${fullBody}`;
      window.location.href = mailtoUrl;

      showToast('Opening default email client...');
    });
  }

  // ==========================================================================
  // 7. INITIALIZE ON DOM CONTENT LOADED
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initMobileMenu();
    initResumeModal();
    initCopyHelpers();
    initContactForm();
  });

})();
