document.addEventListener('DOMContentLoaded', function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoUI = document.getElementById('carrito');
    const totalUI = document.getElementById('total');

    function calcularTotal() {
        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        totalUI.textContent = `Total: $${total.toFixed(2)}`;
    }

    function mostrarCarrito() {
        carritoUI.innerHTML = '';

        if (carrito.length === 0) {
            carritoUI.innerHTML = '<p id="text_vacio">El carrito esta vacio.</p>';
        } else {
            carrito.forEach((producto, index) => {
                const item = document.createElement('div');
                item.className = 'item-carrito';
                item.innerHTML = `
                    <section class="info">
                        <img src="${producto.image}" alt="${producto.nombre}">
                        <h4>${producto.nombre}</h4>
                        <p>$${producto.precio}</p>
                    </section>
                    <section class="btns">
                        <div class="cantidad-control">
                            <button class="cantidad-menos" data-index="${index}">−</button>
                            <input type="number" min="1" value="${producto.cantidad || 1}" class="cantidad" data-index="${index}">
                            <button class="cantidad-mas" data-index="${index}">+</button>
                        </div>
                        <button class="eliminar" data-index="${index}"><img src="img/eliminar.png" class="img_eliminar"></button>
                    </section>
                `;
                carritoUI.appendChild(item);
            });

            // Añadir eventos para aumentar/disminuir cantidad
            const botonesMas = document.querySelectorAll('.cantidad-mas');
            const botonesMenos = document.querySelectorAll('.cantidad-menos');
            const inputsCantidad = document.querySelectorAll('.cantidad');

            botonesMas.forEach(boton => {
                boton.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    carrito[index].cantidad++;
                    inputsCantidad[index].value = carrito[index].cantidad;
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    calcularTotal();
                });
            });

            botonesMenos.forEach(boton => {
                boton.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    if (carrito[index].cantidad > 1) {
                        carrito[index].cantidad--;
                        inputsCantidad[index].value = carrito[index].cantidad;
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        calcularTotal();
                    }
                });
            });

            inputsCantidad.forEach(input => {
                input.addEventListener('input', function() {
                    const index = this.getAttribute('data-index');
                    carrito[index].cantidad = parseInt(this.value) || 1; // Asegura que la cantidad sea al menos 1
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    calcularTotal();
                });
            });

            const botonesEliminar = document.querySelectorAll('.eliminar');
            botonesEliminar.forEach(boton => {
                boton.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    carrito.splice(index, 1);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    mostrarCarrito();
                    calcularTotal();
                });
            });

            calcularTotal();
        }
    }

    // Mostrar carrito al cargar la página
    mostrarCarrito();
});

document.getElementById("familyb").addEventListener('click',()=>{
    window.location.href = "index.html";
})