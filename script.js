document.getElementById('add-product-btn').addEventListener('click', () => {
  document.getElementById('product-modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('product-modal').classList.add('hidden');
});

document.getElementById('add-image-url').addEventListener('click', () => {
  const container = document.getElementById('image-url-container');
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'image-url[]';
  input.placeholder = 'Enter image URL';
  input.className = 'image-url-input';
  container.appendChild(input);
});
