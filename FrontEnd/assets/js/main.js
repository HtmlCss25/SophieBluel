import getDataFromServer from "./modules/getDataFromServer.js";
import createFilterBar from "./modules/createFilterBar.js";
import { showAllCards } from "./modules/handleFilterBtnClick.js";
import {handleConnectionFormSubmit} from "./modules/handleConnectionFormSubmit.js";
// createFilterBar()

document.addEventListener("DOMContentLoaded",()=>{
    

    getDataFromServer()
        .then(response=>{
            createFilterBar(response)
            showAllCards(response)
        })
        
    handleConnectionFormSubmit()
    
})