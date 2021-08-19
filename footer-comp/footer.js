function crearFooter(){
    const contenedor = document.querySelector(".footer-cont")
    const footer = document.createElement("footer")
    footer.classList.add("footer")
    footer.setAttribute("id", "footer-display")
    footer.innerHTML = `
    <div class="footer-contacto">
    <h2 class="footer-contacto__h2">Contacto</h2>
<div class="footer-contacto__telefonos">
    <h2 class="footer-contacto__telefono-h3">Telefonos</h3>
    <img class="footer-contecto__telefono-icon" src="./imagenes/telefono.png" alt="icono">
    <p class="footer-contacto__telefono-link"> Tel : 02257-60473</p>
    <br>
    <img class="footer-contecto__telefono-icon" src="./imagenes/whatsapp.png" alt="icono">
    <p class="footer-contacto__telefono-link"> Tel : 02257-12341</p>
</div>    
<div class="footer-contacto__redes">
    <h2 class="footer-contacto__redes-h3">redes</h3>
    <img class="footer-contecto__redes-icon" src="./imagenes/instagram.png" alt="icono">
    <p class="footer-contacto__redes-link">Insta : @CafeteriaElFaro</p>
    <br>
    <img class="footer-contecto__redes-icon" src="./imagenes/facebook.png" alt="icono">
    <p class="footer-contacto__redes-link">Face :ElFaroCafeteria</p>
</div>    
</div>
    <div class="footer-horarios">
    <h3 class="footer-horarios__h3">Horarios</h3>
    <img class="footer-contecto__icon" src="./imagenes/horario.png" alt="icono">
    <p class="footer-horarios__horario">De Lunes a Lunes</p>
    <br>
    <p class="footer-horarios__horario">De 7 AM a 3 AM</p>
  
</div>
    `
    contenedor.appendChild(footer)
}