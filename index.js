function getContentful(){
return  fetch(" https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/content_types?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4")
.then(response => response.json())
.then(data => {
    const subMenu = data.items.map((items)=>{
        return{
            tipo:items.name,
            descripcion: items.description
        }
    })
    return subMenu
});

}

//agrega los submenus y los hrefs
function agregarSubMenu(data){
const contenedor = document.querySelector(".menu-container__cards")
const template = document.querySelector(".submenu").content
const titulo = template.querySelector(".card-h4")
const descripcion = template.querySelector(".card__descripcion")
const img = template.querySelector(".card__img")
const a = template.querySelector(".a")
const linkDescktop = template.querySelector(".card__link-full")

a.href = "./" + data.tipo +".html"
titulo.textContent = data.tipo
descripcion.textContent = data.descripcion;
img.src = `./imagenes/${data.tipo.toLowerCase()}.jpg`
linkDescktop.href = "/" + data.tipo +".html"


const clone = template.cloneNode(true)
contenedor.appendChild(clone)
return contenedor
}

// evita que la el orden se modifique despues de hacer cambios en contentful
function Ordenar(submenu){
    const listaOrdenada = submenu.sort(function(a, b) {
        var nameA = a.tipo.toUpperCase(); // ignore upper and lowercase
        var nameB = b.tipo.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      });
      return listaOrdenada
}



function main(){
crearCarousel()
crearNav()
crearUbicacion()
crearFooter()
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const contenedor = document.querySelector(".container")

//envia la data de contentful para crear los sub menus
getContentful().then((submenu)=>{
 
    Ordenar(submenu)
        for (const r of submenu){
            agregarSubMenu(r)
        }
})
//botones menu oculto mobile
botonMenu.addEventListener("click",(e)=>{
    e.stopPropagation()
    if(menuOculto.style.display == "none" ){
      return  menuOculto.style.display = "inherit"
    } else {
        return menuOculto.style.display = "none"
    }
})
// cierra menu al desplazarce
contenedor.addEventListener("touchmove",(e)=>{
    e.stopPropagation()
        if(menuOculto.style.display == "inherit" ){
            return menuOculto.style.cssText = "display:none;"
        }
})


}
main()