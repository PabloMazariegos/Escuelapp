/*
-----------------------------------------
  establecer focus en input usuario
-----------------------------------------
*/

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('username').focus();
})





/*
-----------------------------------------
  Mostrar texto de contraseña en login
-----------------------------------------
*/      

var btneye      = document.getElementById('button-addon2');
var pwdinput    = document.getElementById('pwdinput');
var eye         = document.getElementById('password-eye') ;   
var aux = 2;
btneye.addEventListener('click', ()=>{
  if(aux % 2 == 0){
    pwdinput.removeAttribute("type");
    pwdinput.setAttribute("type","text");
    btneye.style.color="black";
  }else{
    pwdinput.removeAttribute("type");
    pwdinput.setAttribute("type","password")
    btneye.style.color="#ced4da";
  }
  aux++;
});

