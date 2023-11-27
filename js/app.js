let productos = [];

fetch("/js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

let toogle = document.getElementById("toogle");
toogle.addEventListener("click", (event) => {
  let checked = event.target.checked;
  localStorage.setItem("dark-mode", checked);
  darkMode();
});

const darkMode = function () {
  const state = document.body.classList.value;

  if (state === "dark-mode") {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
};
darkMode();

const numerito = function () {
  const carro = document.getElementById("numerito");
  carro.textContent = JSON.parse(localStorage.getItem("carrito"))?.length;
};
const button2 = document.getElementById("agregar2");
button2.addEventListener("click", (e) => {
  agregar(14);
});
const button = document.getElementById("agregar1");
button.addEventListener("click", (e) => {
  agregar(12);
});
const agregar = function (ref) {
  const prev = [];
  if (localStorage.getItem("carrito")) {
    const prev2 = JSON.parse(localStorage.getItem("carrito"));
    prev2.map((producto) => {
      prev.push(producto);
    });
  }

  prev.push(productos[ref]);
  localStorage.setItem("carrito", JSON.stringify(prev));

  numerito();
};

numerito();
