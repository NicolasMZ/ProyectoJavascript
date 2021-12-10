// ==========================================================================
// CÓDIGO OBSOLETO DEBIDO A LA INCORPORACIÓN DE EVENTOS Y MANIPULACIÓN DE DOM
// ==========================================================================
//
// ====== Prompt con verificaciones para tomar solamente número entero ======
// function promptNumber(message = "", integerOnly = false, positiveOnly = false){
//     let value;
//     let repeat;
//     do {
//         repeat = false;
//         value = parseFloat(prompt(message));
//         if(isNaN(value)){repeat = true;}
//         else{
//             if(integerOnly && !(Number.isInteger(value))){repeat = true;}
//             if(positiveOnly && value<0){repeat = true;}
//         }
//     } while (repeat)
//     return value;
// }
//
// PROCESO OBSOLETO - EL CARGADO DE DATOS SERÍA A TRAVÉS DE LA INTERFAZ (NECESARIO EVENTOS)
//
// const marco1 = new marco(
// promptNumber("Ingrese ancho del marco en centímetros",false,true),
// promptNumber("Ingrese alto del marco en centímetros",false,true));
// marco1.conVidrio = window.confirm("¿El marco lleva vidrio?");
// marco1.conTapa = window.confirm("¿El marco lleva tapa?");
// marco1.conEspejo = window.confirm("¿El marco lleva espejo?");
// marco1.conPptBco = window.confirm("¿El marco lleva paspartú blanco?");
// marco1.conPptCol = window.confirm("¿El marco lleva paspartú de color?");
// do {marco1.formaVarilla = prompt("Ingrese forma de varilla\r1. Plana\r2. Bombé\r3. Italiana");}
// while (marco1.formaVarilla != 1 && marco1.formaVarilla != 2 && marco1.formaVarilla != 3)
// switch(marco1.formaVarilla){
//     case '1':
//         marco1.formaVarilla = "plana";
//         break;
//     case '2':
//         marco1.formaVarilla = "bombe";
//         break;
//     case '3':
//         marco1.formaVarilla = "italiana";
//         break;
// }
// //Verificar que el ancho de varilla esté en el listado de varillas
// let varillasSeleccionadas = varillas.filter(item => item[0] === marco1.formaVarilla);
// marco1.anchoVarilla = promptNumber("Ingrese ancho de la varilla",false,true);
// if(!varillasSeleccionadas.find(valor => valor[1]===marco1.anchoVarilla)) {
//     do {
//         marco1.anchoVarilla = promptNumber("La varilla seleccionada no está disponible en ese ancho. Ingrese nuevamente.",false,true);}
//     while (!varillasSeleccionadas.find(valor => valor[1]===marco1.anchoVarilla))
// }
// ==========================================================================


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
    constructor(){
        this.tipoMarco = "";
        this.anchoMarco = 0;
        this.altoMarco = 0;
        this.formaVarilla = 'plana';
        this.anchoVarilla = 1;
        this.precioVarilla = 0;
        this.conVidrio = false;
        this.conTapa = false;
        this.conEspejo = false;
        this.conPptBco = false;
        this.conPptCol = false;
        this.fecha = "";
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
        let precioLineal = (this.anchoMarco + this.altoMarco)/50 * this.precioVarilla;
        let precioArea = this.anchoMarco*this.altoMarco/10000 * this.precioMetroCuadrado();
        let precio = (precioLineal + precioArea).toFixed(2);

        let d = new Date();
        this.fecha = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

        let texto =
        "*********************<br>"+
        "PRESUPUESTO NO VALIDO<br>"+
        "COMO TICKET O FACTURA<br>"+
        `FECHA: ${this.fecha}<br>`+
        "*********************<br><br>"+
        `${this.tipoMarco} medida:<br>`+
        `${this.anchoMarco} x ${this.altoMarco} cm.<br><br>`+
        `Varilla: ${this.formaVarilla}<br>`+
        `Ancho: ${this.anchoVarilla} cm.<br><br>`;
        if(this.conVidrio){texto = texto + "&nbsp+ Vidrio<br>"};
        if(this.conTapa){texto = texto + "&nbsp+ Tapa<br>"};
        if(this.conEspejo){texto = texto + "&nbsp+ Espejo<br>"};
        if(this.conPptBco){texto = texto + "&nbsp+ Paspartu blanco<br>"};
        if(this.conPptCol){texto = texto + "&nbsp+ Paspartu de color<br>"};
        texto = texto +
        `<br>*********************<br>`+
        `<br><h5 class='text-end'>Total $ ${precio}&nbsp</h5>`

        $("#receipt:nth-child(1)").html(texto);
    }

    agregarLocalStorage(){
        // Guarda los ultimos 10 presupuestos
        let historial = JSON.parse(localStorage.getItem("Historial"));
        if(historial === null){
            historial = [];
        }
        while(historial.length > 9){
            historial.shift();
        }
        historial.push(this);
        localStorage.setItem("Historial", JSON.stringify(historial));
    }
}

//========== Main app ==========

//-----Cargado de tipos de varillas - Se tomarían desde una base de datos
let varillas = [];
varillas.push(["Plana",1,       390]);
varillas.push(["Plana",1.5,     390]);
varillas.push(["Plana",2,       500]);
varillas.push(["Plana",3,       590]);
varillas.push(["Plana",4,       650]);
varillas.push(["Plana",4.5,     800]);
varillas.push(["Plana",6,       1140]);
varillas.push(["Plana",10,      2030]);
varillas.push(["Bombe",1,       390]);
varillas.push(["Bombe",1.5,     390]);
varillas.push(["Bombe",2,       500]);
varillas.push(["Bombe",3,       790]);
varillas.push(["Bombe",4,       950]);
varillas.push(["Bombe",6,       1250]);
varillas.push(["Italiana",2,    540]);
varillas.push(["Italiana",3,    800]);
varillas.push(["Italiana",4,    1160]);
varillas.push(["Italiana",4.5,  1160]);
varillas.push(["Italiana",5.5,  1255]);
varillas.push(["Italiana",6,    1454]);
varillas.push(["Italiana",7,    1521]);

//-----Cargado de formas de varilla para el usuario-----
let formasVarilla = [];
formasVarilla[0]=varillas[0][0];
for(let i = 1; i < varillas.length; i++){
    if(!(formasVarilla.find(valor => valor === varillas[i][0]))){
        formasVarilla.push(varillas[i][0]);
    }
}
for(let varilla of formasVarilla){
    $(".input-forma span").append(`
        <button class='btn btn-primary m-1 b_formaVarilla'>${varilla}</button>`);
}

//-----Selector de tipo de marco-----
let input_tipoMarco = "";
$("#b-espejo").click( () => {
    $("#b-espejo").addClass("active");
    $("#b-espejo").removeClass("invalid");
    $("#b-enmarcado").removeClass("active invalid");
    input_tipoMarco = "Espejo";
})
$("#b-enmarcado").click( () => {
    $("#b-enmarcado").addClass("active");
    $("#b-enmarcado").removeClass("invalid");
    $("#b-espejo").removeClass("active invalid");
    input_tipoMarco = "Enmarcado";
})

//-----Selector de forma de varilla-----
let input_formaVarilla = "";
$("#span-formasVarilla").click( (e) => {
    //Si tocó correctamente un botón...
    if(e.target.innerHTML[0]!=="<"){
    // ...limpiar el seleccionado previamente...
        $(".b_formaVarilla").each( (i, varilla) => {
            $(varilla).removeClass("active invalid");
            input_formaVarilla = "";
        })
    // ...y seleccionar según target.
        $(e.target).addClass("active");
        input_formaVarilla = $(e.target).html();
    };
    // Luego mostrar los anchos disponibles según selección:
    // Obtener los anchos a mostrar, ...
    input_anchoVarilla = "";
    let anchos = [];
    for(let i = 0; i<varillas.length ; i++){
        if(varillas[i][0]==input_formaVarilla){
            anchos.push(varillas[i][1]);}
    }
    // ...borrar los botones anteriores si los hubiere...
    $(".b_anchoVarilla").remove();
    // ...y finalmente añadir los botones nuevos.
    for(let ancho of anchos){
        $("#span-anchosVarilla").append(`
            <button class='btn btn-primary m-1 b_anchoVarilla'>${ancho}</button>`);
    }
});

//-----Selector de ancho de varilla-----
let input_anchoVarilla = "";
$("#span-anchosVarilla").click( (e) => {
    //Si tocó correctamente un botón...
    if(e.target.html!=="<"){
    // ...limpiar el seleccionado previamente...
        $(".b_anchoVarilla").each( (index,element) => {
            $(element).removeClass("active invalid");
            input_anchoVarilla = "";
        })
    // ...y seleccionar según target.
        $(e.target).addClass("active");
        input_anchoVarilla = e.target.innerHTML;
    };
})

//-----Input de ancho y alto de marco-----
let input_anchoMarco = "";
let input_altoMarco = "";
$(".input-medida input").change( (e) => {
    $(e.target).removeClass("invalid");
})

//-----Calculo de precio-----
$("#btn-calcular").click( () => {
    input_anchoMarco = parseFloat($("#input_anchoMarco").val());
    input_altoMarco = parseFloat($("#input_altoMarco").val());
    // Si todos los inputs tienen valor, calcular precio.
    if(input_anchoMarco && input_altoMarco && input_formaVarilla && input_anchoVarilla && input_tipoMarco){
        let marco1 = new marco();
        marco1.tipoMarco = input_tipoMarco;
        marco1.altoMarco = input_altoMarco;
        marco1.anchoMarco = input_anchoMarco;
        marco1.anchoVarilla = input_anchoVarilla;
        marco1.formaVarilla = input_formaVarilla;
        marco1.precioVarilla = varillas.find(valor => valor[0] == input_formaVarilla && valor[1] == input_anchoVarilla)[2];
        switch(input_tipoMarco){
            case 'Enmarcado':
                marco1.conTapa = true;
                marco1.conVidrio = true;
                break;
            case 'Espejo':
                marco1.conTapa = true;
                marco1.conEspejo = true;
                break;
        }

        marco1.mostrarPrecio();
        marco1.agregarLocalStorage();
    } 
    else { // Sino, mostrar donde hay error
        if(input_tipoMarco === ""){
            $(".b_tipoMarco").each((i,e)=>{
                $(e).addClass("invalid");
            })
        }
        if(isNaN(input_anchoMarco) || input_anchoMarco <= 0){
            $("#input_anchoMarco").addClass("invalid");
        }
        if(isNaN(input_altoMarco) || input_altoMarco <= 0){
            $("#input_altoMarco").addClass("invalid");
        }
        if(input_formaVarilla === ""){
            
            $(".b_formaVarilla").each((i,e)=>{
                $(e).addClass("invalid");
            })
        }
        if(input_anchoVarilla === ""){
            $(".b_anchoVarilla").each((i,e)=>{
                $(e).addClass("invalid");
            })
        }
    }
});