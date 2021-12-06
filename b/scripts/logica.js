var botonV = document.getElementById("botonVecId");
var botonW = document.getElementById("botonWaId");
var a = document.getElementById("aid");


console.log("inicia")
botonW.addEventListener("click", function(e)
{
    window.open("https://api.whatsapp.com/send?phone=+5215544602389&text=Hola!%20quiero%20saber%20más%20sobre%20Realidad%20Aumentada%20Web");
});
botonV.addEventListener("click", function(e)
{
    window.open("fb://page/299366750897285");
});
window.setTimeout(function(e)
{
    console.log("triger")
},5500);

