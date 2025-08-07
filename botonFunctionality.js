// script.js

const button = document.getElementById('click-button');
const countDisplay = document.getElementById('click-count');

async function updateCount() {
  try {
    const response = await fetch('http://localhost:3000/increment', {
      method: 'POST',
    });
    const data = await response.json();
    countDisplay.textContent = `Contador: ${data.value}`;
  } catch (err) {
    countDisplay.textContent = 'Error al actualizar';
    console.error(err);
  }
}

button.addEventListener('click', updateCount);

// Llamar al cargar la página
updateCount();
