document.addEventListener('DOMContentLoaded', function () {
    const portfolioContainer = document.getElementById('portfolioContainer');
    const portfolioTemplate = document.getElementById('portfolioTemplate').content;
    const portfolioItems = portfolioContainer.querySelectorAll('.portfolio-item');

    portfolioItems.forEach((item, index) => {
        const clone = document.importNode(portfolioTemplate, true);
        const projectData = {
            title: item.dataset.title,
            description: item.dataset.description,
            details: item.dataset.details,
            videoUrl: item.dataset.videoUrl,
            videoUrl2: item.dataset.videoUrl2,
            roleTech: item.dataset.roleTech,
            carouselId: item.dataset.carouselId,
            images: JSON.parse(item.dataset.images),
            type: item.dataset.type
        };

        clone.querySelector('.project-title').textContent = projectData.title;
        clone.querySelector('.project-description').textContent = projectData.description;
        clone.querySelector('.project-details').textContent = projectData.details;
        clone.querySelector('.project-role-tech').innerHTML = projectData.roleTech;

        const videoContainer = clone.querySelector('.project-video-container');
        videoContainer.innerHTML = `<iframe src="${projectData.videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        if (projectData.type === 'video') {
            const carousel = clone.querySelector('.project-carousel');
            carousel.innerHTML = `<div class="ratio ratio-16x9"><iframe src="${projectData.videoUrl2}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        } else {
            const carousel = clone.querySelector('.project-carousel');
            carousel.id = projectData.carouselId;
            carousel.querySelector('.carousel-control-prev').setAttribute('data-bs-target', `#${projectData.carouselId}`);
            carousel.querySelector('.carousel-control-next').setAttribute('data-bs-target', `#${projectData.carouselId}`);

            const carouselItems = carousel.querySelectorAll('.carousel-item');
            projectData.images.forEach((image, index) => {
                const img = carouselItems[index].querySelector('img');
                img.src = image;
                img.alt = `Image ${index + 1}`;
                img.setAttribute('data-bs-toggle', 'modal');
                img.setAttribute('data-bs-target', `#modal-${projectData.carouselId}`);
                img.onclick = () => showModalImage(image, `modal-image-${projectData.carouselId}`);
            });

            const modal = clone.querySelector('.modal');
            modal.id = `modal-${projectData.carouselId}`;
            modal.querySelector('img').id = `modal-image-${projectData.carouselId}`;
        }

        item.appendChild(clone);
    });

    const navLinks = document.querySelectorAll('.custom-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const navBar = document.querySelector('.navbar-collapse');
            if (navBar.classList.contains('show')) {
                new bootstrap.Collapse(navBar); // This will toggle the 'show' class, collapsing the navbar
            }
        });
    });
});

function showModalImage(imageUrl, modalImageId) {
    const modalImage = document.getElementById(modalImageId);
    modalImage.src = imageUrl;
}
