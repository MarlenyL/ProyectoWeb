ventana . onload  =  function () {
    var ayudabutton =  documento . querySelector ( " #ayuda " );
    var divayuda =  documento . querySelector ( " .help " );
    var lateral =  documento . querySelector ( " .fa-bars " );
    var addmenu =  documento . querySelector ( " #lateral " );
    var closeMenu =  documento . querySelector ( " .fa-times " );
    
    ayudabutton . addEventListener ( " click " , () => {
        divayuda . classList . alternar ( " mostrar " );
    });

    lateral . addEventListener ( " click " , () => {
        AgregarMenú . classList . alternar ( " menú " );
  
      });

    closeMenu . addEventListener ( " click " , () => {
        AgregarMenú . classList . alternar ( " menú " );
    })

}