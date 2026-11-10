/**
* Template Name: Nexa
* Template URL: https://bootstrapmade.com/nexa-bootstrap-agency-template/
* Updated: Aug 19 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sortBy = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sortBy
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });


  /**
   * Fox & Flesh application form
   */
  const applicationForm = document.querySelector('#creator-application');

  if (applicationForm) {
    const developmentInterest = applicationForm.querySelector('#interest-development');
    const productionInterest = applicationForm.querySelector('#interest-production');
    const developmentFields = applicationForm.querySelector('#development-fields');
    const productionFields = applicationForm.querySelector('#production-fields');
    const developmentExperience = applicationForm.querySelector('#development-experience');
    const productionExperience = applicationForm.querySelector('#production-experience');
    const ageConfirmation = applicationForm.querySelector('#production-age-confirmation');
    const opportunityError = applicationForm.querySelector('#opportunity-error');
    const applicationResult = applicationForm.querySelector('#application-result');
    const submitButton = applicationForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton?.querySelector('.submit-label');
    const accessKey = applicationForm.querySelector('input[name="access_key"]');

    function setPathwayVisibility() {
      const developmentSelected = developmentInterest?.checked ?? false;
      const productionSelected = productionInterest?.checked ?? false;

      if (developmentFields) developmentFields.hidden = !developmentSelected;
      if (productionFields) productionFields.hidden = !productionSelected;

      if (developmentExperience) developmentExperience.required = developmentSelected;
      if (productionExperience) productionExperience.required = productionSelected;
      if (ageConfirmation) ageConfirmation.required = productionSelected;

      if (developmentSelected || productionSelected) {
        opportunityError.textContent = '';
      }
    }

    function showApplicationResult(message, type) {
      if (!applicationResult) return;

      applicationResult.textContent = message;
      applicationResult.classList.remove('is-success', 'is-error', 'is-visible');
      applicationResult.classList.add(type === 'success' ? 'is-success' : 'is-error', 'is-visible');
    }

    function clearApplicationResult() {
      if (!applicationResult) return;

      applicationResult.textContent = '';
      applicationResult.classList.remove('is-success', 'is-error', 'is-visible');
    }

    developmentInterest?.addEventListener('change', setPathwayVisibility);
    productionInterest?.addEventListener('change', setPathwayVisibility);

    setPathwayVisibility();

    applicationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearApplicationResult();

      const developmentSelected = developmentInterest?.checked ?? false;
      const productionSelected = productionInterest?.checked ?? false;

      if (!developmentSelected && !productionSelected) {
        opportunityError.textContent = 'Select at least one opportunity type.';
        opportunityError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      setPathwayVisibility();

      if (!applicationForm.checkValidity()) {
        applicationForm.reportValidity();
        return;
      }

      if (!accessKey || !accessKey.value || accessKey.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        showApplicationResult('Applications are not live yet. Add the Web3Forms access key before publishing this form.', 'error');
        return;
      }

      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending...';

      try {
        const formData = new FormData(applicationForm);
        const response = await fetch(applicationForm.action, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to submit the application.');
        }

        showApplicationResult('Application received. We’ll review it and reach out if there’s a fit.', 'success');

        if (typeof gtag === 'function') {
          gtag('event', 'application_submit', {
            event_category: 'engagement',
            creator_development: developmentSelected,
            production_opportunities: productionSelected
          });
        }

        applicationForm.reset();
        setPathwayVisibility();

      } catch (error) {
        showApplicationResult('Something went wrong while sending the application. Please try again or contact us through Instagram.', 'error');
      } finally {
        if (submitButton) submitButton.disabled = false;
        if (submitLabel) submitLabel.textContent = 'Apply';
      }
    });
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();