const patronTexto = new RegExp(/^[a-zA-Z\u00C0-\u017F\s]+$/);   
const numTelef = new RegExp(/^[0-9+]+$/); 

function validarNombre (nombre) {
    let res = false;
    if(nombre.length >= 4 && patronTexto.test(nombre)){
        res = true;
    }
    return res;
}

function validarTelefono(telefono){
    let res = false;
    if(telefono.length >= 7 && numTelef.test(telefono)){
        res = true;
    } 
    return res;
}