window.onload = function() {
    var lateral = document.querySelector(".fa-bars");
    var addmenu = document.querySelector("#lateral");

    lateral.addEventListener("click",()=>{
      addmenu.classList.toggle("menu");

    })
  }