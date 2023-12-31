const gallery = document.getElementById("gallery");

function createCard(work){

    if(gallery){
        const card = document.createElement('article')
        card.className = "card";
        const image = document.createElement('img')
        image.src = work.imageUrl;
        image.alt = `photo de ${work.title} dans la catégorie ${work.category.name}`
        card.appendChild(image)
        const title = document.createElement("h3")
        title.innerText = work.title;
        card.appendChild(title)
        gallery.appendChild(card)
    }

}

export function showAllCards(data){
    for(const work of data){
        createCard(work)
    }
}

function handleFilterBtnClick(e,data){

    //setting classes to style selected button only
    const filters = document.querySelectorAll("#filterBar button");
    for(const filter of filters){
        if(filter.classList.contains("filterBar__button--selected")){
            filter.classList.remove("filterBar__button--selected")
            filter.classList.add("filterBar__button")
        }
    }
    e.target.classList.remove("filterBar__button")
    e.target.classList.add("filterBar__button--selected");
    console.log(filters)
    while(gallery.firstChild){
        gallery.removeChild(gallery.firstChild);
    }

    if(e.target.id==="0"){
        showAllCards(data)
        
    }else{

        for(const work of data){
            
            if(work.categoryId==e.target.id){
                
                createCard(work)
            }
        }

    }


}

export default handleFilterBtnClick;