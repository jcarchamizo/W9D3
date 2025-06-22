const imagenes = [
    "https://source.unsplash.com/random/800x600?nature,1",
    "https://source.unsplash.com/random/800x600?nature,2",
    "https://source.unsplash.com/random/800x600?nature,3",
    "https://source.unsplash.com/random/800x600?nature,4",
    "https://source.unsplash.com/random/800x600?nature,5"
  ];

  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("dots-container");
  const pauseBtn = document.getElementById("pauseBtn");

  let indice = 0;
  let autoSlide = true;

  // Crear imágenes en el carrusel
  imagenes.forEach(src => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    const img = document.createElement("img");
    img.src = src;
    slide.appendChild(img);
    track.appendChild(slide);
  });

  // Crear dots
  imagenes.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      indice = i;
      actualizarCarrusel();
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function actualizarCarrusel() {
    track.style.transform = `translateX(-${indice * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[indice].classList.add("active");
  }

  document.getElementById("next").addEventListener("click", () => {
    indice = (indice + 1) % imagenes.length;
    actualizarCarrusel();
    resetInterval();
  });

  document.getElementById("prev").addEventListener("click", () => {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    actualizarCarrusel();
    resetInterval();
  });

  pauseBtn.addEventListener("click", () => {
    autoSlide = !autoSlide;
    pauseBtn.textContent = autoSlide ? "⏸️" : "▶️";
    resetInterval();
  });

  // Auto Slide
  let slideInterval = setInterval(() => {
    if (autoSlide) {
      indice = (indice + 1) % imagenes.length;
      actualizarCarrusel();
    }
  }, 4000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (autoSlide) {
        indice = (indice + 1) % imagenes.length;
        actualizarCarrusel();
      }
    }, 4000);
  }

  actualizarCarrusel();