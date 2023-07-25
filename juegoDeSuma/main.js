var aleatorio;
var vNumero;
var aleatorio;
var vNumero2;

var vResultadoInput;
var vResultado;
var vRestoMenor;
var vRestoMayor;
var vResto = 0;
var vPuntos = 0;
var vPuntosTotales = 0;

var vGanaste = false;
var vIntentosTotales;
var vIntentos = 0;

var vIntervalo;

var vResultadoVerificado = false;

var vSobraTotal = 0;

var vJuegoTerminado = false;
var juegoComenzado = false;
var seteadoPorUsuario = false;

function seteoUsuario() {
    if (juegoComenzado == false) {
        seteadoPorUsuario = true;
        intentos = document.getElementById("set-intentos").value;
        tiempo = document.getElementById("set-tiempo").value;

    }

}

function resetearSeteo() {
    if (juegoComenzado == false && seteadoPorUsuario == true) {
        seteadoPorUsuario = false;
    }
    document.getElementById("set-intentos").value = ""
    document.getElementById("set-tiempo").value = ""
}


function mostrarNumeros() {
    juegoComenzado = true;
    if (seteadoPorUsuario == true && intentos > 1) {
        vIntentosTotales = intentos;
    } else {
        vIntentosTotales = 5;
    }

    aleatorio = Math.random() * 999;
    vNumero = Math.round(aleatorio);
    aleatorio = Math.random() * 999;
    vNumero2 = Math.round(aleatorio);

    document.getElementById("numeroUno").innerHTML = vNumero;
    document.getElementById("numeroDos").innerHTML = vNumero2;

    document.getElementById("boton-mostrar").style.display = "none";
    document.getElementById("operador").style.display = "block";
    document.getElementById("input-boton").style.display = "inline";
    document.getElementById("comprobar-btn").style.display = "inline";

    document.getElementById("inputResultado").focus();

    contador();
    vIntentos++;
}

function verificarResultado() {

    clearInterval(vIntervalo);
    document.getElementById("contador").innerHTML = "";

    vResultadoInput = document.getElementById("inputResultado").value;
    vResultado = vNumero + vNumero2;
    vRestoMenor = vResultado - vResultadoInput;
    vRestoMayor = vResultadoInput - vResultado;



    if (vResultadoVerificado == false) {
        if (vResultadoInput == vResultado) {
            document.getElementById("texto-superior").innerHTML = "PERFECTO"
        } else if (vResultadoInput < vResultado) {
            document.getElementById("texto-superior-resultado").innerHTML = vResultado
            document.getElementById("resultados").innerHTML = vResultado
            document.getElementById("sobra").innerHTML = " - " + vRestoMenor;
            vSobraTotal = vSobraTotal + vRestoMenor;
            vResto = Math.abs(vRestoMayor);
        } else if (vResultado < vResultadoInput) {
            document.getElementById("texto-superior-resultado").innerHTML = vResultado;
            document.getElementById("resultados").innerHTML = vResultado
            document.getElementById("sobra").innerHTML = " + " + vRestoMayor;
            vSobraTotal = vSobraTotal + vRestoMayor;
            vResto = Math.abs(vRestoMenor);
        }
    }

    document.getElementById("comprobar-btn").style.display = "none";
    document.getElementById("proxima-btn").style.display = "inline";
    document.getElementById("proxima-btn").focus();

    // colorSobra();

    vResultadoVerificado = true;

}

//Proxima

function proxima() {
    if (vIntentos < vIntentosTotales) {
        document.getElementById("inputResultado").value = "";
        document.getElementById("resultados").innerHTML = "";
        document.getElementById("sobra").innerHTML = "";
        document.getElementById("comprobar-btn").style.display = "inline";
        document.getElementById("proxima-btn").style.display = "none";
        document.getElementById("texto-superior-resultado").innerHTML = "";
        document.getElementById("texto-superior").innerHTML = "";
        document.getElementById("inputResultado").focus();

        contador();
        generarAleatorios();

        vResultadoVerificado = false;
        vIntentos++;

    } else if (vIntentos == vIntentosTotales) {
        document.getElementById("comprobar-btn").style.display = "none"
        document.getElementById("texto-superior").innerHTML = "FIN"
        document.getElementById("texto-superior-resultado").innerHTML = "";
        document.getElementById("proxima-btn").style.display = "none";
        document.getElementById("inputResultado").value = "";
        document.getElementById("volverAjugar").style.display = "inline"
        document.getElementById("volverAjugar").focus();
    

        puntosFinales();
        vJuegoTerminado = true;
        juegoComenzado=false;
    }
    document.getElementById("sobra-total").innerHTML = vSobraTotal;
    document.getElementById("intentos").innerHTML = vIntentos + "/" + vIntentosTotales;
    agregarPuntos();
    // colorTotal();

}

// Aleatorios

function generarAleatorios() {
    aleatorio = Math.random() * 999;
    vNumero = Math.round(aleatorio);
    aleatorio = Math.random() * 999;
    vNumero2 = Math.round(aleatorio);

    document.getElementById("numeroUno").innerHTML = vNumero;
    document.getElementById("numeroDos").innerHTML = vNumero2;

    return vNumero, vNumero2;
}

// function operadorAleatorio() {

//     aleatorio = Math.random() * (3 - 0) + 0;
//     vNumero2 = Math.round(aleatorio);

//     var aOperadores = ["+", "-", "x", "/"];
//     document.write(aOperadores[vNumero2])

//     }



//Temporizador

function contador() {
    if (seteadoPorUsuario == true && tiempo > 3) {
        vContador = tiempo;
    }
    else {
        vContador = 6;
    }
    vIntervalo = setInterval(() => {
        vContador--;
        document.getElementById("contador").innerHTML = vContador

        if (vContador === 0) {
            clearInterval(vIntervalo);
            verificarResultado();

            document.getElementById("comprobar-btn").style.display = "none";
            document.getElementById("proxima-btn").style.display = "inline";
            document.getElementById("proxima-btn").focus();
        }
    }, 1000);
}


//Ejecutar con teclas

document.addEventListener('keydown', keyVerificar);

function keyVerificar(e) {
    if (vJuegoTerminado == false) {
        if (vIntentos >= 1 && vIntentos <= vIntentosTotales) {
            if (vResultadoVerificado == false) {
                if (e.keyCode == '32') {
                    verificarResultado();
                }
            }
        } else if (vJuegoTerminado == true && vResultadoVerificado == true) {
            volverAjugar();
        }
    }
}

//Volver a jugar

function volverAjugar() {
    if (vJuegoTerminado == true) {

        vJuegoTerminado = false;
        vResultadoVerificado = false;
        vIntentos = 0;
        vSobraTotal = 0;
        vNumero = 0;
        vNumero2 = 0;
        vResultado = 0;
        vRestoMenor = 0;
        vRestoMayor = 0;
        vResultadoInput = 0;
        vPuntosTotales = 0;
        vPuntos = 0;

        var vTextos = document.getElementsByClassName("pnts");

        for (let i = 0; i < vTextos.length - 1; i++) {
            vTextos[i].innerHTML = ""
        }
        document.getElementById("volverAjugar").style.display = "none"
        document.getElementById("input-boton").style.display = "none";

        document.getElementById("boton-mostrar").style.display = "inline-block";
        document.getElementById("boton-mostrar").focus();

        document.getElementById("operador").style.display = "none";
        document.getElementById("volverAjugar").style.display = "none"
        document.getElementById("proxima-btn").style.display = "none";
        document.getElementById("puntos").innerHTML = "";

    }
}


// Puntuacion

function agregarPuntos() {

    vPuntos = 0;

    if (vResultado == vResultadoInput) {
        vPuntos = 1000;
        vPuntosTotales = vPuntosTotales + vPuntos;
    } else if (vResto <= 10) {
        vPuntos = 500;
        vPuntosTotales = vPuntosTotales + vPuntos;
    } else if (vResto > 10 && vResto <= 50) {
        vPuntos = 250;
        vPuntosTotales = vPuntosTotales + vPuntos;
    } else if (vResto > 50 && vResto <= 100) {
        vPuntos = 125;
        vPuntosTotales = vPuntosTotales + vPuntos;
    } else if (vResto > 100 && vResto <= 300) {
        vPuntos = - 250;
        vPuntosTotales = vPuntosTotales + vPuntos;
    } else if (vResto > 300 && vResto <= 500) {
        vPuntos = - 500;
        vPuntosTotales = vPuntosTotales + vPuntos;
    } else if (vResto > 500) {
        vPuntos = - 1000;
        vPuntosTotales = vPuntosTotales + vPuntos;
    }

    document.getElementById("puntos").innerHTML = vPuntosTotales;
}

function puntosFinales() {
    if (vSobraTotal <= 10) {
        vPuntosTotales = vPuntosTotales + 1000
    } else if (vSobraTotal > 10 && vSobraTotal <= 50) {
        vPuntosTotales = vPuntosTotales + 500
    } else if (vSobraTotal > 50 && vSobraTotal <= 100) {
        vPuntosTotales = vPuntosTotales + 200
    } else if (vSobraTotal > 100) {
        vPuntosTotales = vPuntosTotales - 200
    }
}

function limitarDigitos(inputElement, maxDigits) {
    let inputValue = inputElement.value;
    if (inputValue.length > maxDigits) {
      // Truncar el valor a solo 4 dígitos
      inputValue = inputValue.slice(0, maxDigits);
      inputElement.value = inputValue;
    }
  }



