
let iconos = []
let selecciones = []//guarda las dos tarjetas seleccionadas
let juegoComenzado = false;
let nivelCambiado = false;
let time;
let nivelSeleccionado;
let cantTarjetas = 32;
let tarjetas = [];
let paresEncontrados = 0;
let paresTotales;
let juegoTerminado = false;


const nivel1 = {
    tarjetas: 12,
    tiempo: 40
}

const nivel2 = {
    tarjetas: 18,
    tiempo: 50
}

const nivel3 = {
    tarjetas: 24,
    tiempo: 60
}

///////////////////////////////////////
function cargarIconos() {
    iconos = [
        '<img src="tarjetas/1.jpg"></img>',
        '<img src="tarjetas/2.jpg"></img>',
        '<img src="tarjetas/3.jpg"></img>',
        '<img src="tarjetas/4.jpg"></img>',
        '<img src="tarjetas/5.jpg"></img>',
        '<img src="tarjetas/6.jpg"></img>',
        '<img src="tarjetas/7.jpg"></img>',
        '<img src="tarjetas/8.jpg"></img>',
        '<img src="tarjetas/9.jpg"></img>',
        '<img src="tarjetas/10.jpg"></img>',
        '<img src="tarjetas/11.jpg"></img>',
        '<img src="tarjetas/12.jpg"></img>',
        '<img src="tarjetas/13.jpg"></img>',
        '<img src="tarjetas/14.jpg"></img>',
        '<img src="tarjetas/15.jpg"></img>',
        '<img src="tarjetas/16.jpg"></img>'
    ]
}


function generarTablero() {
    cargarIconos()
    selecciones = []

    let tablero = document.getElementById("tablero")//obtiene el tablero
    tarjetas = []//crea el array tarjetas
    for (let i = 0; i < cantTarjetas; i++) {//en cada iteracion, ingresa la estructura html de la tarjeta
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {//elimina el icono cuando se cargo dos veces(?)
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)//mezcla los iconos
    tablero.innerHTML = tarjetas.join(" ")//ingresa cada tarjeta en el tablero, y le saca la coma con "join"
}

generarTablero(nivel3.tarjetas)


function cambiarNivel() {
    nivelCambiado = true;
    if (juegoComenzado == false) {
        nivelSeleccionado = document.getElementById('set-nivel').value;
        if (nivelSeleccionado == 1) {
            cantTarjetas = nivel1.tarjetas
            time = nivel1.tiempo
            // document.querySelector(".container_juego").style.margin = "80px 0 0 80px"
            document.querySelector(".bajo_juego").style.margin = "30px 0 0 0"
            document.querySelector(".juego_resultado").style.height = "250px"
        } else if (nivelSeleccionado == 2) {
            cantTarjetas = nivel2.tarjetas
            time = nivel2.tiempo
            // document.querySelector(".container_juego").style.margin = "50px 0 0 80px"
            document.querySelector(".bajo_juego").style.margin = "20px 0 0 0"
            document.querySelector(".juego_resultado").style.height = "350px"
        } else if (nivelSeleccionado == 3) {
            cantTarjetas = nivel3.tarjetas
            time = nivel3.tiempo
            // document.querySelector(".container_juego").style.margin = "0 0 0 80px"
            document.querySelector(".bajo_juego").style.margin = "0 0 0 0"
            document.querySelector(".juego_resultado").style.height = "450px"
        }
    }
    generarTablero();
}


function seleccionarTarjeta(i) {
    if (juegoComenzado == false && juegoTerminado == false) {
        juegoComenzado = true;
        contador();
    }
    if (juegoComenzado == true && juegoTerminado == false) {
        let tarjeta = document.getElementById("tarjeta" + i)//selecciona la tarjeta clickeada
        if (tarjeta.style.transform != "rotateY(180deg)") {//si la tarjeta seleccionada no esta rotada
            tarjeta.style.transform = "rotateY(180deg)" //la rota
            selecciones.push(i)//y la mete en el array "selecciones"
        }
        if (selecciones.length == 2) {//si selecciones tiene dos elementos 
            deseleccionar(selecciones)//ejecuta deseleccionar
            selecciones = []//y vacia el array "selecciones"
        }
    }


}

function deseleccionar(selecciones) {//usa como parametro los dos elementos del array "selecciones"
    paresTotales = tarjetas.length / 2
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])//guarda una tarjeta en cada variable
        if (trasera1.innerHTML != trasera2.innerHTML) {// si la primera NO es igual a la segunda
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])//selecciona las dos tarjetas
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"//y las rota
        } else {// si son iguales
            if (paresEncontrados === paresTotales) {
                juegoTerminado = true;
                juegoComenzado = false;
            }
            trasera1.style.background = "rgb(89, 82, 122)"
            trasera2.style.background = "rgb(89, 82, 122)"//les cambia el color, y no las rota
            paresEncontrados++;
            document.getElementById("pares").innerHTML = paresEncontrados + "/" + paresTotales;
        }
    }, 1000);//despues de un segundo.
}


////////////////////////
let vContador;
let vIntervalo;

function contador() {
    if (nivelCambiado == false) {
        vContador = 90;
    } else {
        vContador = time;
    }
    vIntervalo = setInterval(() => {
        vContador--;
        document.getElementById("contador").innerHTML = vContador

        if (vContador === 0 || paresEncontrados == paresTotales) {
            clearInterval(vIntervalo);
            juegoTerminado = true;
            juegoComenzado = false;
            tablero.style.background = "gray"
        }
    }, 1000);
}


function nuevoJuego() {
    clearInterval(vIntervalo);
        juegoComenzado = true;
        juegoTerminado = false;
        paresEncontrados = 0;
        tarjetas.sort(() => Math.random() - 0.5)//mezcla los iconos
        tablero.innerHTML = tarjetas.join(" ")//ingresa cada tarjeta en el tablero, y le saca la coma con "join"
        tablero.style.backgroundImage = 'url(../imagenes/fondo1.jpg)'
        tablero.style.backgroundSize = "cover"
        document.getElementById("pares").innerHTML = "";
        contador(); 
}

