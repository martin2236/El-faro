function crearUbicacion(){
    const contenedor = document.querySelector(".ubicacion")
    const div = document.createElement("div")
    div.classList.add("ubicacion-cont")
    div.innerHTML = `
    <h2 class="ubicacion-h2">Nuestro punto de encuentro</h2>
    <div class="ubicacion__iframe">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.0440296498255!2d-56.68248938471233!3d-36.72150377996489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c6f6408e6ad2b%3A0xf46101992fbb0355!2sEl%20Faro%20Cafeter%C3%ADa!5e0!3m2!1ses!2sar!4v1626571985561!5m2!1ses!2sar" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
   <div class="ubicacion__frase">
       <p class="ubicacion__frase-p">"vení a disfrutar de la experiencia El Faro, contamos con la mejor atención desde 1988"</p>
   </div>

    `
    contenedor.appendChild(div)
}