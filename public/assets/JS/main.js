window.onload = function() {
    console.log("Abre esta madre");
    var transacciones = document.getElementById("transacciones_b");
  
    transacciones.addEventListener("click", redirect);
  
    function redirect() {
      console.log("click");
    }
  };
  