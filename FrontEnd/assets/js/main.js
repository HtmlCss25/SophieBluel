import getDataFromServer from "./modules/getDataFromServer.js";
import createFilterBar from "./modules/createFilterBar.js";
import { showAllCards } from "./modules/handleFilterBtnClick.js";
import {handleConnectionFormSubmit} from "./modules/handleConnectionFormSubmit.js";
import { editionModeHomepage } from "./modules/editionModeHomepage.js";
// createFilterBar()

document.addEventListener("DOMContentLoaded",()=>{
    
    editionModeHomepage()

    getDataFromServer()
        .then(response=>{
            createFilterBar(response)
            showAllCards(response)
        })
        
    handleConnectionFormSubmit()
})