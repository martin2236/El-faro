function crearFooter(){
    const contenedor = document.querySelector(".footer-cont")
    const footer = document.createElement("footer")
    footer.classList.add("footer")
    footer.setAttribute("id", "footer-display")
    footer.innerHTML = `
    <div class="footer-contacto">
    <h2 class="footer-contacto__h2">Contacto</h2>
<div class="footer-contacto__telefonos">
    <h2 class="footer-contacto__h3">Telefonos</h3>
    <p class="footer-contacto__div--link">Tel : 02257-60473</p>
    <p class="footer-contacto__div--link">Tel : 02257-12341</p>
</div>    
<div class="footer-contacto__redes">
    <h2 class="footer-contacto__h3">redes</h3>
    <p class="footer-contacto__div--link">Insta : @CafeteriaElFaro</p>
    <p class="footer-contacto__div--link">Face :ElFaroCafeteria</p>
</div>    
</div>
    <div class="footer-horarios">
        <h2 class="footer-horarios__h2">Horarios</h2>
    <div class="footer-horarios__div">
        <p class="footer-horarios__div--dias">De Lunes a Lunes</p>
    <p class="footer-horarios__div--hs">De 7 AM a 3 AM</p>
    </div>
</div>
    `
    contenedor.appendChild(footer)
}