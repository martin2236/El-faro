function crearCarousel (){
    

    
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
