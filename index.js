document.getElementById("btn_prods").addEventListener('click',()=>{
    window.location.href = "productos.html";
})

document.getElementById("familyb").addEventListener('click',()=>{
    window.location.href = "index.html";
})

cargarjson()

function cargarjson() {
    fetch('productos.json')
    .then((res) => res.json())
    .then((data) => {
        let to_html = '';
        data.forEach((categoria) => {
            categoria.forEach((producto) => {
                to_html += `
                    <div class="prod">
                        <div class="card">
                            <div class="frente">
                                <section class="card-img">
                                    <img src="${producto.image}" alt="${producto.nombre}">
                                </section>
                                <section class="card-info">
                                    <h3>${producto.nombre}</h3>
                                </section>
                            </div>
                            <div class="atras">
                                <h4>$${producto.precio}</h4>
                                <p>${producto.descripcion}</p>
                            </div>
                        </div>
                        <section class="section_btn">
                            <button class="añadir_carrito" data-id="${producto.id}">
                                <img src="img/agregar_carrito.png" alt="Añadir al carrito">
                            </button>
                        </section>
                    </div>
                    `;
                });
            });

            document.getElementById("productos").innerHTML = to_html;

            // Añadir evento de clic a los botones después de que se cargue el HTML
            const botones = document.querySelectorAll('.añadir_carrito');
            botones.forEach(boton => {
                boton.addEventListener('click', function() {
                    const productoId = this.getAttribute('data-id');
                    agregarAlCarrito(productoId);
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function agregarAlCarrito(productoId) {
    fetch('productos.json')
        .then((res) => res.json())
        .then((data) => {
            let productoSeleccionado = null;

            // Buscar el producto en todas las categorías
            for (let categoria of data) {
                productoSeleccionado = categoria.find(producto => producto.id == productoId);
                if (productoSeleccionado) break;
            }

            if (productoSeleccionado) {
                carrito.push(productoSeleccionado);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                console.log("Producto añadido al carrito:", productoSeleccionado);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    } else {
        carrito = [];
    }

    cargarjson();
});