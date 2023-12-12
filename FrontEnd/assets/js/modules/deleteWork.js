const db = "http://localhost:5678/api/";
const path = "works/"

let promises = []

function deleteWork(workId,token){

    let response;
    fetch(db+path+workId,{
        method:'DELETE',
        headers:{
            'Authorization': 'Bearer ' + token,
            "content-Type":"application/json"
        }
    })
        .then(r=>{

            if(!r.ok){
                throw new Error("failed to remove a new work, error : "+r.status);
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

export default deleteWork;