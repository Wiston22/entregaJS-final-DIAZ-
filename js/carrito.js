const modelar = function (productos, orden) {
  const datacontainer = document.getElementById("contenedor-carrito");
  datacontainer.innerHTML = "";
  if (productos === null) {
    const empty = document.createElement("p");
    empty.classList.add("carrito-vacio");
    empty.textContent = "Tu carrito esta vacio.";
    datacontainer.appendChild(empty);
  } else {
    productos.forEach((element) => {
      const producto = document.createElement("div");
      producto.classList.add("carrito-producto");

      const imagenElement = document.createElement("img");
      imagenElement.src = `${element.imagen}`;
      producto.appendChild(imagenElement);

      const details = document.createElement("div");
      details.classList.add("carrito-producto-titulo");
      const small1 = document.createElement("small");
      small1.textContent = "titulo";
      details.appendChild(small1);

      const title = document.createElement("h3");
      title.textContent = element.titulo;
      details.appendChild(title);
      producto.appendChild(details);

      const quantity = document.createElement("div");
      quantity.classList.add("carrito-producto-cantidad");

      const small = document.createElement("small");
      small.textContent = "cantidad";

      quantity.appendChild(small);
      const quantityORIGI = document.createElement("p");

      quantityORIGI.textContent = element?.quantity || 1;
      quantity.appendChild(quantityORIGI);
      producto.appendChild(quantity);

      const price = document.createElement("div");
      quantity.classList.add("carrito-producto-precio");
      const small2 = document.createElement("small");
      small2.textContent = "precio";
      price.appendChild(small2);

      const priceOrigi = document.createElement("P");

      priceOrigi.textContent = element.precio;
      price.appendChild(priceOrigi);
      producto.appendChild(details);

      const subtotal = document.createElement("div");
      subtotal.classList.add("producto-precio-subtotal");
      const small3 = document.createElement("small");
      small3.textContent = "Subtotal";
      subtotal.appendChild(small3);

      const subtotalP = document.createElement("P");
      subtotalP.textContent = Number(element.precio) * (element?.quantity || 1);
      subtotal.appendChild(subtotalP);
      producto.appendChild(subtotal);
      datacontainer.appendChild(producto);
    });
  }
};

const getTotal = function () {
  let sumatoria = [0];
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.map((producto) => {
    sumatoria.push(Number(producto.precio) * (producto?.quantity || 1));
  });
  const container = document.getElementById("contenedor-carrito");
  const totalContainer = document.createElement("div");
  totalContainer.classList.add("carrito-acciones-total");
  const small = document.createElement("small");
  small.textContent = "total";
  const total = document.createElement("P");

  total.textContent = sumatoria.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  container.appendChild(totalContainer);
  totalContainer.appendChild(small);
  totalContainer.appendChild(total);
};
const deleteOrder = function () {
  const cancel = document.createElement("button");
  cancel.classList.add("carrito-acciones-vaciar");
  cancel.textContent = "vaciar carrito";
  const container = document.getElementById("contenedor-carrito");
  container.appendChild(cancel);
  cancel.addEventListener("click", (e) => {
    localStorage.setItem("carrito", []);
    modelar(localStorage.getItem("carrito"));
  });
};
const completedOrder = function () {
  const complete = document.createElement("button");
  complete.classList.add("carrito-acciones-comprar");
  complete.textContent = "Comprar";
  const container = document.getElementById("contenedor-carrito");
  container.appendChild(complete);
  complete.addEventListener("click", (e) => {
    const direccion = prompt("¿Ubicacion de su pedido?");
    if (direccion) {
      const fecha = prompt("¿Cuando quieres recibir tu pedido?");
      if (fecha) {
        alert("gracias por su compra, que le guste mucho. vuelva pronto.");
        localStorage.setItem("carrito", []);
        modelar(localStorage.getItem("carrito"));
      } else {
        alert("Vuelve cuando desee completar el pedido");
      }
    } else {
      alert("Vuelve cuando desee completar el pedido");
    }
  });
};

if (localStorage.getItem("carrito")) {
  modelar(JSON.parse(localStorage.getItem("carrito")));
  getTotal();
  deleteOrder();
  completedOrder();
}
