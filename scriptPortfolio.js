document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('portfolio-grid');
    const buttons = document.querySelectorAll('.menu-link');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let portfolioData = {};
    let currentImages = []; 
    let currentIndex = 0;

   
    async function init() {
        try {
            const response = await fetch('get_portfolio.php');
            if (!response.ok) throw new Error('No network response');
            
            portfolioData = await response.json();
            
            renderGrid('all');
        } catch (error) {
            console.error("Error compiling:", error);
            grid.innerHTML = '<p style="color:white; text-align:center;">Грешка при зареждане на изображенията.</p>';
        }
    }

   
    function renderGrid(filter = 'all') {
        if (!grid) return;
        grid.innerHTML = '';

        for (const category in portfolioData) {
            if (filter === 'all' || filter === category) {
                portfolioData[category].forEach(num => {
                    const item = document.createElement('div');
                    item.className = `grid-item ${category}`;
                    
                    const imgPath = `mebeli/${category}/${category}${num}.png`;
                    const img = document.createElement('img');
                    img.src = imgPath;
                    img.alt = `${category} ${num}`;
                    img.loading = "lazy"; 

                    item.appendChild(img);
                    grid.appendChild(item);
                });
            }
        }
    }

   
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            renderGrid(filter);
        });
    });

   
    grid.addEventListener('click', (e) => {
        const item = e.target.closest('.grid-item');
        if (item) {
           currentImages = Array.from(grid.querySelectorAll('.grid-item img'));
            const clickedImg = item.querySelector('img');
            currentIndex = currentImages.findIndex(img => img.src === clickedImg.src);
            
            showImage(currentIndex);

            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
        }
    });

    function showImage(index) {
        if (currentImages[index]) {
            lightboxImg.src = currentImages[index].src;
        }
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 400); 
    }

    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    });

    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    });

    closeBtn?.addEventListener('click', closeLightbox);
    
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
    });

    init();
});