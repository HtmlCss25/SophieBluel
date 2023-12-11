const db = "http://localhost:5678/api/";
const path = "/users/login"

function log(formData){

    let response;

    fetch(db+path,{
        method:'POST',
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(r=>{

            if(!r.ok){
                throw new Error("login error : "+r.status);
            }

            return r.json();
        })
        .then(data=>{

            response = data;

        })
        .catch(error=>{

            console.error("login error : "+error);

        })

        return response
}