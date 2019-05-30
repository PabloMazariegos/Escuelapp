

const Update = (id)=>{
  var row = document.getElementsByName(id);

  var CARNE=    document.getElementById('carne')     
  var NOMBRE=   document.getElementById('Nombre') 
  var APELLIDO= document.getElementById('Apellido') 
  var PADRE=    document.getElementById('Padre')
  var TELEFONO= document.getElementById('Telefono')
  var FECHA=    document.getElementById('Fecha')

  CARNE   .value= row[0].innerText;    
  NOMBRE  .value= row[1].innerText;  
  APELLIDO.value= row[2].innerText;
  PADRE   .value= row[3].innerText;
  TELEFONO.value= row[4].innerText;
  FECHA   .value= row[5].innerText;
  var fechaGuion = FECHA.value;
  

  document.getElementById('btnSubmit').addEventListener('click', ()=>{
    window.location.href=`/alumnos/update/${CARNE.value}/${NOMBRE.value}/${APELLIDO.value}/${PADRE.value}/${TELEFONO.value}/${FECHA.value.split('/').join('-')}`
  });

  $('#exampleModal').modal('show')
}

const Asignar = (id)=>{
  var row = document.getElementsByName(id);

  var CARNE=    document.getElementById('carne')     
  var NOMBRE=   document.getElementById('Nombre') 
  var APELLIDO= document.getElementById('Apellido') 
  var GRADO=    document.getElementById('Grado')

  CARNE   .value= row[0].innerText;    
  NOMBRE  .value= row[1].innerText;  
  APELLIDO.value= row[2].innerText;
  switch(row[3].innerText){
    case 'PRIMERO':
      GRADO   .value= "1";
    break;
    case 'SEGUND':
      GRADO   .value= "2";
    break;
    case 'TERCERO':
      GRADO   .value= "3";
    break;
    case 'CUARTO':
      GRADO   .value= "4";
    break;
    case 'QUINTO':
      GRADO   .value= "5";
    break;
    case 'SEXTO':
      GRADO   .value= "6";
    break;

  }
  

  document.getElementById('btnSubmit').addEventListener('click', ()=>{
    window.location.href=`/alumnos/asignacion/new/${CARNE.value}/${NOMBRE.value}/${APELLIDO.value}/${PADRE.value}/${TELEFONO.value}/${FECHA.value.split('/').join('-')}`
  });

  $('#exampleModal').modal('show')
}
