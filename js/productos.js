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
    button.setAttribute("id", "agregar");
    button.classList.add("producto-agregar");

    button.addEventListener("click", (e) => {
      agregar(element);
    });
    details.appendChild(button);
    datacontainer.appendChild(producto);
  });
};

const botonHombre = document.getElementById("hombre");
botonHombre.addEventListener("click", (e) => {
  let productosV2 = [];
  productos.filter((producto) => {
    if (producto.categoria.id === "hombre") {
      productosV2.push(producto);
    }
  });
  modelar(productosV2, orden);
});
const botonMujer = document.getElementById("mujer");
botonMujer.addEventListener("click", (e) => {
  let productosV3 = [];
  productos.filter((producto) => {
    if (producto.categoria.id === "mujer") {
      productosV3.push(producto);
    }
  });
  modelar(productosV3, orden);
});

function ordenarPorTitulo(productos, orden) {
  const comparador = (a, b) => {
    const tituloA = a.titulo.toLowerCase();
    const tituloB = b.titulo.toLowerCase();
    if (orden === "1") {
      return tituloA.localeCompare(tituloB);
    } else {
      return tituloB.localeCompare(tituloA);
    }
  };
  return productos.sort(comparador);
}

ordenSelect.addEventListener("change", () => {
  const orden = ordenSelect.value;
  const objetosOrdenados = ordenarPorTitulo(productos, orden);
  modelar(objetosOrdenados, orden);
});

const agregar = function (el) {
  const prev = [];
  if (localStorage.getItem("carrito")) {
    const prev2 = JSON.parse(localStorage.getItem("carrito"));
    prev2.map((producto) => {
      prev.push(producto);
    });
  }

  prev.push(el);
  localStorage.setItem("carrito", JSON.stringify(prev));

  numerito1();
};
const numerito1 = function () {
  const carro = document.getElementById("numerito");
  carro.textContent = JSON.parse(localStorage.getItem("carrito")).length;
};
