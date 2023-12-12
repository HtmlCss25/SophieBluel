//all changes on homepage when user is connected like new button for adding new work

import deleteWork from "./deleteWork.js";
function preventDefaultWheel(e){
    e.preventDefault()
}

function preventDefaultKeys(e){
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
    }
}

function preventScroll(){

    window.addEventListener('wheel', preventDefaultWheel, {passive:false});
    
    window.addEventListener('keydown', preventDefaultKeys, {passive:false});

}

function allowScroll(){

    window.removeEventListener('wheel', preventDefaultWheel, {passive:false});

    window.removeEventListener('keydown', preventDefaultKeys, {passive:false});

}

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

function handleDeleteBtnClick(id){

    if(sessionStorage.token){
        const response = deleteWork(id,sessionStorage.token)
        console.log(response)
    }

}

function resetModal(modal){

    while(modal.firstChild){
        modal.removeChild(modal.firstChild)
    }

}

function createModalCards(section,data){


    for(const work of data.works){

        const card = document.createElement('article')
        card.classList.add('modalCard')
        const image = document.createElement('img')
        image.src = work.imageUrl
        image.alt = work.title
        const icon = document.createElement('i')
        icon.classList.add('fa-solid')
        icon.classList.add('fa-trash-can')
        icon.id = work.id
        icon.addEventListener('click',()=>{
            handleDeleteBtnClick(icon.id)
        })
        card.appendChild(image)
        card.appendChild(icon)
        section.appendChild(card)
    }

}

function createModalCardSection(modal,data){

    const modalCardSection = document.createElement('section')
    modalCardSection.classList.add('modal-card-section')

    createModalCards(modalCardSection,data)
    modal.appendChild(modalCardSection)
    return modalCardSection
}

function createModal(body, data){
    const existingModal = document.querySelector(".galleryModal")
    if(existingModal){
        resetModal(existingModal)
    }
    const existingBcg = document.querySelector('.modal-background')
    let bcg;
    if(!existingBcg){
        bcg = document.createElement('div')
        bcg.classList.add('modal-background')
    }
    else if(existingBcg){
        bcg= existingBcg;
    }

    let modal;
    if(!existingModal){
        modal = document.createElement('div')
        modal.classList.add("galleryModal")
    }else if(existingModal){
        modal = existingModal
    }
    const title = document.createElement('h2')
    title.innerText = 'Galerie photo'
    modal.appendChild(title)
    const icon = document.createElement('i')
    icon.classList.add('fa-solid')
    icon.classList.add('fa-xmark')
    icon.addEventListener('click',()=>{
        body.removeChild(bcg)
        allowScroll()
    })
    modal.appendChild(icon)
    bcg.appendChild(modal)
    body.appendChild(bcg)

    createModalCardSection(modal, data)

    const hr = document.createElement('div')
    hr.classList.add('separator')
    modal.appendChild(hr)

    const addWorkBtn = document.createElement('input')
    addWorkBtn.value = "Ajouter une photo"
    addWorkBtn.id = "addWorkBtn"
    addWorkBtn.type = "submit"
    addWorkBtn.addEventListener('click',()=>{
        handleAddWorkBtnClick(body,data,bcg,modal)
    })
    modal.appendChild(addWorkBtn)
    preventScroll()
}

function handleModifBtnClic(body,data){

    const modifBtn = document.querySelector('.work-modif-div')

    modifBtn.addEventListener('click',()=>{


        createModal(body,data)
        

    })

}

function handleAddWorkBtnClick(body,data,bcg,modal){
    resetModal(modal)

    const title = document.createElement('h2')
    title.innerText = 'Ajout photo'
    modal.appendChild(title)
    const icon = document.createElement('i')
    icon.classList.add('fa-solid')
    icon.classList.add('fa-xmark')
    icon.addEventListener('click',()=>{
        body.removeChild(bcg)
        allowScroll()
    })
    modal.appendChild(icon)

    const arrowBack = document.createElement('i')
    arrowBack.classList.add('fa-solid')
    arrowBack.classList.add('fa-arrow-left')
    arrowBack.addEventListener('click',()=>{

        createModal(body,data)

    })
    modal.appendChild(arrowBack)

    const fileInputDiv = document.createElement('div')
    fileInputDiv.classList.add('file-input-div')
    const fileIcon = document.createElement('i')
    fileIcon.classList.add('')

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

export function editionModeHomepage(data){

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
        handleModifBtnClic(body,data)

    }else{
        
        loginBtn.style.display = "block"
        logoutBtn.style.display = "none"
        filterBar.style.display = "block"

    }

}