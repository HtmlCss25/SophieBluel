import {log} from "./log.js";



export function handleConnectionFormSubmit(){

    const mailInput = document.querySelector('#mailInput');
    const passwordInput = document.querySelector('#passwordInput');
    const form = document.querySelector(".login-section__form")
    const submitBtn = document.querySelector("#login-section__submit-btn");

    submitBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        const data = {
            "email": mailInput.value,
            "password": passwordInput.value
        }
        const json = JSON.stringify(data)
        log(json)
            .then(data=>{

                 //clearing error message if it exists
                 const existingErrorMessage = document.querySelector(".error-message")
                 if(existingErrorMessage){
                     form.removeChild(existingErrorMessage)
                 }

                 if(mailInput.classList.contains('input-error') && passwordInput.classList.contains('input-error')){
                     mailInput.classList.remove('input-error')
                     passwordInput.classList.remove('input-error')
                 }

                if(data.message){
                   

                    //adding classes on inputs
                    mailInput.classList.add('input-error')
                    passwordInput.classList.add('input-error')

                    //creating an error message
                    const errorMessage = document.createElement('p')
                    errorMessage.innerText = "Identifiants incorrects"
                    errorMessage.classList.add('error-message')
                    form.insertBefore(errorMessage,submitBtn)
                }
                else if(data){
                    sessionStorage.setItem("token", data.token)
                    window.location.href = "./index.html"
                }
            })
            .catch(error=>{
                console.log(error)
            })
    })


}


