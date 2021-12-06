var botonV = document.getElementById("botonVecId");
var botonW = document.getElementById("botonWaId");
var botonD = document.getElementById("botonDenti");
var dientes = document.getElementById("dientesId");

botonW.addEventListener("click", function(e)
{
    window.open("https://api.whatsapp.com/send?phone=+5215584151591&text=Hola!%20quiero%20saber%20más%20sobre%20el%20marketing%20con%20Realidad%20Aumentada");
});
botonV.addEventListener("click", function(e)
{
    window.open("https://www.vectorid.mx/");
});
botonD.addEventListener("click", function(e)
{
    window.open("https://www.dentimex.mx/?gclid=CjwKCAiAnsnjBRB6EiwATkM1XhXgfRnY_EIYEdie_fE1n3IWCwvs8lzXJC4kPxQieKrVuBqdtGDwpxoCsWUQAvD_BwE");
});
window.setTimeout(function(e)
{
    dientes.setAttribute("visible",true);
},15000);