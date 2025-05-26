// Open modal
document.getElementById('add-product-btn').addEventListener('click', () => {
  document.getElementById('product-modal').classList.remove('hidden');
});

// Close modal
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('product-modal').classList.add('hidden');
});

// Add more image fields
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
    document.getElementById('product-modal').classList.add('hidden');
  }
});
