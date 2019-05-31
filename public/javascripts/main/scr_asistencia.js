const Asistencia = (id)=>{
  var row = document.getElementsByName(id);

  var FECHA=    document.getElementById('fecha')     

  document.getElementById('btnSubmit').addEventListener('click', ()=>{
    location.href = 'asistencia/new/'+FECHA.value.split('/').join('-')+'/'+row[0].innerText;
  });

  $('#exampleModal').modal('show')
}
