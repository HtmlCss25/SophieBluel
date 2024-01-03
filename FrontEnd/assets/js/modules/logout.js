export default function logout(){

    if(sessionStorage.token){
        sessionStorage.removeItem("token")
        document.location.href="./index.html"
    }

}