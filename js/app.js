let productosData = [];

const obtenerProductos = async () => {
  try {
    const response = await fetch("/js/productos.json");
    const data = await response.json();
    productosData = data.productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

const configurarModoOscuro = () => {
  const toogle = document.getElementById("toogle");

  const darkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  if (toogle) {
    toogle.addEventListener("click", () => {
      const checked = toogle.checked;
      localStorage.setItem("dark-mode", checked);
      darkMode();
    });

    darkMode();
  }
};

const actualizarContadorCarrito = () => {
  const carro = document.getElementById("numerito");
  if (carro) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carro.textContent = carrito.length;
  }
};

const agregarAlCarrito = (ref) => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productosData[ref]);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
};

const inicializarApp = async () => {
  await obtenerProductos();
  configurarModoOscuro();

  const button2 = document.getElementById("agregar2");
  if (button2) {
    button2.addEventListener("click", () => {
      agregarAlCarrito(14);
    });
  }

  const button = document.getElementById("agregar1");
  if (button) {
    button.addEventListener("click", () => {
      agregarAlCarrito(12);
    });
  }

  actualizarContadorCarrito();
};

document.addEventListener("DOMContentLoaded", inicializarApp);
