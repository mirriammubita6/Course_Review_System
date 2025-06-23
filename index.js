  let slideIndex = 0;
        const slides = document.querySelectorAll('.slide');
      
        function showSlides() {
          slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === slideIndex) slide.classList.add('active');
          });
          slideIndex = (slideIndex + 1) % slides.length;
          setTimeout(showSlides, 4000); // change every 4 seconds
        }
      
        window.onload = showSlides;