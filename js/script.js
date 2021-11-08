function promptNumber(message = "", integerOnly = false, positiveOnly = false){
    let value;
    let repeat;
    do {
        repeat = false;
        value = parseFloat(prompt(message));
        if(isNaN(value)){repeat = true;}
        else{
            if(integerOnly && !(Number.isInteger(value))){repeat = true;}
            if(positiveOnly && value<0){repeat = true;}
        }
    } while (repeat)
    return value;
}

function precioMetroLineal(){
    switch(inputForma){
        case '1': return 100*inputAnchoVarilla;
        case '2': return 150*inputAnchoVarilla;
        case '3': return 200*inputAnchoVarilla;
    }
}

function precioMetroCuadrado(){
    return (
    inputVidrio*2500 + 
    inputTapa*1500 + 
    inputEspejo*4400 + 
    inputPptBco*1300 + 
    inputPptCol*2000)
}

function mostrarResultado(){
    let resultado = `Presupuesto por marco medida ${inputAnchoMarco} por ${inputAltoMarco} con varilla `
    switch(inputForma){
        case '1':
            resultado = resultado + "plana";
            break;
        case '2':
            resultado = resultado + "bombé";
            break;
        case '3':
            resultado = resultado + "italiana";
            break;}
    resultado = resultado + ` de ${inputAnchoVarilla} cm.`;
    if(inputVidrio){resultado = resultado + ", con vidrio"};
    if(inputTapa){resultado = resultado + ", con tapa"};
    if(inputEspejo){resultado = resultado + ", con espejo"};
    if(inputPptBco){resultado = resultado + ", con paspartú blanco"};
    if(inputPptCol){resultado = resultado + ", con paspartú de color"};
    alert(resultado + `.\rEl precio final es de $ ${precioLineal+precioArea}`)
}

let inputAnchoMarco;
let inputAltoMarco;
let inputForma;
let inputAnchoVarilla;

inputAnchoMarco = promptNumber("Ingrese ancho del marco en centímetros",false,true);
inputAltoMarco = promptNumber("Ingrese alto del marco en centímetros",false,true);

do {inputForma = prompt("Ingrese forma de varilla\r1. Plana\r2. Bombé\r3. Italiana");}
while (inputForma != 1 && inputForma != 2 && inputForma != 3)
inputAnchoVarilla = promptNumber("Ingrese ancho de la varilla",true,true);

let inputVidrio = window.confirm("¿El marco lleva vidrio?");
let inputTapa = window.confirm("¿El marco lleva tapa?");
let inputEspejo = window.confirm("¿El marco lleva espejo?");
let inputPptBco = window.confirm("¿El marco lleva paspartú blanco?");
let inputPptCol = window.confirm("¿El marco lleva paspartú de color?");

let precioLineal = (inputAltoMarco + inputAnchoMarco)/50 * precioMetroLineal();
let precioArea = inputAltoMarco*inputAnchoMarco/10000 * precioMetroCuadrado();

mostrarResultado();