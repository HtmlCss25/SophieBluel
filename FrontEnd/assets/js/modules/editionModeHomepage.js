//all changes on homepage when user is connected like new button for adding new work

function createEdtionBanner(body){

    const banner = document.createElement("div");
    banner.classList.add('top-banner-edition-mode')
    const icon = document.createElement('i')
    icon.classList.add("fa-regular")
    icon.classList.add('fa-pen-to-square')
    const para = document.createElement('p')
    para.innerText="Mode édition"

    banner.appendChild(icon)
    banner.appendChild(para)

    body.appendChild(banner)
    body.classList.add('editionMode')
}

function createModal(){

    document.querySelector('')

}

function handleModifBtnClic(){

    const modifBtn = document.querySelector('.work-modif-div')

    modifBtn.addEventListener('click',()=>{



    })

}

function createWorkModifDiv(workSection,gallery){

    const div = document.createElement('div')
    div.classList.add('work-modif-div')
    const icon = document.createElement('i')
    icon.classList.add("fa-regular")
    icon.classList.add('fa-pen-to-square')
    const para = document.createElement('p')
    para.innerText="modifier"

    div.appendChild(icon)
    div.appendChild(para)
    
    
    workSection.insertBefore(div,gallery)

}

export function editionModeHomepage(){

    const loginBtn = document.querySelector("#loginBtn")
    const logoutBtn = document.querySelector("#logoutBtn")
    const filterBar = document.querySelector('#filterBar')
    
    const body = document.querySelector("#homeBody")
    const workSection = document.querySelector("#portfolio")
    const gallery = document.querySelector('#gallery')

    if(sessionStorage.token){

        loginBtn.style.display = "none"
        logoutBtn.style.display = "block"
        filterBar.style.display = "none"

        createEdtionBanner(body)
        createWorkModifDiv(workSection,gallery)

    }else{
        
        loginBtn.style.display = "block"
        logoutBtn.style.display = "none"
        filterBar.style.display = "block"

    }

}