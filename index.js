function getContentful(){
return  fetch(" https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/content_types?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4")
.then(response => response.json())
.then(data => {
    console.log(data)
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
console.log(data.descripcion)
a.href = "/" + data.tipo
titulo.textContent = data.tipo
descripcion.textContent = data.descripcion;
img.src = `./imagenes/${data.tipo.toLowerCase()}.jpg`

const clone = template.cloneNode(true)
contenedor.appendChild(clone)

}




function main(){
crearCarousel()
crearNav()
crearFooter()
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const contenedor = document.querySelector(".container")

//envia la data de contentful para crear los sub menus
getContentful().then((submenu)=>{
        for (const r of submenu){
            agregarSubMenu(r)
        }
})
//botones menu mobile
botonMenu.addEventListener("click",(e)=>{
    e.stopPropagation()
    if(menuOculto.style.display == "none" ){
      return  menuOculto.style.display = "inherit"
    } else {
        return menuOculto.style.display = "none"
    }
})

contenedor.addEventListener("touchmove",(e)=>{
    e.stopPropagation()
        if(menuOculto.style.display == "inherit" ){
            return menuOculto.style.cssText = "display:none;"
        }
})

}
main()