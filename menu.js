

function cambiarFondo(comp) {
    id_seleccionado = comp.id;
    if (id_seleccionado == "fondo1") {
        document.getElementById("tablero").style.backgroundImage = "url(../imagenes/fondo1.jpg)";
        document.getElementById("tablero").style.backgroundSize = "cover";     
    } else if (id_seleccionado == "fondo2") {
        document.getElementById("tablero").style.backgroundImage = "url(../imagenes/fondo2.jpg)";
        document.getElementById("tablero").style.backgroundSize = "cover";
    } else if (id_seleccionado == "fondo3") {
        document.getElementById("tablero").style.backgroundImage = "url(../imagenes/fondo3.jpg)";
        document.getElementById("tablero").style.backgroundSize = "cover";
    }
}

function cambiarBackground(comp) {
    id_seleccionado = comp.id;
    if (id_seleccionado == "back1") {
        document.querySelector(".body").style.background = "var(--background-2)"
    }

    if (id_seleccionado == "back2") {
        document.querySelector(".body").style.background = "var(--background-1)"
    }
    if (id_seleccionado == "back3") {
        document.querySelector(".body").style.background = "black"
    }
}