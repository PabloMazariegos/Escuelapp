const Update = (id)=>{

  var row = document.getElementsByName(id);
  var area = ''
  switch(row[3].innerText){
    case 'DOCENTE':
      area = '1'
    break;
    case 'CONTABILIDAD':
      area= '2'
    break;
    case 'LIMPIEZA':
      area= '3'
    break;
    case 'SEGURIDAD':
      area= '4'
    break;
  }

  var NOMBRE= document.getElementById('nombre')     
  var APELLIDO= document.getElementById('apellido') 
  var TELEFONO= document.getElementById('telefono') 
  var AREA= document.getElementById('area')         
  NOMBRE.value    =row[0].innerText;  
  APELLIDO.value  =row[1].innerText;
  TELEFONO .value =row[2].innerText;
  AREA.value      =area; 


  document.getElementById('btnSubmit').style.display="none"
  document.getElementById('btnUpdate').style.display="block"

  document.getElementById('btnUpdate').addEventListener('click', ()=>{
    window.location.href=`/personal/update/${NOMBRE.value}/${APELLIDO.value}/${TELEFONO.value}/${AREA.value}/${id}`
    document.getElementById('btnUpdate').style.display="none"
  });


  $('#exampleModal').modal('show')

}


document.getElementById('filtro').addEventListener('change', ()=>{
  var valor = document.getElementById('filtro').value;
  if(valor != 0){
    location.href=`/personal/filter/`+valor
  }else{
    location.href="/personal"
  }
})

document.getElementById('btnNuevo').addEventListener('click', ()=>{
  document.getElementById('btnUpdate').style.display="none"
})
