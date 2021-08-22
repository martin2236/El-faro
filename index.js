function getSubMenus(){
    return  fetch("https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/entries?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4&content_type=subMenu")
    .then(response => response.json())
    .then(data => {
        var subMenu = data.items.map((items)=>{
         const img = buscarImagen(items.fields.imagen.sys.id, data)
            return{
                tipo:items.fields.tipo,
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
//crea los aperitivos
function agregarAperitivos(data){
    const contenedor = document.querySelector(".menu__aperitivos")
    const templates = document.querySelector(".template").content
    var titulos = templates.querySelector(".menu__aperitivos-sub-titulo")
   var numero = templates.querySelector(".menu__numero-aperitivos")
    var descripcion = templates.querySelector(".menu__descripcion-aperitivos")
    var imagen = templates.querySelector(".menu__img-aperitivos")
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
function agregarBebidas(data){
  const contenedor = document.querySelector(".menu__bebidas")
  const templates = document.querySelector(".template-2").content
  const titulos = templates.querySelector(".menu__bebidas-sub-titulo")
  const numero = templates.querySelector(".menu__numero-bebidas")
  const descripcion = templates.querySelector(".menu__descripcion-bebidas")
  const imagen = templates.querySelector(".menu__img-bebidas")
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
function agregarPrincipales(data){
  const contenedor = document.querySelector(".menu__principales")
  const templates = document.querySelector(".template-3").content
  const titulos = templates.querySelector(".menu__principales-sub-titulo")
  const numero = templates.querySelector(".menu__numero-principales")
  const descripcion = templates.querySelector(".menu__descripcion-principales")
  const imagen = templates.querySelector(".menu__img-principales")
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
function agregarPostres(data){
  const contenedor = document.querySelector(".menu__postres")
  const templates = document.querySelector(".template-4").content
  const titulos = templates.querySelector(".menu__postres-sub-titulo")
  const numero = templates.querySelector(".menu__numero-postres")
  const descripcion = templates.querySelector(".menu__descripcion-postres")
  const imagen = templates.querySelector(".menu__img-postres")
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
//agrega interacción al menú
function mostrarMenu(tag){
  const aperitivos = document.querySelector(".menu__aperitivos")
  const bebidas = document.querySelector(".menu__bebidas")
  const principales = document.querySelector(".menu__principales")
  const postres = document.querySelector(".menu__postres")
  tag.forEach((item)=>{
       item.addEventListener("click",(e)=>{
         e.preventDefault()
         console.log(item.textContent)
        if(item.textContent == "Aperitivos"){
          aperitivos.style.zIndex = "1000"
          bebidas.style.zIndex = "500"
          principales.style.zIndex = "400"
          postres.style.zIndex = "300"
        } else if (item.textContent == "Bebidas"){
          bebidas.style.zIndex = "1000"
          aperitivos.style.zIndex = "500"
          principales.style.zIndex = "400"
          postres.style.zIndex = "300"
        } else if (item.textContent == "Principales"){
         principales.style.zIndex = "1000"
          aperitivos.style.zIndex = "500"
          bebidas.style.zIndex = "400"
          postres.style.zIndex = "300"
        } else if (item.textContent == "Postres"){
         postres.style.zIndex = "1000"
          aperitivos.style.zIndex = "500"
          principales.style.zIndex = "400"
          bebidas.style.zIndex = "300"
        }
  })
    })
 
}

function main(){
crearCarousel()
crearNav()
crearUbicacion()
crearFooter()

getSubMenus().then((submenu)=>{
    Ordenar(submenu)
  
    aperitivos = submenu.filter((item)=>{
      return item.tipo == "Aperitivos"
      })
      for(const a of aperitivos){
          agregarAperitivos(a)
        }
      
      bebidas = submenu.filter((item)=>{
        return item.tipo == "Bebidas"
        })
        for(const b of bebidas){
          agregarBebidas(b)
        }
      principales = submenu.filter((item)=>{
        return item.tipo == "Principales"
        })
        for(const p of principales){
          agregarPrincipales(p)
        }
        postres = submenu.filter((item)=>{
          return item.tipo == "Postres"
          })
          for(const p of postres){
            agregarPostres(p)
          }
})
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const contenedor = document.querySelector(".container")
const subMenuBTN = document.querySelectorAll(".menu__sub-menus-link")

mostrarMenu(subMenuBTN)

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