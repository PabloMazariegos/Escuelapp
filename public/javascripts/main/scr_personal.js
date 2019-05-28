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

  var NOMBRE= document.getElementById('nombre').value   =row[0].innerText;
  var APELLIDO= document.getElementById('apellido').value =row[1].innerText;
  var TELEFONO= document.getElementById('telefono').value =row[2].innerText;
  var AREA= document.getElementById('area').value     =area;

  document.getElementById('btnSubmit').removeAttribute('type');
  document.getElementById('btnSubmit').addEventListener('click', ()=>{
    location.href=`/personal/update/${NOMBRE}/${APELLIDO}/${TELEFONO}/${AREA}`
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
