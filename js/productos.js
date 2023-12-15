let productos = [];
let orden = "1";
const ordenSelect = document.getElementById("select");

fetch("/js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
    modelar(productos, orden);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const modelar = function (productos, orden) {
  const datacontainer = document.getElementById("contenedor-productos");
  datacontainer.innerHTML = "";
  productos.forEach((element) => {
    const producto = document.createElement("div");
    producto.classList.add("producto");

    const imagenElement = document.createElement("img");
    imagenElement.src = `${element.imagen}`;
    imagenElement.classList.add("producto-imagen");
    producto.appendChild(imagenElement);

    const details = document.createElement("div");
    details.classList.add("producto-detalles");
    producto.appendChild(details);

    const title = document.createElement("h3");
    title.textContent = element.titulo;
    title.classList.add("producto-titulo");
    details.appendChild(title);

    const p = document.createElement("p");
    p.textContent = element.precio;
    p.classList.add("producto-precio");
    details.appendChild(p);

    const button = document.createElement("button");
    button.textContent = "Agregar";
    button.classList.add("producto-agregar");

    button.addEventListener("click", () => {
      agregar(element);
    });
    details.appendChild(button);
    datacontainer.appendChild(producto);
  });
};

const botonHombre = document.getElementById("hombre");
botonHombre.addEventListener("click", () => {
  const productosV2 = productos.filter(
    (producto) => producto.categoria.id === "hombre"
  );
  modelar(productosV2, orden);
});

const botonMujer = document.getElementById("mujer");
botonMujer.addEventListener("click", () => {
  const productosV3 = productos.filter(
    (producto) => producto.categoria.id === "mujer"
  );
  modelar(productosV3, orden);
});

function ordenarPorTitulo(productos, orden) {
  const comparador = (a, b) => {
    const tituloA = a.titulo.toLowerCase();
    const tituloB = b.titulo.toLowerCase();
    return orden === "1"
      ? tituloA.localeCompare(tituloB)
      : tituloB.localeCompare(tituloA);
  };
  return productos.slice().sort(comparador);
}

ordenSelect.addEventListener("change", () => {
  orden = ordenSelect.value;
  const objetosOrdenados = ordenarPorTitulo(productos, orden);
  modelar(objetosOrdenados, orden);
});

const agregar = function (el) {
  const prev = JSON.parse(localStorage.getItem("carrito")) || [];
  prev.push(el);
  localStorage.setItem("carrito", JSON.stringify(prev));
  numerito1();
};

const numerito1 = function () {
  const carro = document.getElementById("numerito");
  carro.textContent = JSON.parse(localStorage.getItem("carrito")).length;
};
