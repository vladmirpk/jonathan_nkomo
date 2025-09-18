// scripts.js — optimized for performance: small, dependency-free
document.addEventListener('DOMContentLoaded', function(){
  // Performance optimization: Use requestAnimationFrame for animations
  const raf = window.requestAnimationFrame || window.setTimeout;
  // set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // NAV TOGGLE for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const primaryMenu = document.getElementById('primary-menu');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if(primaryMenu){
        primaryMenu.hidden = expanded;
      }
    });
  }

  // HERO CAROUSEL (enhanced with indicators and controls)
  (function(){
    const carousel = document.getElementById('heroCarousel');
    if(!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    
    let currentSlide = 0;
    let timer = null;
    const interval = 5000;

    function showSlide(index) {
      // Remove active class from all slides and indicators
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Add active class to current slide and indicator
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function startAutoplay() {
      if(!timer) {
        timer = setInterval(nextSlide, interval);
      }
    }

    function stopAutoplay() {
      if(timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Event listeners
    if(nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        stopAutoplay();
        startAutoplay();
      });
    });

    // Pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // Initialize
    showSlide(0);
    startAutoplay();
  })();

  // TESTIMONIALS CAROUSEL
  (function(){
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if(!testimonialsCarousel) return;
    
    const testimonialCards = testimonialsCarousel.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    let currentTestimonial = 0;
    let timer = null;
    const interval = 6000;

    function showTestimonial(index) {
      testimonialCards.forEach(card => card.classList.remove('active'));
      testimonialCards[index].classList.add('active');
      currentTestimonial = index;
    }

    function nextTestimonial() {
      const next = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(next);
    }

    function prevTestimonial() {
      const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(prev);
    }

    function startAutoplay() {
      if(!timer) {
        timer = setInterval(nextTestimonial, interval);
      }
    }

    function stopAutoplay() {
      if(timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Event listeners
    if(nextBtn) nextBtn.addEventListener('click', () => {
      nextTestimonial();
      stopAutoplay();
      startAutoplay();
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
      prevTestimonial();
      stopAutoplay();
      startAutoplay();
    });

    // Pause on hover
    testimonialsCarousel.addEventListener('mouseenter', stopAutoplay);
    testimonialsCarousel.addEventListener('mouseleave', startAutoplay);

    // Initialize
    showTestimonial(0);
    startAutoplay();
  })();

  // FILTERS for projects
  (function(){
    const filters = document.querySelectorAll('.filter');
    const cases = document.querySelectorAll('.case');
    if(!filters.length || !cases.length) return;
    filters.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        filters.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        cases.forEach(c=>{
          if(f==='*'){ c.style.display=''; return; }
          if(c.classList.contains(f)) c.style.display=''; else c.style.display='none';
        });
      });
    });
  })();

  // CASE STUDY MODAL
  (function(){
    const modal = document.getElementById('caseModal');
    const modalInner = document.getElementById('caseInner');
    const closeBtn = modal.querySelector('.modal-close');
    const caseLinks = document.querySelectorAll('.case-link');

    const CASES = {
      'case-odoo-zingsa': {
        title: 'Odoo ERP: Public Sector Modernization',
        summary: 'Modernized procurement and asset workflows for a government agency using Odoo custom modules.',
        challenge: 'Paper-based procurement, no central asset register and slow reporting.',
        solution: 'Built custom Odoo modules for procurement, assets and reporting; integrated document management and role-based approvals.',
        tech: ['Odoo','Python','Postgres','Docker','Nginx'],
        images: ['images/odoo_main.jpg','images/odoo_epr.png','images/odoo_fuel.png']
      },
      'case-zingsa-web': {
        title: 'ZINGSA Website & Public Portal',
        summary: 'Responsive public portal and CMS tailored for public notices and stakeholder engagement.',
        challenge: 'Outdated site; poor mobile experience; limited CMS features.',
        solution: 'Redesigned responsive theme, structured CMS for notices, events and publications with accessibility improvements.',
        tech: ['HTML5','CSS3','JS','Django CMS'],
        images: ['images/zingsa_web.png','images/zingsa_web1.png','images/zingsa_web3.png']
      },
      'case-wana-trading': {
        title: 'Wana Trading Platform',
        summary: 'Comprehensive trading platform with real-time data and transaction management.',
        challenge: 'Need for a robust trading platform with real-time market data, secure transactions, and comprehensive portfolio management.',
        solution: 'Developed a full-featured trading platform with real-time market feeds, secure payment processing, portfolio tracking, and advanced analytics.',
        tech: ['React','Node.js','WebSocket','PostgreSQL','Stripe API'],
        images: ['images/wana_1.png','images/wana_2.png','images/wana_3.png']
      },
      'case-helpdesk-support': {
        title: 'Helpdesk Support System',
        summary: 'Advanced ticketing system with analytics and automated workflow management.',
        challenge: 'Fragmented support processes, slow response times, and lack of analytics for support performance.',
        solution: 'Implemented comprehensive helpdesk system with automated ticket routing, SLA tracking, knowledge base integration, and detailed analytics dashboard.',
        tech: ['osTicket','PHP','MySQL','JavaScript','Analytics API'],
        images: ['images/osticket_1.png','images/osticket_2.png','images/wana_3.png']
      },
      'case-greatzim': {
        title: 'Great Zim — Marketing Campaign',
        summary: 'Landing page and conversion funnel for a national campaign.',
        challenge: 'High bounce and low conversions.',
        solution: 'A/B tested landing pages, performance tuning and tracked funnels for continuous improvement.',
        tech: ['HTML','CSS','Analytics','SEO'],
        images: ['images/great_zim.png','images/great_zim_1.png','images/great_zim_3.png']
      },
      'case-isadora': {
        title: 'Isadora — Ecommerce',
        summary: 'Modern commerce site with optimized product flow and fast checkout.',
        challenge: 'Slow product pages and poor conversion.',
        solution: 'Optimized images, simplified checkout and integrated payment gateway.',
        tech: ['React','Stripe','Node'],
        images: ['images/isadora.png','images/isadora_1.png','images/isadora_2.png']
      },
      'case-school': {
        title: 'School Portal & CMS',
        summary: 'Dynamic school portal for events, enrollment, and parent communications.',
        challenge: 'Manual enrollment and poor parent communication.',
        solution: 'Built CMS-driven portal with online enrollment, event calendar and newsletters.',
        tech: ['Django','HTML','CSS'],
        images: ['images/school_web_example.jpg','images/school_web_template.jpg','images/school1.jpg']
      },
      'case-law-firm': {
        title: 'Law Firm Website & Client Portal',
        summary: 'Professional law firm website with secure client portal and case management integration.',
        challenge: 'Outdated website, no client portal, manual case tracking, and poor SEO visibility.',
        solution: 'Developed modern responsive website with secure client portal, case management system, and comprehensive SEO optimization.',
        tech: ['React','Node.js','PostgreSQL','Stripe','SSL'],
        images: ['images/law_firm_web_example.jpg','images/law_firm1.jpg','images/law1.jpg']
      },
      'case-mobile-app': {
        title: 'Cross-Platform Mobile App',
        summary: 'React Native mobile application with offline capabilities and real-time synchronization.',
        challenge: 'Need for cross-platform mobile solution with offline functionality and real-time updates.',
        solution: 'Built React Native app with offline data storage, push notifications, and real-time sync capabilities.',
        tech: ['React Native','Firebase','Redux','AsyncStorage','Push Notifications'],
        images: ['images/mobile_app.jpg','images/mobile_app2.jpg','images/mobile_app3.jpg']
      },
      'case-automation': {
        title: 'Business Process Automation',
        summary: 'Automated document processing and workflow optimization using Python and AI integration.',
        challenge: 'Manual document processing, repetitive tasks, and inefficient workflows consuming significant time.',
        solution: 'Implemented Python-based automation system with AI document processing, workflow optimization, and automated reporting.',
        tech: ['Python','OpenAI API','Selenium','Pandas','FastAPI'],
        images: ['images/python_ai.jpg','images/python_scripting.jpg','images/automation.jpg']
      },
      'case-industry': {
        title: 'Mining Industry Portal',
        summary: 'Comprehensive industry portal with equipment tracking, safety protocols, and compliance reporting.',
        challenge: 'Complex equipment tracking, safety compliance requirements, and fragmented reporting systems.',
        solution: 'Developed integrated portal with real-time equipment monitoring, automated safety compliance tracking, and comprehensive reporting dashboard.',
        tech: ['Django','PostgreSQL','Chart.js','IoT Integration','Compliance APIs'],
        images: ['images/mining.jpg','images/logistics.jpg','images/industry.jpg']
      }
    };

    function openCase(id){
      const data = CASES[id];
      if(!data) return;
      modalInner.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Elevator summary:</strong> ${data.summary}</p>
        <h3>The challenge</h3><p>${data.challenge}</p>
        <h3>The solution</h3><p>${data.solution}</p>
        <h3>Tech stack</h3><p>${data.tech.join(' • ')}</p>
        <div class="case-images">${data.images.map(src=>`<img src="${src}" alt="case image" loading="lazy" style="max-width:100%;margin-top:.6rem;border-radius:8px">`).join('')}</div>
        <p style="margin-top:.6rem"><a class='btn btn-cta' href='#contact'>Request a similar solution</a></p>
      `;
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      // focus trap (simple)
      closeBtn.focus();
    }

    caseLinks.forEach(link=>{
      link.addEventListener('click', function(e){
        e.preventDefault();
        const id = this.dataset.case;
        openCase(id);
      });
    });

    function closeModal(){
      modal.setAttribute('aria-hidden','true');
      modalInner.textContent = '';
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if(e.target===modal) closeModal(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal(); });
  })();

  // CONTACT form: enhanced validation + submission handling
  (function(){
    const form = document.getElementById('contactForm');
    if(!form) return;
    
    // Add loading state styling
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value;
      const message = form.message.value.trim();
      
      // Clear previous errors
      clearFormErrors();
      
      // Validation
      let hasErrors = false;
      
      if(!name){
        showFieldError('name', 'Name is required');
        hasErrors = true;
      }
      
      if(!email){
        showFieldError('email', 'Email is required');
        hasErrors = true;
      } else if(!/\S+@\S+\.\S+/.test(email)){
        showFieldError('email', 'Please provide a valid email address');
        hasErrors = true;
      }
      
      if(!subject){
        showFieldError('subject', 'Please select a project type');
        hasErrors = true;
      }
      
      if(!message){
        showFieldError('message', 'Project details are required');
        hasErrors = true;
      } else if(message.length < 20){
        showFieldError('message', 'Please provide more details about your project (at least 20 characters)');
        hasErrors = true;
      }
      
      if(hasErrors) return;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        // Simulate API call (replace with actual endpoint)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, subject, message })
        });
        
        if(response.ok){
          showSuccessMessage('Thank you! Your message has been sent successfully.');
          form.reset();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        // Fallback for demo purposes
        showSuccessMessage('Thank you! Your message has been prepared. In production, this would be sent to the server.');
      form.reset();
      } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
    
    function showFieldError(fieldName, message){
      const field = form.querySelector(`#${fieldName}`);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.style.color = '#ff6b6b';
      errorDiv.style.fontSize = '0.9rem';
      errorDiv.style.marginTop = '0.25rem';
      
      field.parentNode.appendChild(errorDiv);
      field.style.borderColor = '#ff6b6b';
    }
    
    function clearFormErrors(){
      const errors = form.querySelectorAll('.field-error');
      errors.forEach(error => error.remove());
      
      const fields = form.querySelectorAll('input, textarea, select');
      fields.forEach(field => {
        field.style.borderColor = '';
      });
    }
    
    function showSuccessMessage(message){
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.textContent = message;
      successDiv.style.background = 'rgba(0,255,209,0.1)';
      successDiv.style.border = '1px solid var(--accent)';
      successDiv.style.borderRadius = '8px';
      successDiv.style.padding = '1rem';
      successDiv.style.marginTop = '1rem';
      successDiv.style.color = 'var(--accent)';
      
      form.parentNode.insertBefore(successDiv, form.nextSibling);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        if(successDiv.parentNode){
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 5000);
    }
  })();

  // Intersection Observer for animated skill fills and lazy enhancements (optimized)
  (function(){
    const skillBars = document.querySelectorAll('.skill-bar');
    if('IntersectionObserver' in window && skillBars.length){
      const io = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            const bar = entry.target;
            const v = bar.dataset.value || bar.getAttribute('data-value') || bar.querySelector('.skill-fill').style.width || '0';
            const fill = bar.querySelector('.skill-fill');
            if(fill){ 
              raf(() => {
                fill.style.width = v + '%';
              });
            }
            io.unobserve(bar);
          }
        });
      }, {threshold:0.25, rootMargin: '50px'});
      skillBars.forEach(b=>io.observe(b));
    }
  })();

  // Lazy-loading progressive enhancement: optimized for performance
  (function(){
    if('IntersectionObserver' in window){
      const imgs = document.querySelectorAll('img[loading="lazy"]');
      const io = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            const img = entry.target;
            // Add loaded class for potential styling
            img.classList.add('loaded');
            // Preload next images for better UX
            const nextImg = img.nextElementSibling;
            if(nextImg && nextImg.tagName === 'IMG'){
              nextImg.loading = 'eager';
            }
            io.unobserve(img);
          }
        });
      }, {rootMargin:'100px'});
      imgs.forEach(i=>io.observe(i));
    }
  })();

  // Initialize Gallery System
  initGallerySystem();

});

// Image Gallery System
const GALLERY_IMAGES = {
  'ERP_1.png': {
    title: 'ERP System Dashboard',
    description: 'Enterprise Resource Planning system with comprehensive business process management and real-time analytics.',
    technologies: ['Odoo', 'Python', 'PostgreSQL', 'ERP', 'Business Process']
  },
  'odoo_main.jpg': {
    title: 'Odoo Main Interface',
    description: 'Main Odoo ERP interface with comprehensive business management tools and workflow automation.',
    technologies: ['Odoo', 'ERP', 'Workflow', 'Business Management', 'Automation']
  },
  'odoo_epr.png': {
    title: 'Odoo ERP System',
    description: 'Comprehensive Odoo ERP implementation with custom modules and business process automation.',
    technologies: ['Odoo', 'ERP', 'Python', 'Business Process', 'Automation']
  },
  'odoo_home.png': {
    title: 'Odoo Home Dashboard',
    description: 'Odoo ERP home dashboard with personalized widgets and business intelligence insights.',
    technologies: ['Odoo', 'Dashboard', 'Business Intelligence', 'Widgets', 'Personalization']
  },
  'odoo_plm.png': {
    title: 'Odoo PLM System',
    description: 'Product Lifecycle Management system integrated with Odoo for manufacturing and product development.',
    technologies: ['Odoo', 'PLM', 'Manufacturing', 'Product Development', 'Lifecycle']
  },
  'odoo_drone.png': {
    title: 'Odoo Drone Management',
    description: 'Drone fleet management system integrated with Odoo ERP for aerial operations and data collection.',
    technologies: ['Odoo', 'Drone Management', 'IoT', 'Data Collection', 'Fleet Management']
  },
  'odoo_fuel.png': {
    title: 'Odoo Fuel Management',
    description: 'Fuel management system integrated with Odoo for fleet operations and cost tracking.',
    technologies: ['Odoo', 'Fuel Management', 'Fleet', 'Cost Tracking', 'Operations']
  },
  'school_web_example.jpg': {
    title: 'School Web Platform',
    description: 'Comprehensive school management platform with student portals, parent communication, and academic tracking.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Education', 'Student Management']
  },
  'school_web_template.jpg': {
    title: 'School Website Template',
    description: 'Professional school website template with modern design and educational content management.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Education', 'Content Management']
  },
  'school1.jpg': {
    title: 'School Management System',
    description: 'Complete school management system with attendance tracking, grade management, and communication tools.',
    technologies: ['Vue.js', 'Django', 'PostgreSQL', 'School Management', 'Attendance']
  },
  'school2.jpg': {
    title: 'Educational Portal',
    description: 'Educational portal with learning management, course delivery, and student assessment tools.',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Learning Management', 'Assessment']
  },
  'isadora_1.png': {
    title: 'Isadora Agricultural Supplies',
    description: 'Agricultural supplies business platform specializing in pesticides, fertilizers, and farming equipment sales.',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'E-commerce', 'Agricultural Supplies']
  },
  'isadora_2.png': {
    title: 'Isadora Product Catalog',
    description: 'Comprehensive product catalog for pesticides and fertilizers with detailed specifications and pricing.',
    technologies: ['React', 'D3.js', 'Product Management', 'Catalog', 'Agricultural Products']
  },
  'isadora.png': {
    title: 'Isadora Business Platform',
    description: 'Complete agricultural supplies business platform with inventory management, sales tracking, and customer management.',
    technologies: ['Angular', 'Django', 'PostgreSQL', 'Agricultural Business', 'Inventory Management']
  },
  'wana_1.png': {
    title: 'Wana Trading Shop',
    description: 'Accessories shop and printing services platform with inventory management and order processing.',
    technologies: ['React', 'Node.js', 'E-commerce', 'Printing Services', 'Accessories Shop']
  },
  'wana_2.png': {
    title: 'Wana Printing Services',
    description: 'Professional printing services management system with order tracking and customer management.',
    technologies: ['Vue.js', 'D3.js', 'Printing Management', 'Order Tracking', 'Customer Service']
  },
  'wana_3.png': {
    title: 'Wana Mobile App',
    description: 'Mobile application for Wana Trading shop with product browsing and printing service requests.',
    technologies: ['React Native', 'Mobile', 'E-commerce', 'Printing Services', 'Product Catalog']
  },
  'wana4.png': {
    title: 'Wana Platform Interface',
    description: 'Complete Wana Trading platform interface with shop management, printing services, and customer portal.',
    technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Trading Platform', 'Printing Services']
  },
  'zingsa_web.png': {
    title: 'ZINGSA Web Platform',
    description: 'Zimbabwe National Geospatial and Space Agency web platform with geospatial data visualization.',
    technologies: ['React', 'Node.js', 'Geospatial', 'Data Visualization', 'Space Agency']
  },
  'zingsa_web1.png': {
    title: 'ZINGSA Data Dashboard',
    description: 'Geospatial data dashboard with interactive maps and space agency information management.',
    technologies: ['Vue.js', 'Mapbox', 'Geospatial', 'Dashboard', 'Space Data']
  },
  'zingsa_web3.png': {
    title: 'ZINGSA Analytics',
    description: 'Space agency analytics platform with satellite data processing and geospatial insights.',
    technologies: ['Angular', 'Python', 'Satellite Data', 'Analytics', 'Geospatial Insights']
  },
  'great_zim_1.png': {
    title: 'Great Zimbabwe Platform',
    description: 'Cultural heritage platform showcasing Great Zimbabwe with interactive tours and educational content.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Cultural Heritage', 'Interactive Tours']
  },
  'great_zim_3.png': {
    title: 'Great Zimbabwe Virtual Tour',
    description: 'Virtual reality tour of Great Zimbabwe with 360-degree views and immersive cultural experiences.',
    technologies: ['WebGL', 'Three.js', 'VR', '360° Views', 'Immersive Experience']
  },
  'great_zim.png': {
    title: 'Great Zimbabwe Heritage Site',
    description: 'Digital preservation platform for Great Zimbabwe with historical documentation and educational resources.',
    technologies: ['React', 'Node.js', 'Documentation', 'Heritage', 'Education']
  },
  'law_ai.jpg': {
    title: 'Legal AI System',
    description: 'Artificial Intelligence-powered legal research and document analysis system for law firms.',
    technologies: ['AI', 'Machine Learning', 'Legal Tech', 'Document Analysis', 'Research']
  },
  'law_firm_web_example.jpg': {
    title: 'Law Firm Website',
    description: 'Professional law firm website with case management, client portal, and legal resource library.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Legal', 'Client Portal']
  },
  'law_firm1.jpg': {
    title: 'Law Firm Platform',
    description: 'Comprehensive law firm management platform with case tracking, billing, and client communication tools.',
    technologies: ['Vue.js', 'Django', 'MySQL', 'Case Management', 'Billing']
  },
  'law1.jpg': {
    title: 'Legal Practice Management',
    description: 'Complete legal practice management system with document automation and client relationship management.',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Practice Management', 'Automation']
  },
  'osticket_1.png': {
    title: 'Helpdesk Support System',
    description: 'Advanced helpdesk and ticketing system with automated routing and customer support management.',
    technologies: ['osTicket', 'PHP', 'MySQL', 'Helpdesk', 'Customer Support']
  },
  'osticket_2.png': {
    title: 'Support Ticket Management',
    description: 'Comprehensive support ticket management system with SLA tracking and performance analytics.',
    technologies: ['osTicket', 'SLA', 'Analytics', 'Ticket Management', 'Performance']
  },
  'wonder_.png': {
    title: 'Wonder Platform',
    description: 'Innovative platform with creative solutions and user-centric design for modern applications.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Innovation', 'User Experience']
  }
};

let currentImageIndex = 0;
let galleryImages = [];

// Initialize Gallery System
function initGallerySystem() {
  galleryImages = Object.keys(GALLERY_IMAGES);
  
  const openGalleryBtn = document.getElementById('open-gallery');
  console.log('Gallery button found:', openGalleryBtn); // Debug log
  if (openGalleryBtn) {
    openGalleryBtn.addEventListener('click', openGallery);
    console.log('Gallery button event listener added'); // Debug log
  }
  
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  
  const galleryModal = document.getElementById('image-gallery-modal');
  const closeBtn = galleryModal?.querySelector('.modal-close');
  
  if (closeBtn) closeBtn.addEventListener('click', closeGallery);
  
  if (galleryModal) {
    galleryModal.addEventListener('click', function(e) {
      if (e.target === galleryModal) {
        closeGallery();
      }
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (galleryModal && galleryModal.style.display === 'flex') {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });
}

function createThumbnails() {
  const container = document.getElementById('gallery-thumbnails-container');
  container.innerHTML = '';
  
  galleryImages.forEach((imageName, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = `images/${imageName}`;
    img.alt = GALLERY_IMAGES[imageName].title;
    img.loading = 'lazy';
    
    thumbnail.appendChild(img);
    thumbnail.addEventListener('click', () => showImage(index));
    container.appendChild(thumbnail);
  });
}

function showImage(index) {
  currentImageIndex = index;
  const imageName = galleryImages[index];
  const imageData = GALLERY_IMAGES[imageName];
  
  const mainImage = document.getElementById('gallery-main-image');
  mainImage.src = `images/${imageName}`;
  mainImage.alt = imageData.title;
  
  document.getElementById('gallery-image-title').textContent = imageData.title;
  document.getElementById('gallery-image-description').textContent = imageData.description;
  
  const techContainer = document.getElementById('gallery-tech-tags');
  techContainer.innerHTML = '';
  imageData.technologies.forEach(tech => {
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.textContent = tech;
    techContainer.appendChild(tag);
  });
  
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentImageIndex);
}

function openGallery() {
  console.log('Opening gallery...'); // Debug log
  const modal = document.getElementById('image-gallery-modal');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  createThumbnails();
  showImage(0);
}

function closeGallery() {
  const modal = document.getElementById('image-gallery-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
