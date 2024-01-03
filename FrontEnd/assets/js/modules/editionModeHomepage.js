//all changes on homepage when user is connected like new button for adding new work

import deleteWork from "./deleteWork.js";
import getCategories from "./getCategories.js";
import createWork from "./createWork.js";
import logout from "./logout.js";

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


    for(const work of data){

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

function toggleSubmit(btn,titleInput,fileInput,categoryInput){
    if(titleInput.value !== null && titleInput.value !== undefined && titleInput.value.length > 5 && fileInput.value !== null && fileInput.value !== undefined && categoryInput.value !== null && categoryInput.value !== undefined && categoryInput.value !== "unselected"){
        if(btn.classList.contains('disabled')){
            btn.classList.remove('disabled')
            btn.removeAttribute('disabled')
        }
    }else{
        if(!btn.classList.contains('disabled')){
            btn.classList.add('disabled')
            btn.disabled = "true"
        }
    }
}

//change modal elements when click on button "Ajouter une photo"
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

    const form = document.createElement('form')

    const fileInputDiv = document.createElement('div')
    fileInputDiv.classList.add('file-input-div')

    const fileIcon = document.createElement('img')
    fileIcon.src = "./assets/images/picture-svgrepo-com.png"
    fileInputDiv.appendChild(fileIcon)

    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.id = "photoInput"
    fileInput.name = "image"
    fileInput.addEventListener('change',()=>{
        toggleSubmit(addWorkBtn,titleInput,fileInput,categoryInput)
        if(fileInput.files[0]){
                label.style.display = "none"
                fileIcon.style.display = "none"
                para.style.display = "none"
                const image = document.createElement('img')
                image.src = URL.createObjectURL(fileInput.files[0])
                image.id = "previewImage"
                fileInputDiv.appendChild(image)
                
        }
    })
    fileInputDiv.appendChild(fileInput)
    fileInput.style.display= "none"

    const label = document.createElement("label")
    label.setAttribute('for','photoInput')
    label.innerText = "+ Ajouter photo"
    fileInputDiv.appendChild(label)

    const para = document.createElement("p")
    para.innerText= "jpg,png, 4mo max"
    fileInputDiv.appendChild(para)
    
    form.appendChild(fileInputDiv)


    
    const titleField = document.createElement('fieldset')

    const titleLabel = document.createElement("label")
    titleLabel.setAttribute('for','titleInput')
    titleLabel.innerText = "Titre"
    titleField.appendChild(titleLabel)

    const titleInput = document.createElement('input')
    titleInput.type = "text"
    titleInput.id = "titleInput"
    titleInput.name = "title"
    titleInput.addEventListener('change',()=>{
        toggleSubmit(addWorkBtn,titleInput,fileInput,categoryInput)
    })
    titleField.appendChild(titleInput)

    form.appendChild(titleField)

    const categoryField = document.createElement('fieldset')
    const categoryLabel = document.createElement("label")
    categoryLabel.setAttribute('for','categoryInput')
    categoryLabel.innerText = "Catégorie"
    categoryField.appendChild(categoryLabel)

    const categoryInput = document.createElement('select')
    categoryInput.id = "categoryInput"
    categoryInput.name = "category"
    categoryInput.addEventListener('change',()=>{
        toggleSubmit(addWorkBtn,titleInput,fileInput,categoryInput)
    })
    const emptyOption = document.createElement('option')
    emptyOption.value = "unselected"
    categoryInput.appendChild(emptyOption)
    categoryField.appendChild(categoryInput)

    // boucle for sur les catégories uniquement

    getCategories()
        .then(r=>{

            for(const category of r){
                const option = document.createElement('option')
                option.innerText = category.name
                option.value = category.id
                categoryInput.appendChild(option)
            }

        })


    form.appendChild(categoryField)

    const hr = document.createElement('div')
    hr.classList.add('separator')
    form.appendChild(hr)

    const addWorkBtn = document.createElement('input')
    addWorkBtn.value = "Valider"
    addWorkBtn.id = "addWorkBtn"
    addWorkBtn.type = "submit"
    addWorkBtn.disabled ="true"
    addWorkBtn.classList.add('disabled')
    form.appendChild(addWorkBtn)
    form.id = "newWorkForm"
    form.addEventListener('submit',e=>{
        e.preventDefault() 


        if(titleInput.value === null || titleInput.value === undefined || titleInput.value.length < 5){
            titleInput.classList.add('error')
            console.log('test 1')
        }
        if(fileInput.value === null || fileInput.value === undefined || fileInput.value === ""){
            label.classList.add('error')
            console.log('test 2')
        }
        if(categoryInput.value === null || categoryInput.value === undefined ){
            categoryInput.classList.add('error')
            console.log('test 3')
        }
        if(
            titleInput.value.length > 5 &&
            fileInput.files.length >0 &&
            categoryInput.value !== "unselected" 
        ){
            
            const formData = new FormData();

            formData.append("image", fileInput.files[0]);
            formData.append("title", titleInput.value);
            formData.append("category", Number(categoryInput.value));
            // {
            //     "image": fileInput.files[0],
            //     "title": titleInput.value,
            //     "category": Number(categoryInput.value)
            //   }
              console.log('condition verifiée')
            // quel format pour l'url de l'image ? (error 500)
            
            createWork(formData, sessionStorage.token)
                .then(res=>{
                    console.log(res)
                })

        }
    })
    modal.appendChild(form)

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
        logoutBtn.addEventListener("click", logout)

        filterBar.style.display = "none"
        
        createEdtionBanner(body)
        createWorkModifDiv(workSection,gallery)
        handleModifBtnClic(body,data)

    }else{
        
        loginBtn.style.display = "block"
        logoutBtn.style.display = "none"
        filterBar.style.display = "flex"

    }

}