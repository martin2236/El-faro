function crearCarousel (){
    
const contenedor = document.querySelector(".carousel");
const div = document.createElement("div")
div.innerHTML = `

<div class="carousel__contenedor">
   <button aria-label="anterior" class="carousel__anterior">
       <i class="fas fa-chevron-left"></i>
   </button>
  
   <div class="carousel__lista">
       <div class="carousel__elemento">
           <img class="carousel-img__1" src="./imagenes/el faro bar.jpg" alt="El-faro bar">
       </div>
       <div class="carousel__elemento">
           <img class="carousel-img__1" src="./imagenes/el faro.jpg" alt="El-faro bar">
       </div>
       <div class="carousel__elemento">
           <img class="carousel-img__1" src="./imagenes/el faro bar 2.jpg" alt="El-faro bar">
       </div>
   </div>

   <button aria-label="siguiente" class="carousel__siguiente">
       <i class="fas fa-chevron-right"></i>
   </button>
</div>
<div role="tablist" id="indicadores" class="carousel__indicadores"></div>

`
contenedor.appendChild(div) 

window.addEventListener("load",function(){
    new Glider(document.querySelector(".carousel__lista"),{
        slidesToShow: 1,
        dots: '#indicadores',
        draggable: false,
        arrows: {
          prev: '.carousel__anterior',
          next: '.carousel__siguiente'
        }
    })
    })
  
}
