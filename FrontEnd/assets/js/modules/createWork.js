const db = "http://localhost:5678/api/";
const path = "/works"

function createWork(formData,token){

    let response;
    fetch(db+path,{
        method:'POST',
        headers:{
            'Authorization': 'Bearer ' + token,
            "content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(r=>{

            if(!r.ok){
                throw new Error("failed to add a new work, error : "+r.status);
            }

            return r.json();
        })
        .then(data=>{

            response = data;

        })
        .catch(error=>{

            console.error("failed to add a new work, error : "+error);

        })

        return response
}

export default createWork;