document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('overlay');

    // Open modal
    document.getElementById('add-product-btn').addEventListener('click', () => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Close modal
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Add more image fields dynamically
    document.getElementById('add-image-url').addEventListener('click', () => {
        const container = document.getElementById('image-url-container');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'image-url[]';
        input.placeholder = 'Enter image URL';
        input.className = 'image-url-input';
        container.appendChild(input);
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});
