function getContentful(){
return  fetch(" https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/entries?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4")
.then(response => response.json())
.then(data => {
    var subMenu = data.items.map((items)=>{
        return{
            subMenu:items.fields.tipoDeSubMenu
        }
    })
    var productos = data.items.map((items)=>{
        return{
                clase:items.fields.clase,
                tipo:items.fields.tipo,
                titulo:items.fields.titulo,
                descripcion: items.fields.descripcion,
                precio:items.fields.precio
        }
    })
   return [subMenu, productos]
});

}

//crea los templates

function agregarSubMenu(data){
  
   const contenedor = document.querySelector(".menu__aperitivos")
   const template = document.querySelector(".template").content
   var titulos = template.querySelector(".menu__aperitivos-sub--titulo")
  
    //agrega los sub menus
   if (data.hasOwnProperty("subMenu")){
       titulos.textContent = data.subMenu
   }else{
       return false
   }
    const clone = template.cloneNode(true)
    contenedor.appendChild(clone)
}

//agrega los productos
function agregarProductos(data){

const contenedor = document.querySelector(".menu__aperitivos-sub")
const template2 = document.querySelector(".card-template").content
const card = template2.querySelector(".card")
const titulo = template2.querySelector(".card-h4")
const descripcion = template2.querySelector(".card__descripcion")
const precio = template2.querySelector(".card__precio")

titulo.textContent = data.titulo
descripcion.textContent = data.descripcion
precio.textContent = data.precio
const clone = template2.cloneNode(true)
contenedor.appendChild(clone)

}

// evita que el orden de los sub-menus se modifique despues de hacer cambios en contentful

function Ordenar(submenu,){
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


function mainMenu(){
crearNav();
crearUbicacion()
crearFooter()
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const contenedor = document.querySelector(".container")

//envia la data de contentful para crear los sub menus y productos
getContentful().then((submenu)=>{
  var menus = submenu[0].filter((item)=>{
      return item.subMenu !== undefined
  })
  var productos = submenu[1].filter((item)=>{
     return item.clase !== undefined
})
 
        for (const s of menus){
            var algo = productos.filter((items)=>{
                return items.tipo.toLowerCase() == s.subMenu.toLowerCase()
            })
            console.log( algo)
            
            
        }
        // for (const p of submenu[1]){
        //     if (p.clase !== undefined){
        //         if(p.clase == "aperitivo"){
        //             agregarProductos(p)
        //         }
        //     } 
        // }
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