function myFunction() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
 }

  window.onload = function() {
    var tbody = document.querySelector("#table_body");
    console.log("Abre esta madre");
        
    addRow("Compra: Libreria Uca", "15/nov", 12563, -2.25, 14.00, tbody);


      
  };