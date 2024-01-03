import handleFilterBtnClick from "./handleFilterBtnClick.js";

function createFilterBar(data){
    const filterBar = document.querySelector("#filterBar");
    if(filterBar){
        let filter = document.createElement("button")
        filter.classList.add('filterBar__button');
        filter.innerText = "Tous"
        filter.id = 0,
        filter.addEventListener('click', e=>{
            handleFilterBtnClick(e,data)
        });
        filterBar.appendChild(filter)

        const categories = [];

        for (const object of data) {
            if (!categories.some(cat => cat.name === object.category.name)) {
                categories.push(object.category);
            }
        }
        console.log(categories)
        
        for(const category of categories){
            console.log(category.name)
            let filter = document.createElement("button");
            filter.classList.add('filterBar__button');
            filter.innerText = category.name;
            filter.id = category.id;
            filter.addEventListener('click', e=>{
                handleFilterBtnClick(e,data)
            });
            filterBar.appendChild(filter)
        }
    }
}

export default createFilterBar;