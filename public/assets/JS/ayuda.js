window.onload = function(){
    var ayudabutton = document.querySelector("#ayuda");
    var divayuda= document.querySelector(".help");
    ayudabutton.addEventListener("click",()=>{
        divayuda.classList.toggle("mostrar");
    })
}