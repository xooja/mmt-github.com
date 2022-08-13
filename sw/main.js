if("serviceWorker" in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker
            .register("../offline_service.js")
            .then(e=>{console.log("Service : Registered")})
            .catch(err => console.error(err));
    })
}else{
    notify("Your browser not supperted offline app version please update or change the browser");
}