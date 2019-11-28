window.onload = function(){
    var ayudabutton = document.querySelector("#ayuda");
    var divayuda= document.querySelector(".help");
    var lateral = document.querySelector(".fa-bars");
    var addmenu = document.querySelector("#lateral");
    var closeMenu = document.querySelector(".fa-times");
    
    ayudabutton.addEventListener("click",()=>{
        divayuda.classList.toggle("mostrar");
    });

    lateral.addEventListener("click",()=>{
        addmenu.classList.toggle("menu");
  
      });

    closeMenu.addEventListener("click", ()=>{
        addmenu.classList.toggle("menu");
    })

}