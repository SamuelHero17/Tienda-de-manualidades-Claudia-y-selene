let carrito = [];
//agrega el producto al carrito//
function agregarCarrito(nombre, precio){

    carrito.push({
        nombre:nombre,
        precio:precio
    });

    actualizarCarrito();
}
//muestra el producto agregado al carrito//
function actualizarCarrito(){

    let contenedor =
    document.getElementById("carrito");

    contenedor.innerHTML = " ";

    let total = 0;

    carrito.forEach(function(producto,index){

        total += producto.precio;

        contenedor.innerHTML += `
        
        <div class="item-carrito">
            
            <p>
                ${producto.nombre}
                -${producto.precio}
                </p>
            
                
                <button onclick="eliminarProducto(${index})">
                    eliminar del carrito
                </button> 
        </div>
        `;
        
    });

    document.getElementById("total")
    .textContent =
    "total: $" + total;
}
//borra del carrito///
function eliminarProducto(index){

    carrito.splice(index,1);

    actualizarCarrito();
}

//finaliza la compra//

function checkout(){
    let nombre=
    document.getElementById("Nombre").value;

    let direccion=
    document.getElementById("Direccion").value;

    let telefono=
    document.getElementById("Telefono").value;
    if(telefono.length !== 10){
        alert("Su número debe contener 10 digitos");
        return;
    }

    if(carrito.length === 0){
        alert("tu carrito esta vacio");
        return;
    }
    
    alert(
        "Pedido en proceso nos contactaremos contigo pronto :)\n\n" +
        "cliente: " + nombre + "\n" +
        "direccion: " + direccion + "\n" +
        "telefono: " + telefono + "\n" +
        "Total: $" + carrito.reduce((total,producto) => total + producto.precio,0)
    );
    

    let productosTexto = carrito.map(
        function(producto){
            return producto.nombre+ "\n"+ " - $" + producto.precio;
        }
    ).join("\n");

    emailjs.send(
        "service_53jwgjx",
        "template_nh67tqu",
        {
            Nombre:nombre,
            Direccion:direccion,
            Telefono:telefono,
            productos:productosTexto,
            total: "$" + carrito.reduce((total,producto) => total + producto.precio,0)
        }
    )
    .then(function(response){
        console.log("Hemos recibido tu pedido, nos pondremos en contacto contigo pronto!", response);
        carrito = [];
    actualizarCarrito();
    })
    .catch(function(error){
        console.log("Failed...", error);
    });
}