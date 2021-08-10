function crearNav(){
const contenedor = document.querySelector(".contenedor")
const nav = document.createElement("header")
nav.classList.add("header")
nav.innerHTML = `

<img class="header-logo" src="" alt="">
<div class="header-container">
    <h1 class="header-container__h1">El faro</h1>
    <p class="header-container__p">cafeteria</p>
</div>
<img class="header-icono"  src="./imagenes/menu.png" alt="menú">

<div id="header-nav" class="header-nav">
    <a class="header-nav__link" href="#menu-display">Menú</a>
    <a class="header-nav__link" href="#ubicacion-display">Ubicación</a>
    <a class="header-nav__link" href="#footer-display">Contacto</a>
</div>

`
contenedor.appendChild(nav)



}