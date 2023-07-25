
let respuesta;
let parseado;

let pEliminar;
let array_respuestas;
let aleatorio;
let resp_correcta;
let p;
let opcion_1;
let opcion_2;
let opcion_3;
let opcion_4;
let juegoComenzado = false;
let juegoTerminado = false;
let clikeado = false;
let contestadas = 1;

let wuey;
let array_cargado = false;
let correctas = 0;
let seteadoPorUsuario = false;
let intentos;
let tiempo;
let maximo_respuestas = 10
let vContador


const peticion = new XMLHttpRequest();
peticion.addEventListener("load", () => {
        respuesta = peticion.response;
        // console.log(typeof respuesta)
        parseado = JSON.parse(respuesta)
        // console.log(typeof parseado)
});
peticion.open("POST", "consulta.php");
peticion.send();

let en_juego = false

let value_respuesta_seleccionada;
let id_respuesta_seleccionada;

function mostrarPregunta() {
console.log("mostrar")
        if (!juegoComenzado) {
                juegoComenzado = true;
        }
        en_juego = true

        if (array_cargado == false) {
                //hago una copia del array "parseado" para poder eliminar las preguntas que van saliendo.
                pEliminar = parseado.slice();
                array_cargado = true;
                juegoComenzado = true;
        }


        aleatorio = Math.floor(Math.random() * (pEliminar.length));
        const p = pEliminar[aleatorio];

        //busca el indice de la pregunta
        index = pEliminar.findIndex((element) => element.pregunta === p.pregunta);
        //y la elimina.
        pEliminar.splice(index, 1)

        array_respuestas = [p.correcta, p.opcion2, p.opcion3, p.opcion4];
        resp_correcta = p.correcta;

        //pone las respuestas en orden aleatorio
        let r_aleatorio = array_respuestas.sort(() => Math.random() > 0.5 ? 1 : -1);

        document.getElementById("pregunta").innerHTML = p.pregunta;
        opcion_1 = document.querySelector("#opcion1").value = r_aleatorio[0];
        opcion_2 = document.querySelector("#opcion2").value = r_aleatorio[1];
        opcion_3 = document.querySelector("#opcion3").value = r_aleatorio[2];
        opcion_4 = document.querySelector("#opcion4").value = r_aleatorio[3];

        document.getElementById("boton-mostrar").style.display = "none";
        document.getElementById("juego-opciones").style.display = "block";
        document.getElementById("btn-volverAjugar").style.display = "none";
        contador();


        if (parseado.length < maximo_respuestas) {
                document.getElementById("intentos").innerHTML = contestadas + "/" + parseado.length;
        } else {
                document.getElementById("intentos").innerHTML = contestadas + "/" + maximo_respuestas;
        }

};






//obtengo valor de respuesta clickeada.
function obtenerValor(comp) {
        if (en_juego == true) {
                if (clikeado == false) {
                        id_respuesta_seleccionada = comp.id;
                        value_respuesta_seleccionada = document.getElementById(id_respuesta_seleccionada).value;
                        verificarResultado();
                        clikeado = true;
                        en_juego = false
                }
        }
       

};

function verificarResultado() {
        if (value_respuesta_seleccionada == resp_correcta) {
                document.getElementById(id_respuesta_seleccionada).style.background = "green";
                siguientePregunta();
                correctas++;
                // document.getElementById("mensaje-inferior").innerHTML = "correcto"

        } else {
                document.getElementById(id_respuesta_seleccionada).style.background = "red";
                buscarCorrecta("green");
                siguientePregunta();
                // document.getElementById("mensaje-inferior").innerHTML = "incorrecto"
        }
        document.getElementById("correctas").innerHTML = correctas;
        clearInterval(vIntervalo);
        document.getElementById("contador").innerHTML = "";
}


function buscarCorrecta(color) {
        if (opcion_1 == resp_correcta) {
                document.getElementById("opcion1").style.background = color;
        } else if (opcion_2 == resp_correcta) {
                document.getElementById("opcion2").style.background = color;
        } else if (opcion_3 == resp_correcta) {
                document.getElementById("opcion3").style.background = color;
        } else if (opcion_4 == resp_correcta) {
                document.getElementById("opcion4").style.background = color;
        }
}


function contador() {

        vContador = 6;
        vIntervalo = setInterval(() => {
                vContador--;
                document.getElementById("contador").innerHTML = vContador

                if (vContador === 0) {
                        clearInterval(vIntervalo);
                        document.getElementById("contador").innerHTML = "";
                        buscarCorrecta("green");
                        siguientePregunta();
                        en_juego = false;
                        // document.getElementById("mensaje-inferior").innerHTML = "sin tiempo"
                }
        }, 1000);

}

function resetearBotones() {
        document.getElementById("opcion1").style.background = "transparent";
        document.getElementById("opcion2").style.background = "transparent";
        document.getElementById("opcion3").style.background = "transparent";
        document.getElementById("opcion4").style.background = "transparent";
}

function siguientePregunta() {
        if (contestadas < maximo_respuestas) {
                setTimeout(() => {
                        resetearBotones();
                        contestadas++;
                        clikeado = false;
                        mostrarPregunta();
                        // document.getElementById("mensaje-inferior").innerHTML = ""
                }, 1500);
        } else {
                setTimeout(() => {
                        document.getElementById("contador").innerHTML = "fin";
                        juegoTerminado = true;
                        juegoComenzado = false;
                        // array_cargado = false;
                        resetearBotones();
                        clikeado = false;
                        correctas = 0;
                        document.getElementById("correctas").innerHTML = "";
                        document.getElementById("intentos").innerHTML = "";
                        document.getElementById("juego-opciones").style.display = "none";
                        document.getElementById("pregunta").innerHTML = "";
                        document.getElementById("btn-volverAjugar").style.display = "block"
                        // document.getElementById("mensaje-inferior").innerHTML = ""

                }, 1800);
        }


}

function volverAjugar() {
        if (juegoTerminado == true) {
                juegoTerminado = false;
                contestadas = 1;
                document.getElementById("btn-volverAjugar").style.display = "none"
                document.getElementById("boton-mostrar").style.display = "block";
                document.getElementById("contador").innerHTML = "";
                console.log(juegoTerminado);
                console.log(juegoComenzado)
        }
}

// Puntuacion


// function agregarPuntos() {

//     vPuntos = 0;

//     if (vResultado == vResultadoInput) {
//         vPuntos = 1000;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     } else if (vResto <= 10) {
//         vPuntos = 500;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     } else if (vResto > 10 && vResto <= 50) {
//         vPuntos = 250;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     } else if (vResto > 50 && vResto <= 100) {
//         vPuntos = 125;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     } else if (vResto > 100 && vResto <= 300) {
//         vPuntos = - 250;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     } else if (vResto > 300 && vResto <= 500) {
//         vPuntos = - 500;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     } else if (vResto > 500) {
//         vPuntos = - 1000;
//         vPuntosTotales = vPuntosTotales + vPuntos;
//     }

//     document.getElementById("puntos").innerHTML = vPuntosTotales;
// }

// function colorTotal() {
//     if (vSobraTotal <= 10) {
//         document.getElementById("sobra-total").style.color = "greenyellow";
//     } else if (vSobraTotal > 10 && vSobraTotal <= 50) {
//         document.getElementById("sobra-total").style.color = "orange";
//     } else if (vSobraTotal > 50 && vSobraTotal <= 100) {
//         document.getElementById("sobra-total").style.color = "orangered";
//     } else if (vSobraTotal > 100) {
//         document.getElementById("sobra-total").style.color = "red";
//     }
// }


// function colorSobra() {
//     if (vResto <= 10) {
//         document.getElementById("sobra").style.color = "greenyellow";
//     } else if (vResto > 10 && vResto <= 50) {
//         document.getElementById("sobra").style.color = "orange";
//     } else if (vResto > 50 && vResto <= 100) {
//         document.getElementById("sobra").style.color = "orangered";
//     } else if (vResto > 100) {
//         document.getElementById("sobra").style.color = "red";
//     }
// }

// function puntosFinales() {
//     if (vSobraTotal <= 10) {
//         vPuntosTotales = vPuntosTotales + 1000
//     } else if (vSobraTotal > 10 && vSobraTotal <= 50) {
//         vPuntosTotales = vPuntosTotales + 500
//     } else if (vSobraTotal > 50 && vSobraTotal <= 100) {
//         vPuntosTotales = vPuntosTotales + 200
//     } else if (vSobraTotal > 100) {
//         vPuntosTotales = vPuntosTotales - 200
//     }
// }



