const Asistencia = (id)=>{
  var row = document.getElementsByName(id);

  var FECHA=    document.getElementById('fecha') 
  var curso=    document.getElementById('curso')   

  document.getElementById('btnSubmit').addEventListener('click', ()=>{
    location.href = 'asistencia/new/'+FECHA.value.split('/').join('-')+'/'+row[0].innerText + '/'+ curso.value;
  });

  $('#exampleModal').modal('show')
}

const Reporte = ()=>{
  var grd= document.getElementById('inGrado').value
  if(grd ==""){
    alert('INGRESE GRADO PARA PODER GENERAR REPORTE')
  }else{
    $.ajax({
      url: 'notasAJAX/Asistencias/'+grd,
      method: 'POST',
      responseType: 'blob'
    }).done((data)=>{
      var mywindow = window.open('_blank', 'PRINT', 'height=800,width=600');
  
      mywindow.document.write('<html><head> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">');
      mywindow.document.write('</head><body style="margin-top:50px;"> ');
      mywindow.document.write('<div class="container">');
      mywindow.document.write('<div class="col-md-10">');
      mywindow.document.write('<h4>REPORTE DE ASISTENCIA</h4>');
      mywindow.document.write('<h6>GRADO: '+grd+'</h6>');
      mywindow.document.write(data);
      mywindow.document.write('</div></div></body></html>');
  
      mywindow.focus(); // necessary for IE >= 10*/
  
    })
  }
}