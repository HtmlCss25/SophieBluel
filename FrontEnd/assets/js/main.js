import getWorks from "./modules/getWorks.js";
import createFilterBar from "./modules/createFilterBar.js";
import getCategories from "./modules/getCategories.js";
import { showAllCards } from "./modules/handleFilterBtnClick.js";
import {handleConnectionFormSubmit} from "./modules/handleConnectionFormSubmit.js";
import { editionModeHomepage } from "./modules/editionModeHomepage.js";
// createFilterBar()

document.addEventListener("DOMContentLoaded",()=>{
    

    // getDataFromServer()
    //     .then(response=>{
    //         createFilterBar(response)
    //         showAllCards(response)
    //         editionModeHomepage(response)
    //     })

    getWorks()
        .then(r=>{
            createFilterBar(r)
            showAllCards(r)
            editionModeHomepage(r)
        })
        
    handleConnectionFormSubmit()
})