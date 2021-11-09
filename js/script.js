//====== Prompt con verificaciones para tomar solamente número entero ======
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

//====== Función para ordenar el listado de varillas ======
function ordenarVarillas(indexCampo, ascendente=true){
    //Revisar el tipo de dato del primer elemento en el campo suministrado por parámetro, para ordenar correctamente
    switch(typeof(varillas[0][indexCampo])){
        case 'number':
            if(ascendente){
                varillas.sort((item1,item2) => item1[indexCampo] - item2[indexCampo]);
            } else {
                varillas.sort((item1,item2) => item2[indexCampo] - item1[indexCampo]);
            }
            console.table(varillas);
            break;
        case 'string':
            varillas.sort(function (item1,item2) {
                let string1 = item1[indexCampo].toUpperCase();
                let string2 = item2[indexCampo].toUpperCase();
                if(ascendente){
                    if(string1 < string2){
                        return -1;
                    }
                    if(string1 > string2){
                        return 1;
                    }
                } else {
                    if(string1 < string2){
                        return 1;
                    }
                    if(string1 > string2){
                        return -1;
                    }
                }
                return 0;
            });
            console.table(varillas);
            break;
        default:
            alert("El campo no existe, o el tipo de datos no es válido.");
            break;
    }
}

//====== Clase para el cálculo de marcos ======
class marco {
    constructor(ancho,alto){
        this.anchoMarco = ancho;
        this.altoMarco = alto;
        this.formaVarilla = 'plana';
        this.anchoVarilla = 1;
        this.conVidrio = false;
        this.conTapa = false;
        this.conEspejo = false;
        this.conPptBco = false;
        this.conPptCol = false;
    }

    precioMetroLineal(){
        switch(this.formaVarilla){
            case 'plana': return 100*this.anchoVarilla;
            case 'bombe': return 150*this.anchoVarilla;
            case 'italiana': return 200*this.anchoVarilla;
        }
    }
    
    precioMetroCuadrado(){
        return (
        this.conVidrio*2500 + 
        this.conTapa*1500 + 
        this.conEspejo*4400 + 
        this.conPptBco*1300 + 
        this.conPptCol*2000)
    }
    
    mostrarPrecio(){
        let resultado = `Presupuesto por marco medida ${this.anchoMarco} por ${this.altoMarco} con varilla ${this.formaVarilla} de ${this.anchoVarilla} cm.`
        if(this.conVidrio){resultado = resultado + ", con vidrio"};
        if(this.conTapa){resultado = resultado + ", con tapa"};
        if(this.conEspejo){resultado = resultado + ", con espejo"};
        if(this.conPptBco){resultado = resultado + ", con paspartú blanco"};
        if(this.conPptCol){resultado = resultado + ", con paspartú de color"};

        let precioLineal = (this.anchoMarco + this.altoMarco)/50 * this.precioMetroLineal();
        let precioArea = this.anchoMarco*this.altoMarco/10000 * this.precioMetroCuadrado();

        alert(`${resultado}.\r\rEl precio final es de $ ${precioLineal + precioArea}`)
    }
}

//====== Main app ======

//Cargado de tipos de varillas - Se tomarían desde una base de datos
let varillas = [];
varillas.push(["plana",1]);
varillas.push(["plana",1.5]);
varillas.push(["plana",2]);
varillas.push(["plana",3]);
varillas.push(["plana",4]);
varillas.push(["plana",4.5]);
varillas.push(["plana",6]);
varillas.push(["plana",10]);
varillas.push(["bombe",1]);
varillas.push(["bombe",1.5]);
varillas.push(["bombe",2]);
varillas.push(["bombe",3]);
varillas.push(["bombe",4]);
varillas.push(["bombe",6]);
varillas.push(["italiana",2]);
varillas.push(["italiana",3]);
varillas.push(["italiana",4]);
varillas.push(["italiana",4.5]);
varillas.push(["italiana",5.5]);
varillas.push(["italiana",6]);
varillas.push(["italiana",7]);

//Nuevo marco e inicialización de propiedades
const marco1 = new marco(
promptNumber("Ingrese ancho del marco en centímetros",false,true),
promptNumber("Ingrese alto del marco en centímetros",false,true));
marco1.conVidrio = window.confirm("¿El marco lleva vidrio?");
marco1.conTapa = window.confirm("¿El marco lleva tapa?");
marco1.conEspejo = window.confirm("¿El marco lleva espejo?");
marco1.conPptBco = window.confirm("¿El marco lleva paspartú blanco?");
marco1.conPptCol = window.confirm("¿El marco lleva paspartú de color?");
do {marco1.formaVarilla = prompt("Ingrese forma de varilla\r1. Plana\r2. Bombé\r3. Italiana");}
while (marco1.formaVarilla != 1 && marco1.formaVarilla != 2 && marco1.formaVarilla != 3)
switch(marco1.formaVarilla){
    case '1':
        marco1.formaVarilla = "plana";
        break;
    case '2':
        marco1.formaVarilla = "bombe";
        break;
    case '3':
        marco1.formaVarilla = "italiana";
        break;
}
//Verificar que el ancho de varilla esté en el listado de varillas
let varillasSeleccionadas = varillas.filter(item => item[0] === marco1.formaVarilla);
marco1.anchoVarilla = promptNumber("Ingrese ancho de la varilla",false,true);
if(!varillasSeleccionadas.find(valor => valor[1]===marco1.anchoVarilla)) {
    do {
        marco1.anchoVarilla = promptNumber("La varilla seleccionada no está disponible en ese ancho. Ingrese nuevamente.",false,true);}
    while (!varillasSeleccionadas.find(valor => valor[1]===marco1.anchoVarilla))
}

//Cálculo de precio
marco1.mostrarPrecio();
ordenarVarillas(0,true);
ordenarVarillas(0,false);
ordenarVarillas(1,true);
ordenarVarillas(1,false);