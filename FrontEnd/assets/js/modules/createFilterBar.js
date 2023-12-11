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
        
        for(const category of data.categories){
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