
window.onload = function(){
    var ayudabutton = document.querySelector("#ayuda");
    var divayuda= document.querySelector(".help");
    var lateral = document.querySelector(".fa-bars");
    var addmenu = document.querySelector("#lateral");
    var closeMenu = document.querySelector(".fa-times");
    
    ayudabutton.addEventListener("click",()=>{
        divayuda.classList.toggle("mostrar");
        console.log("Entra")
    });

    lateral.addEventListener("click",()=>{
        addmenu.classList.toggle("menu");
        addmenu.classList.toggle("fadeInLeftBig")
      });

    closeMenu.addEventListener("click", ()=>{
        addmenu.classList.toggle("menu");
        addmenu.classList.toggle("fadeInLeftBig")
    })

}