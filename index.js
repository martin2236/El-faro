function getSubMenus(){
    return  fetch("https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/entries?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4&content_type=subMenu")
    .then(response => response.json())
    .then(data => {
        var subMenu = data.items.map((items)=>{
          const img = buscarImagen(items.fields.imagen.sys.id, data)
            return{
                subMenu:items.fields.tipoDeSubMenu,
                imagen: img.fields.file.url,
                descripcion: items.fields.descripcion,
                posicion:items.fields.posicionDeSubMenu
            }
        })
         return subMenu
      })
}

//hace lo que dice el nombre XD
function buscarImagen(id, datos){
    const imagen = datos.includes.Asset.find((asset) => {
           return asset.sys.id == id; });
          return imagen 
}
//crea los subMenus
function agregarSubMenu(data){
    const contenedor = document.querySelector(".menu__aperitivos")
    const templates = document.querySelector(".template").content
    var titulos = templates.querySelector(".menu__aperitivos-sub-titulo")
   var numero = templates.querySelector(".menu__numero")
    var descripcion = templates.querySelector(".menu__descripcion")
    var imagen = templates.querySelector(".menu__img")
    imagen.src = data.imagen
    descripcion.textContent= data.descripcion
     numero.textContent = "0" + data.posicion + "."
     titulos.textContent = data.subMenu
 
     const clone = templates.cloneNode(true)
     clone.firstElementChild.addEventListener("click",(e)=>{
      e.preventDefault()
    })
     contenedor.appendChild(clone)
}

function Ordenar(submenu,){
    const listaOrdenada = submenu.sort(function(a, b) {
        var nameA = a.subMenu.toUpperCase(); // ignore upper and lowercase
        var nameB = b.subMenu.toUpperCase(); // ignore upper and lowercase
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

getSubMenus().then((submenu)=>{
    Ordenar(submenu)
for(const s of submenu){
  agregarSubMenu(s)
}

})
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const contenedor = document.querySelector(".container")

//botones menu oculto mobile
botonMenu.addEventListener("click",(e)=>{
    e.stopPropagation()
    if(menuOculto.style.display == "none" ){
      return  menuOculto.style.display = "inherit"
    } else {
        return menuOculto.style.display = "none"
    }
})
// cierra menu mobile al desplazarce
contenedor.addEventListener("touchmove",(e)=>{
    e.stopPropagation()
        if(menuOculto.style.display == "inherit" ){
            return menuOculto.style.cssText = "display:none;"
        }
})


}
main()