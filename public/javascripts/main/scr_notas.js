const Asignar = (id)=>{
  var row = document.getElementsByName(id);
  var flag = 0;

  
  var CARNE=      row[0].innerText;     
  var FECHA=      document.getElementById('Fecha') 
  var MATE=       document.getElementById('Matematica') 
  var CIENCIAS=   document.getElementById('Ciencias')
  var SOCIALES=   document.getElementById('Sociales')
  var LENGUAJE=   document.getElementById('Lenguaje')
  var PLASTICAS=  document.getElementById('plasticas')
  var INDUSTRIA=  document.getElementById('industriales')

  document.getElementById('btnSubmit').addEventListener('click', ()=>{
    location.href = 'notas/new/'+CARNE+'/'+MATE.value+'/'+CIENCIAS.value+'/'+SOCIALES.value+'/'+LENGUAJE.value+'/'+PLASTICAS.value+'/'+INDUSTRIA.value+'/'+FECHA.value.split('/').join('-')
  });

  $('#exampleModal').modal('show')
}

const Reporte = (id)=>{
  var row = document.getElementsByName(id);
  $.ajax({
    url: '/notasAJAX/'+id,
    method: 'POST',
    responseType: 'blob'
  }).done((data)=>{
    var mywindow = window.open('_blank', 'PRINT', 'height=800,width=600');

    mywindow.document.write('<html><head> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">');
    mywindow.document.write('</head><body style="margin-top:50px;"> ');
    mywindow.document.write('<div class="container">');
    mywindow.document.write('<div class="col-md-10">');
    mywindow.document.write('<h4>ALUMNO: '+row[1].innerText+' '+ row[2].innerText +'</h4>');
    mywindow.document.write('<h6>GRADO: '+row[3].innerText+'</h6>');
    mywindow.document.write('<h6>SECCION: '+row[4].innerText+'</h6>');
    mywindow.document.write('<h6>CARNÉ: '+row[0].innerText+'</h6>');
    mywindow.document.write(data);
    mywindow.document.write('</div></div></body></html>');

    mywindow.focus(); // necessary for IE >= 10*/

  })
}
