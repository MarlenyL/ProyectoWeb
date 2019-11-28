
  function addRow(descripcion,fecha,no,monto,real, tbody){
    var newRow = document.createElement("tr");
    newRow.className="transaccion";
    newRow.innerHTML = 
            `<td><p>${descripcion}</p></td>
            <td class="major"><p>${fecha}</p></td>
            <td class="major"><p>${no}</p></td>
            <td>
              <p>$${monto}</p>
              <p>$${real+monto}</p>
            </td> `;


    var cellContainer = document.createElement("td");
    var cellContainer2 = document.createElement("td");

    newRow.appendChild(cellContainer);
    newRow.appendChild(cellContainer2);
    tbody.appendChild(newRow);

  }

  expand() {
    
    this.element.addEventListener("submit", (e) => {
        console.log("Capturin Form Submit of ", this.element);
        e.preventDefault();
        this.cleanErrors();

        var validate = this.validate("Invalid Username. You only can use words", validUser, this.element.username);
        validate = this.validate("The Password need ...", strongPassword, this.element.password) && validate;

        if (validate)
            this.element.subm
            it();
    });
}

  window.onload = function() {
    var tbody = document.querySelector("#table_body");
    console.log("Abre esta madre");
        
    addRow("Compra: Libreria Uca", "15/nov", 12563, -2.25, 14.00, tbody);


      
  };