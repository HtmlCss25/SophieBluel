const gallery = document.getElementById("gallery");

function createCard(work){

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

export function showAllCards(data){
    for(const work of data.works){
        createCard(work)
    }
}

function handleFilterBtnClick(e,data){

    

    while(gallery.firstChild){
        gallery.removeChild(gallery.firstChild);
    }

    if(e.target.id==="0"){
        showAllCards(data)
        
    }else{

        for(const work of data.works){
            
            if(work.categoryId==e.target.id){
                
                createCard(work)
            }
        }

    }


}

export default handleFilterBtnClick;