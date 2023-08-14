
let header = document.querySelector(".header");

let pantalla = document.querySelector(".contenedor_calculadora--1__respuesta");
let numeros  = document.querySelectorAll(".caja_numero");
let borrador = document.querySelector(".caja_numero_red");
let resultado = document.querySelector(".caja_numero_orange");
let botonGoogle = document.querySelector(".header_login");

const state = {
 user: {
    isvalid: false
 }
}

function agregarNumeroaPantalla() 
{
    numeros.forEach(caja => {
        caja.addEventListener('click', 
            (e)=> pantalla.textContent += `${e.target.textContent}` 
        );
    });
}

function borrarNumeroPantalla() 
{
    borrador.addEventListener('click', 
    () => pantalla.textContent = pantalla.textContent.length > 1 ? 
            pantalla.textContent.substring(0, pantalla.textContent.length - 1 ) : "0"
    );    
}

function obtenerResultado() 
{
    resultado.addEventListener('click', 
    () => {
        try {
            let operacion = eval(pantalla.textContent);
            if(!Number.isNaN(operacion))
            {
                pantalla.textContent = `${eval(pantalla.textContent)}`;
            }
            else {
                alertaError();
            }
        } catch (error) {
            console.log(error);
            alertaError();
        }
    });    
}

function alertaError()
{
    pantalla.textContent = "0";
    alert("LA OPERACIÓN NO ES VÁLIDA");
}
/***** Credenciales ******/
function handleCredentialResponse (response) 
{
    let profile = parseJwt(response.credential);
    let user = state.user;
    user.isvalid = true;
    user = { ...user,...profile };
    state.user = user;
    getUser();
}

function parseJwt (credential) 
{
    let base64Url = credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getUser()
{
    if(state.user.isvalid)
    {
        let html = generarHTMLusuario(state.user.picture, state.user.name);
        header.insertAdjacentHTML('afterbegin', html);
        botonGoogle.classList.add("header_login--hide");
    }
}

function generarHTMLusuario(picture, name)
{
    return ` <div class="header_user">
        <div class="header_user--image">
            <img src="${picture}" alt="user picture" />
        </div>
        <span class="header_user--username">${name}</span>
    </div>
`;
}

function init() 
{
    agregarNumeroaPantalla();
    borrarNumeroPantalla();
    obtenerResultado();
    getUser();
}



function setup() {
    init();
}

function draw() {
    // put drawing code here
}
