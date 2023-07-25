
let btn_cargar = document.getElementById('btn-cargar')
btn_cargar.addEventListener('click', ()=>{
    console.log("hola")
    let pregunta = document.getElementById('pregunta').value
    let correcta = document.getElementById('opcion1').value
    let opcion2 = document.getElementById('opcion2').value
    let opcion3 = document.getElementById('opcion3').value
    let opcion4 = document.getElementById('opcion4').value
    console.log(pregunta)

    
    var datos = new FormData()
    datos.append('pregunta', pregunta)
    datos.append('correcta', correcta)
    datos.append('opcion2', opcion2)
    datos.append('opcion3', opcion3)
    datos.append('opcion4', opcion4)

    fetch('cargar.php', {
        method: 'POST',
        body: datos
    })
    .then(res_j => res_j.json())
    .then(res => {
        console.log(res)
        if (res.estado == true) {
            document.getElementById('mensaje-carga').innerHTML ="Pregunta cargada"
            document.getElementById('pregunta').value = ""
            document.getElementById('opcion1').value = ""
            document.getElementById('opcion2').value = ""
            document.getElementById('opcion3').value = ""
            document.getElementById('opcion4').value = ""
        }
    }).catch(err => {
        console.log(err)
    })

})