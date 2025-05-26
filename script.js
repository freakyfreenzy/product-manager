document.getElementById('add-product-btn').addEventListener('click', () => {
  document.getElementById('product-modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('product-modal').classList.add('hidden');
});

document.getElementById('add-image-url').addEventListener('click', () => {
  const container = document.getElementById('image-url-container');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.name = 'image-url[]';
  newInput.className = 'image-url-input';
  newInput.placeholder = 'Enter image URL';
  container.appendChild(newInput);
});
