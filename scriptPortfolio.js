document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('portfolio-grid');
    const buttons = document.querySelectorAll('.menu-link');

    const portfolioData = {
        kitchen: Array.from({length: 25}, (_, i) => i + 1),
        bedroom: Array.from({length: 11}, (_, i) => i + 1),
        livingroom: Array.from({length: 8}, (_, i) => i + 1),
        bathroom: Array.from({length: 4}, (_, i) => i + 1),
        establishment: Array.from({length: 15}, (_, i) => i + 1),
        cabinet: Array.from({length: 25}, (_, i) => i + 1),
        corridor: Array.from({length: 25}, (_, i) => i + 1),
    };

    function renderGrid(filter = 'all') {
        grid.innerHTML = '';

        for (const category in portfolioData) {
            if (filter === 'all' || filter === category) {
                portfolioData[category].forEach(num => {
                    const item = document.createElement('div');
                    item.className = `grid-item ${category}`;
                    
                    const imgPath = `mebeli/${category}/${category}${num}.png`;
                    
                    // Използваме <img> таг вместо backgroundImage за Masonry ефект
                    const img = document.createElement('img');
                    img.src = imgPath;
                    img.alt = category;
                    img.loading = "lazy"; // Оптимизация за бързо зареждане

                    item.appendChild(img);
                    grid.appendChild(item);
                });
            }
        }
    }

    renderGrid();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            renderGrid(filter);
        });
    });

    // LIGHTBOX ЛОГИКА
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentImages = []; 
    let currentIndex = 0;

    // Делегирано събитие за клик върху снимка
    grid.addEventListener('click', (e) => {
        const item = e.target.closest('.grid-item');
        if (item) {
            // Взимаме само видимите в момента елементи в грида
            currentImages = Array.from(grid.querySelectorAll('.grid-item'));
            currentIndex = currentImages.indexOf(item);
            
            showImage(currentIndex);

            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
        }
    });

    function showImage(index) {
        const imgElement = currentImages[index].querySelector('img');
        if (imgElement) {
            lightboxImg.src = imgElement.src;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 400); 
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
    });
});