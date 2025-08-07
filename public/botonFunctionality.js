const button = document.getElementById('click-button');
const countDisplay = document.getElementById('click-count');

// Cargar el valor actual sin incrementarlo
async function getCurrentCount() {
  try {
    const response = await fetch('/count');
    const data = await response.json();
    countDisplay.textContent = `Contador: ${data.value}`;
  } catch (err) {
    countDisplay.textContent = 'Error al cargar';
    console.error(err);
  }
}

// Sumar 1 al contador
async function incrementCount() {
  try {
    const response = await fetch('/increment', {
      method: 'POST',
    });
    const data = await response.json();
    countDisplay.textContent = `Contador: ${data.value}`;
  } catch (err) {
    countDisplay.textContent = 'Error al actualizar';
    console.error(err);
  }
}

button.addEventListener('click', incrementCount);

// Al cargar la página, solo mostrar el valor actual
getCurrentCount();

