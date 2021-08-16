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
  // console.log(data)
   const contenedor = document.querySelector(".menu__aperitivos")
   const template = document.querySelector(".template").content
    var titulos = template.querySelector(".menu__aperitivos-sub--titulo")
    var cardH4 = template.querySelector(".card-h4")
    var tipo = data[0].tipo
    var tipoMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    
    titulos.textContent = tipoMayus
    cardH4.textContent = data.map((item)=>{return item.titulo})

    
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

Ordenar(menus)

//organiza los productos por tipo
        for (const s of menus){
        var productosListados = productos.filter((items)=>{
        return items.tipo.toLowerCase() == s.subMenu.toLowerCase()
        })
        const aperitivosProd = productosListados.filter((item)=>{
            return item.clase.toLowerCase() === "aperitivo"
        })
        console.log(aperitivosProd)
        agregarSubMenu(productosListados)
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