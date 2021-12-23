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


// =============================== FUNCIONES ================================
// ----- Función para ordenar el listado de varillas -----
function ordenarVarillas(indexCampo, ascendente=true){
    //Revisar el tipo de dato del primer elemento en el campo suministrado por parámetro, para ordenar correctamente
    switch(typeof(varillas[0][indexCampo])){
        case 'number':
            if(ascendente){
                varillas.sort((item1,item2) => item1[indexCampo] - item2[indexCampo]);
            } else {
                varillas.sort((item1,item2) => item2[indexCampo] - item1[indexCampo]);
            }
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
            break;
        default:
            alert("El campo no existe, o el tipo de datos no es válido.");
            break;
    }
};

// ----- Función para mostrar mensaje modal -----
function mensajeModal(mensaje){
    $(".modal-body h6").html(mensaje);
    $("#exampleModal").modal("show");
};
$("#btn-cerrar").click( () => {
    $("#exampleModal").modal("hide");
});

// ====================== CLASE PARA CÁLCULO DE MARCOS=======================
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

// =============================== MAIN APP =================================

// ----- Cargado de tipos de varillas - Se tomarían desde una base de datos -----
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
ordenarVarillas(1,true);
ordenarVarillas(0,true);

// ----- Cargado de formas de varilla para el usuario -----
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

// ----- Selector de tipo de marco -----
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

// ----- Selector de forma de varilla -----
let input_formaVarilla = "";
$("#span-formasVarilla").click( (e) => {
    //Si tocó correctamente un botón...
    if(e.target.children.length==0){
    // ...limpiar el seleccionado previamente...
        $(".b_formaVarilla").each( (i, varilla) => {
            $(varilla).removeClass("active invalid");
            input_formaVarilla = "";
        })
        // ...y seleccionar según target.
        $(e.target).addClass("active");
        input_formaVarilla = $(e.target).html();
        // Luego mostrar los anchos disponibles según selección:
        // Obtener los anchos a mostrar, ...
        input_anchoVarilla = "";
        let anchos = [];
        for(let i = 0; i<varillas.length ; i++){
            if(varillas[i][0]==input_formaVarilla){
                anchos.push(varillas[i][1]);}
        }
        // ...borrar los botones anteriores si los hubiere...
        $("#anchosVarilla").animate({opacity: 0},200, () => {
            $(".b_anchoVarilla").remove();
            // ...y finalmente añadir los botones nuevos.
            for(let ancho of anchos){
                $("#anchosVarilla").append(`
                    <button class='btn btn-primary m-1 b_anchoVarilla'>${ancho}</button>`);
            }
            $("#anchosVarilla").animate({opacity: 1},200)
        })
    };
});

// ----- Selector de ancho de varilla -----
let input_anchoVarilla = "";
$("#anchosVarilla").click( (e) => {
    // Si tocó correctamente un botón...
    if(!isNaN(e.target.innerHTML)){
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

// ----- Input de ancho y alto de marco -----
let input_anchoMarco = "";
let input_altoMarco = "";
$(".input-medida input").change( (e) => {
    $(e.target).removeClass("invalid");
})

// ----- Calculo de precio -----
$("#btn-calcular").click( () => {
    // Ocultar el recibo si ya hay uno
    inicializacion();

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
        // Armar el recibo, cargar al historial y animar.
        marco1.mostrarPrecio();
        marco1.agregarLocalStorage();
        animarTicket();
        
    } else { // Sino, mostrar donde hay error
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

// ----- Animaciones -----

$("#btn-comenzar").click(()=>{
    $("html").animate({
        scrollTop: $("main").offset().top
    },0)
});

$("#btn-contacto").click(()=>{
    $("html").animate({
        scrollTop: $("#contactForm").offset().top
    },0)
});

$("#btn-nuevo").click(()=>{
    $("html").animate( {scrollTop: $("main").offset().top} , 0 , ()=>{
        $("#input_anchoMarco").val("");
        $("#input_altoMarco").val("");
        $("main section button").removeClass("active");
        input_tipoMarco = "";
        input_anchoMarco = "";
        input_altoMarco = "";
        input_formaVarilla = "";
        input_anchoVarilla = "";
        $("#anchosVarilla").animate({opacity: 0},200, () => {
            $(".b_anchoVarilla").remove();
        });
        $("#buttons").hide(200,()=>{
            $("#receipt").slideUp(800,()=>{
                inicializacion();
            });
        });
    });
});

function animarTicket(){
    $("#results").css({
        "display": "",
        "min-height": "100vh"
    });
    $("html").animate( {scrollTop: $("#results").offset().top,} , 0 , ()=>{
        $("#buttons").css("display", "flex");
        $("#buttons").css("opacity", "0");

        $("#results").append(`<img id="img-calc1" class="position-absolute" style="display: none;" src="./assets/img/IconMath1.png">`);
        $("#results").append(`<img id="img-calc2" class="position-absolute" style="display: none;" src="./assets/img/IconMath2.png">`);
        $("#results").append(`<img id="img-calc3" class="position-absolute" style="display: none;" src="./assets/img/IconMath3.png">`);
        $("#results").append(`<img id="img-calc4" class="position-absolute" style="display: none;" src="./assets/img/IconMath4.png">`);
        $("#results").append(`<img id="img-calc5" class="position-absolute" style="display: none;" src="./assets/img/IconMath5.png">`);
        
        $("#img-calc1").delay(300).show(0).delay(300).hide(0);
        $("#img-calc2").delay(600).show(0).delay(300).hide(0);
        $("#img-calc3").delay(900).show(0).delay(300).hide(0);
        $("#img-calc4").delay(1200).show(0).delay(300).hide(0);
        $("#img-calc5").delay(1500).show(0).delay(1200).hide(200);
        
        $("#receipt").delay(2700).slideDown(1000,()=>{
            $("#img-calc1").remove();
            $("#img-calc2").remove();
            $("#img-calc3").remove();
            $("#img-calc4").remove();
            $("#img-calc5").remove();
            $("#buttons").delay(700).fadeTo(1000,1);
        });
    })
}

// ----- Al cargar la página -----
$(document).ready(inicializacion());

function inicializacion() {
    $("#receipt").css("display", "none");
    $("#buttons").css("display", "none");

    // Esconder aside de resultados si se está en mobile para evitar espacio en blanco
    if($(window).width()<768){
        $("#results").css({
            "display": "none",
            "min-height": 0
        });
    }
}

// ----- Botón de enviar formulario -----
$("#btn-enviar").click((e)=>{
    e.preventDefault();
    validateForm();
});

// Verificación con API email-validator.net
function validateForm(){
    $.ajax({
        url: 'https://api.email-validator.net/api/verify',
        type: 'POST',
        cache: false,
        crossDomain: true,
        data: { EmailAddress: $("#input-correo").val(), APIKey: 'ev-069a63331b994bd545ac7cad9d9d650b' },
        dataType: 'json',
        resultado: false,
        success: function (json){
            if(json.status != 200 && json.status != 207 && json.status != 215){
                $("#input-correo").addClass("is-invalid");   
            } else {
                $("#input-correo").removeClass("is-invalid");
            }
            if($("#input-nombre").val() == ""){
                $("#input-nombre").addClass("is-invalid");
            } else {
                $("#input-nombre").removeClass("is-invalid");
            }
            
            let aux = $("#input-telefono").val().replace(/ /g,"");
            aux = aux.replace(/-/g,"");
            if(aux!="" && (aux.length<6 || aux.length>10)){
                $("#input-telefono").addClass("is-invalid");
            } else {
                $("#input-telefono").removeClass("is-invalid");
            }
        
            if($("#input-mensaje").val() == ""){
                $("#input-mensaje").addClass("is-invalid");
            } else {
                $("#input-mensaje").removeClass("is-invalid");
            }
        },
    })
};

$(document).ajaxComplete((event,xhr,settings) => {
    if(settings.url == 'https://api.email-validator.net/api/verify'){
        let datos = {
            nombre: $("#input-nombre").val(),
            correo: $("#input-correo").val(),
            telefono: $("#input-telefono").val(),
            presupuesto: $("#input-presupuesto").val(),
            mensaje: $("#input-mensaje").val(),
        };
        if(!($("#input-nombre").hasClass("is-invalid") ||
            $("#input-correo").hasClass("is-invalid") ||
            $("#input-telefono").hasClass("is-invalid") ||
            $("#input-mensaje").hasClass("is-invalid"))){
            $.ajax({
                type: "POST",
                url: "https://api.npoint.io/604b4990e3d40e2ec68e",
                data: JSON.stringify(datos),
                dataType: "json",
                success: function (response) {
                    mensajeModal("El formulario se envió correctamente.<br><br> ¡Nos comunicaremos con vos a la brevedad!")
                },
                error: function (response) {
                    mensajeModal(`Hubo un problema al enviar el formulario.<br><br>Código de error ${response.status}`)
                }
            });
        }
        var resultado;
    };
});