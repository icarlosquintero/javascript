//Procesamiento
function juego(valor1, valor2, valor3, operacion) {
    switch (operacion) {
        case "1":
            let resultadoSumar = valor1 + valor2 - valor3
            return resultadoSumar
        case "2":
            let resultadoRestar = valor1 * valor2 - valor3
            return resultadoRestar
        case "3":
            let resultadoMultiplicar = valor1 / valor2 * valor3
            return resultadoMultiplicar
        case "4":
                let resultadoDividir = valor1 + valor2 / valor3
                return resultadoDividir
        default:
            break;
    }
}

function alertaJuego(operacion) {
    switch (operacion) {
        case "1":
            alert("¡Te ha tocado Valor 1 + Valor 2 - Valor 3!")
            break;
        case "2":
            alert("¡Te ha tocado Valor 1 * Valor 2 - Valor 3!")
            break;    
        case "3":
            alert("¡Te ha tocado Valor 1 / Valor 2 * Valor 3!")
            break;  
        case "4":
            alert("¡Te ha tocado Valor 1 + Valor 2 / Valor 3!")
                break;  
        default:
            break;
}
}

//Se declaran las variables del juego //
//Jugadores
class Jugador {
    constructor(nombre, acceso){
        this.nombre = nombre
        this.acceso = "correcto"
        this.saludar = function(){
        alert("¡Bienvenido al juego de memoria " + this.nombre + "!" +" ¡Tu acceso es " + this.acceso + "!" + " Si das con la respuesta correcta saldrás con vida")
    }
    }
}

let jugador1 = new Jugador(prompt("Ingresa tu nombre"))

//Parametros de fin
const gameover = 1

//Inicio del juego
//Saludo al jugador
jugador1.saludar()

//Indicación de vidas
for (let vidas = 3; vidas >= gameover ; vidas--){
alert("¡Tienes " + vidas + " vidas!")

//Almacenaje de valores
const valoresJuego =[]
let valor1 = valoresJuego.push(parseInt(prompt("Ingresa el primer número")))
let valor2 = valoresJuego.push(parseInt(prompt("Ingresa el segundo número")))
let valor3 = valoresJuego.push(parseInt(prompt("Ingresa el tercer número")))
let operacion = prompt("Ingresa una opción: 1, 2, 3, 4")
alertaJuego(operacion)
let pregunta1 = parseInt(prompt("¡Ingresa el resultado!"))

    if (pregunta1 === juego(valoresJuego[0],valoresJuego[1],valoresJuego[2],operacion)){
        alert("¡Has salido con vida!")
        break
    }

    if(vidas == gameover){
        alert("Has sido eliminado")
    }
}