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

//agrega los submenus 

function agregarSubMenu(data){
   const contenedor = document.querySelector(".menu__aperitivos")
   const template = document.querySelector(".template").content
   var titulos = template.querySelector(".menu__aperitivos-sub--titulo")
   titulos.textContent = data.subMenu
 
    const clone = template.cloneNode(true)
    contenedor.appendChild(clone)
}

//agrega los productos
function agregarProductos(data){
console.log(data)

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
        for (const s of submenu[0]){
            if (s.subMenu !== undefined){
                 agregarSubMenu(s)
            }
        }
        for (const p of submenu[1]){
            if (p.clase !== undefined){
                 agregarProductos(p)
            }
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