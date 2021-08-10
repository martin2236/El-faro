function getContentful(){
return  fetch(" https://cdn.contentful.com/spaces/uq7529l1n1cl/environments/master/content_types?access_token=BIKLyw8bHobEupEDPoOGm27ZVh9Iqi7LQfA5s313as4")
.then(response => response.json())
.then(data => {
    const subMenu = data.items.map((items)=>{
        return{
            tipo:items.name
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
const a = template.querySelector(".a")
a.href = "/" + data.tipo
titulo.textContent = data.tipo
const clone = template.cloneNode(true)
contenedor.appendChild(clone)

}




function main(){
crearCarousel()
crearNav()
crearFooter()
const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
const botonClose = document.querySelector(".header-nav__close")

//envia la data de contentful para crear los sub menus
getContentful().then((submenu)=>{
        for (const r of submenu){
            agregarSubMenu(r)
        }
})
//bones menu mobile
botonMenu.addEventListener("click",(e)=>{
    e.stopPropagation()
    botonMenu.style.display = "none"
    menuOculto.style.display = "inherit"
})
botonClose.addEventListener("click",(e)=>{
    e.stopPropagation()
    botonMenu.style.display = "inherit"
    menuOculto.style.display = "none"
})



}
main()