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
            case 'bombé': return 150*this.anchoVarilla;
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

//Nuevo marco e inicialización de propiedades
const marco1 = new marco(
promptNumber("Ingrese ancho del marco en centímetros",false,true),
promptNumber("Ingrese alto del marco en centímetros",false,true));

do {marco1.formaVarilla = prompt("Ingrese forma de varilla\r1. Plana\r2. Bombé\r3. Italiana");}
while (marco1.formaVarilla != 1 && marco1.formaVarilla != 2 && marco1.formaVarilla != 3)
switch(marco1.formaVarilla){
    case '1':
        marco1.formaVarilla = "plana";
        break;
    case '2':
        marco1.formaVarilla = "bombé";
        break;
    case '3':
        marco1.formaVarilla = "italiana";
        break;
}

marco1.anchoVarilla = promptNumber("Ingrese ancho de la varilla",true,true);
marco1.conVidrio = window.confirm("¿El marco lleva vidrio?");
marco1.conTapa = window.confirm("¿El marco lleva tapa?");
marco1.conEspejo = window.confirm("¿El marco lleva espejo?");
marco1.conPptBco = window.confirm("¿El marco lleva paspartú blanco?");
marco1.conPptCol = window.confirm("¿El marco lleva paspartú de color?");

//Cálculo de precio
marco1.mostrarPrecio();