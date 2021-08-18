//trae los productos desde contentful
function getProductos(){
return  fetch("https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/entries?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4&content_type=producto")
.then(response => response.json())
.then(data => {
  var productos = data.items.map((items)=>{
       const img = buscarImagen(items.fields.imagen.sys.id, data)
         return{
                clase:items.fields.clase,
                tipo:items.fields.tipo,
                titulo:items.fields.titulo,
                descripcion: items.fields.descripcion,
                precio:items.fields.precio,
                imagen:img.fields.file.url
            }
    })
   return productos
});
}
//hace lo que dice el nombre XD
function buscarImagen(id, datos){
 const imagen = datos.includes.Asset.find((asset) => {
        return asset.sys.id == id; });
       return imagen 
  }
//trae los subMenus desde contentful
function getSubMenus(){
return  fetch("https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/entries?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4&content_type=subMenu")
.then(response => response.json())
.then(data => {
    var subMenu = data.items.map((items)=>{
        return{
            subMenu:items.fields.tipoDeSubMenu
        }
    })
     return subMenu
  })
 }
//crea los subMenus
function agregarSubMenu(data){
const contenedor = document.querySelector(".menu__aperitivos")
const templates = document.querySelector(".template").content
var titulos = templates.querySelector(".menu__aperitivos-sub--titulo")
var links = templates.querySelector(".menu__aperitivos-link")
 titulos.textContent = data.subMenu
 links.href = data.subMenu.toLowerCase()
 const clone = templates.cloneNode(true)
 clone.firstElementChild.addEventListener("click",(e)=>{
  e.preventDefault()
})
 contenedor.appendChild(clone)
}
//crea las cards
function agregarProducto(data){
    const contenedor = document.querySelector(".card__cont")
   const template = document.querySelector(".cards").content
    const cardH4 = template.querySelector(".card-h4")
   const imagen = template.querySelector(".card__img")
   const descripcion = template.querySelector(".card__descripcion")
  
   const precio = template.querySelector(".card__precio")
     var tipo = data.titulo
     var tipoMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    
    imagen.src = data.imagen
    cardH4.textContent = tipoMayus
    descripcion.textContent = data.descripcion
    descripcion.href = tipoMayus
    precio.textContent = data.precio

    const clone = template.cloneNode(true)
    
    contenedor.appendChild(clone)
}

// evita que el orden de los sub-menus se modifique despues de hacer cambios en contentful
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
function OrdenarProd(producto,){
    const listaOrdenada = producto.sort(function(a, b) {
        var nameA = a.clase.toUpperCase(); // ignore upper and lowercase
        var nameB = b.clase.toUpperCase(); // ignore upper and lowercase
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

function mainMenu(){
crearNav();
crearUbicacion()
crearFooter()
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const contenedor = document.querySelector(".container")

//envia la data de contentful para pintar los subMenus
getSubMenus().then((submenu)=>{
    Ordenar(submenu)
for(const s of submenu){
  agregarSubMenu(s)
}

})
//envia la data de contentful para pintar los productos
getProductos().then((producto)=>{
const aperitivos = producto.filter((items)=>{
    return items.tipo.toLowerCase() === "aperitivo"
})
    OrdenarProd(aperitivos)
        for (const a of aperitivos){
        agregarProducto(a)
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
mainMenu();