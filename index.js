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

function agregarSubMenu(data){
const contenedor = document.querySelector(".menu-container__cards")
const template = document.querySelector(".submenu").content
const titulo = template.querySelector(".card-h4")
console.log(data)
titulo.textContent = data.tipo
const clone = template.cloneNode(true)
contenedor.appendChild(clone)

}


function main(){
getContentful().then((submenu)=>{
        for (const r of submenu){
            agregarSubMenu(r)
        }
})

const botonMenu = document.querySelector(".header-icono")
const menuOculto = document.querySelector(".header-nav")
botonMenu.addEventListener("click",(e)=>{
    e.stopPropagation()
    botonMenu.style.display = "none"
    menuOculto.style.display = "inherit"
})

}
main()