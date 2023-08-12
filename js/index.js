
let pantalla = document.querySelector(".contenedor_calculadora--1__respuesta");
let numeros  = document.querySelectorAll(".caja_numero");
let borrador = document.querySelector(".caja_numero_red");
let resultado = document.querySelector(".caja_numero_orange");

numeros.forEach(caja => {
    caja.addEventListener('click', 
        (e)=> pantalla.textContent += `${e.target.textContent}` 
    );
});

borrador.addEventListener('click', 
    () => pantalla.textContent = pantalla.textContent.length > 1 ? 
            pantalla.textContent.substring(0, pantalla.textContent.length - 1 ) : "0"
);

resultado.addEventListener('click', 
    () => {
        try {
            pantalla.textContent = `${eval(pantalla.textContent)}`;
        } catch (error) {
            console.log(error);
            pantalla.textContent = "0";
            alert("LA OPERACIÓN NO ES VÁLIDA");
        }
    } 
);