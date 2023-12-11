const db = "http://localhost:5678/api/";
const path = "users/login"

export function log(formData){

    let response;

    return fetch(db+path,{
        method:'POST',
        headers:{
            "content-Type":"application/json"
        },
        body: formData
    })
        .then(r=>{
            if(!r.ok){
                throw new Error("login error : "+r.status);
            }

            return r.json();
        })
        .then(data=>{

            return data;

        })
        .catch(error=>{

            console.error("login error : "+error);
            return error

        })
}
