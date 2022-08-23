//constantes
//listenersNombreJugador
const nombreJugador = document.querySelector("#nombreJugador");
const escucharNombre = document.querySelector("#nombreJugador");
//listenersPrimerNumero
const valor1 = document.querySelector("#numeroPrimero");
const escuchaPrimero = document.querySelector("#numeroPrimero");
//listenerSegundoNumero
const valor2 = document.querySelector("#numeroSegundo");
const escuchaSegundo = document.querySelector("#numeroSegundo");
//listenersPrueba
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
//listenerNumeroResultado
const operacion1 = document.querySelector("#numeroResultado");
const numeroResultado = document.querySelector("#numeroResultado");

//data
//almacenajeDataJugador: será almacenada en el localStorage
//almacenajeDataJuego
const valoresJuego = [];
//almacenajeDataPrueba
let seleccionPrueba = [];

//jugador
class jugador {
  constructor(nombre, acceso) {
    this.nombre = nombre;
    this.acceso = "Autorizado";
  }
}
//asignamos una clase al jugador
let jugador1 = "";

//inicioProcesamiento
escucharNombre.focus();
cargarEventListeners();

//fetch1
const resp = fetch("./pruebasPosibles.json");
var container = document.getElementById("lista-cursos");

const pedirPosts = async () => {
  const resp = await fetch("./pruebasPosibles.json");
  const data = await resp.json();
  //const dataArray = JSON.parse(data);
  data.forEach(cargarCards);
};

pedirPosts();

//Funciones
function cargarCards(a, b, c) {
  {
    var el = document.createElement("div");
    el.className = "card";
    el.style = "width: 18rem";
    el.id = "card" + (b + 1);
    el.innerHTML =
      `<img src="${a.imagen}" class="card-img-top" alt="..." />` +
      `<div class="card-body">
      <h5 class="card-title">${a.prueba}</h5>
      <p class="card-text" hidden>${a.texto}</p>
      </div>` +
      `</div><a href="#" class="btn agregar-carrito">Elegir</a>
    </div>`;
  }
  container.append(el);
}

function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  //funcion anular selección
  vaciarCarritoBtn.addEventListener("click", () => {
    //se limpia la selección hecha
    const modificarContenedor90 = document.querySelector("#card1");
    modificarContenedor90.style.borderColor = "#ced4da";
    modificarContenedor90.style.boxShadow = "";
    const modificarContenedor91 = document.querySelector("#card2");
    modificarContenedor91.style.borderColor = "#ced4da";
    modificarContenedor91.style.boxShadow = "";
    const modificarContenedor92 = document.querySelector("#card3");
    modificarContenedor92.style.borderColor = "#ced4da";
    modificarContenedor92.style.boxShadow = "";
    const modificarContenedor93 = document.querySelector("#card4");
    modificarContenedor93.style.borderColor = "#ced4da";
    modificarContenedor93.style.boxShadow = "";
    //se limpia el array
    for (let i = seleccionPrueba.length; i > 0; i--) {
      seleccionPrueba.pop();
    }
    swal({
      icon: "info",
      text: "¡Has anulado correctamente!",
    });
  });

  //Capto nombre
  formulario.addEventListener("submit", validarNombre);
  function validarNombre(e) {
    e.preventDefault();
    jugador1 = new jugador(nombreJugador.value);
    //valido vacíos antes de avanzar
    jugador1.nombre || (jugador1.acceso = "No autorizado");
    valor1.value || (jugador1.acceso = "No autorizado");
    valor2.value || (jugador1.acceso = "No autorizado");
    operacion1.value || (jugador1.acceso = "No autorizado");
    seleccionPrueba[0] || (jugador1.acceso = "No autorizado");
    //transformo a JSON
    const jugadoresStr = JSON.stringify(jugador1);
    //Guardo en localStorage
    localStorage.setItem("jugador1", jugadoresStr);
  }

  //Escucha de nombre
  escucharNombre.addEventListener("input", (e) => {
    e.target.value === ""
      ? cambioContenedorRojo(nombreJugador.id)
      : cambioContenedorVerde(nombreJugador.id);
  });

  //Se capta la información de los valores
  //Capto numero 1
  formulario.addEventListener("submit", validarPrimero);
  function validarPrimero(e) {
    e.preventDefault();
    valoresJuego.push(parseInt(valor1.value));
  }
  escuchaPrimero.addEventListener("input", (e) => {
    e.target.value === ""
      ? cambioContenedorRojo(numeroPrimero.id)
      : cambioContenedorVerde(numeroPrimero.id);
  });

  //Capto número 2
  formulario.addEventListener("submit", validarSegundo);
  function validarSegundo(e) {
    e.preventDefault();
    valoresJuego.push(parseInt(valor2.value));
  }
  //Escucha de número 2
  escuchaSegundo.addEventListener("input", (e) => {
    e.target.value === ""
      ? cambioContenedorRojo(numeroSegundo.id)
      : cambioContenedorVerde(numeroSegundo.id);
  });

  //Capto resultado del usuario
  formulario.addEventListener("submit", validarResultado);
  function validarResultado(e) {
    e.preventDefault();
    valoresJuego.push(parseInt(operacion1.value));
  }
  //Escucha de resultado
  numeroResultado.addEventListener("input", (e) => {
    e.target.value === ""
      ? cambioContenedorRojo(numeroResultado.id)
      : cambioContenedorVerde(numeroResultado.id);
  });

  //Se saluda al jugador
  formulario.addEventListener("submit", solicitarNombre);
  function solicitarNombre() {
    //recupero data del jugador
    const dataJugador = localStorage.getItem("jugador1");
    const dataJugadorArray = JSON.parse(dataJugador);
    //se valida acceso
    (dataJugadorArray?.acceso || "No autorizado") === "Autorizado"
      ? swal(
          "¡Atención " +
            dataJugadorArray.nombre.toUpperCase() +
            ", está iniciando la prueba!",
          {
            buttons: {
              cancel: "Mmm... mejor no",
              catch: {
                text: "Continuar",
                value: "ok",
              },
            },
          }
        ).then((value) => {
          switch (value) {
            case "ok":
              //se comienza validación
              //unifico el array de valores y de la prueba seleccionada
              console.log(valoresJuego);
              combinados = [...valoresJuego, ...seleccionPrueba];

              //desestructuro el array para enviar los valores de manera simplificada
              const [valor1, valor2, valor3, valor4] = combinados;

              //se envían valores combinados y desestructurados
              if (valor3 === juego(valor1, valor2, valor4)) {
                //modificamos el elemento 0
                const modificarMensaje1 = (document.querySelector(
                  "h1"
                ).textContent = "¡Gracias por participar!");
                const modificarMensaje2 = (document.querySelector(
                  "h2"
                ).textContent = "¡Gracias por participar!");
                swal({
                  icon: "success",
                  title: "¡Has salido con vida!",
                  text: "¡Ingresaste la respuesta correcta! ¡Gracias por participar!",
                }).then(function () {
                  location.reload();
                });
                return false;
              } else {
                swal({
                  icon: "error",
                  title: "¡Has sido eliminado!",
                  text:
                    "¡Intentalo nuevamente! El valor correcto era: " +
                    juego(valoresJuego[0], valoresJuego[1], seleccionPrueba[0]),
                }).then(function () {
                  location.reload();
                });
              }
              break;
            default:
              swal({
                icon: "warning",
                title: "¡Has huido!",
                text: "¡Intentalo nuevamente!",
              }).then(function () {
                location.reload();
              });
          }
        })
      : swal({
          icon: "error",
          title: "Debes ingresar todos los campos",
        });
  }
}

//funcion no autorizar ingreso
function noAutorizar(e) {
  e.nombre = "No autorizado";
  e.acceso = "No autorizado";
}

//función agregar data
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement;
    leerDatosCurso(cursoSeleccionado);
    //Validación de cursos elegidos
    switch (seleccionPrueba.length) {
      case 1:
        //modificamos formato de selección elegida
        switch (cursoSeleccionado.id) {
          case "card1":
            //modificamos borde y sombra de card elegida
            const modificarContenedor1 = document.querySelector("#card1");
            modificarContenedor1.style.borderColor = "#79CEA6";
            modificarContenedor1.style.boxShadow =
              "0 0 0 0.25rem rgb(25 135 84 / 25%)";
            //modificamos resto de cards
            const modificarContenedor11 = document.querySelector("#card2");
            modificarContenedor11.style.borderColor = "#ced4da";
            modificarContenedor11.style.boxShadow = "";
            const modificarContenedor12 = document.querySelector("#card3");
            modificarContenedor12.style.borderColor = "#ced4da";
            modificarContenedor12.style.boxShadow = "";
            const modificarContenedor13 = document.querySelector("#card4");
            modificarContenedor13.style.borderColor = "#ced4da";
            modificarContenedor13.style.boxShadow = "";
            //informamos selección correcta
            setTimeout(() => {
              swal({
                icon: "info",
                text: "¡Has seleccionado tu prueba correctamente!",
              });
            }, 300);
            break;

          case "card2":
            //modificamos borde
            const modificarContenedor2 = document.querySelector("#card2");
            modificarContenedor2.style.borderColor = "#79CEA6";
            modificarContenedor2.style.boxShadow =
              "0 0 0 0.25rem rgb(25 135 84 / 25%)";
            //modificamos resto de cards
            const modificarContenedor21 = document.querySelector("#card1");
            modificarContenedor21.style.borderColor = "#ced4da";
            modificarContenedor21.style.boxShadow = "";
            const modificarContenedor22 = document.querySelector("#card3");
            modificarContenedor22.style.borderColor = "#ced4da";
            modificarContenedor22.style.boxShadow = "";
            const modificarContenedor23 = document.querySelector("#card4");
            modificarContenedor23.style.borderColor = "#ced4da";
            modificarContenedor23.style.boxShadow = "";
            //informamos selección correcta
            setTimeout(() => {
              swal({
                icon: "info",
                text: "¡Has seleccionado tu prueba correctamente!",
              });
            }, 300);
            break;

          case "card3":
            //modificamos borde
            const modificarContenedor3 = document.querySelector("#card3");
            modificarContenedor3.style.borderColor = "#79CEA6";
            modificarContenedor3.style.boxShadow =
              "0 0 0 0.25rem rgb(25 135 84 / 25%)";
            //modificamos resto de cards
            const modificarContenedor31 = document.querySelector("#card1");
            modificarContenedor31.style.borderColor = "#ced4da";
            modificarContenedor31.style.boxShadow = "";
            const modificarContenedor32 = document.querySelector("#card2");
            modificarContenedor32.style.borderColor = "#ced4da";
            modificarContenedor32.style.boxShadow = "";
            const modificarContenedor33 = document.querySelector("#card4");
            modificarContenedor33.style.borderColor = "#ced4da";
            modificarContenedor33.style.boxShadow = "";
            //informamos tiempo de respuesta
            swal({
              icon: "info",
              text: "¡Tienes 5 segundos para ingresar tu respuesta!",
            });
            setTimeout(() => {
              swal({
                icon: "error",
                title: "¡Has sido eliminado, no ingresaste un valor!",
              }).then(function () {
                location.reload();
              });
            }, 5000);
            break;

          case "card4":
            //modificamos borde
            const modificarContenedor4 = document.querySelector("#card4");
            modificarContenedor4.style.borderColor = "#79CEA6";
            modificarContenedor4.style.boxShadow =
              "0 0 0 0.25rem rgb(25 135 84 / 25%)";
            //modificamos resto de cards
            const modificarContenedor41 = document.querySelector("#card1");
            modificarContenedor41.style.borderColor = "#ced4da";
            modificarContenedor41.style.boxShadow = "";
            const modificarContenedor42 = document.querySelector("#card2");
            modificarContenedor42.style.borderColor = "#ced4da";
            modificarContenedor42.style.boxShadow = "";
            const modificarContenedor43 = document.querySelector("#card3");
            modificarContenedor43.style.borderColor = "#ced4da";
            modificarContenedor43.style.boxShadow = "";
            //informamos selección correcta
            setTimeout(() => {
              swal({
                icon: "info",
                text: "¡Has seleccionado tu prueba correctamente!",
              });
            }, 300);
            break;
          default:
            break;
        }
        break;
      case 2:
        //mensaje de selección incorrecta
        swal({
          icon: "info",
          text: "¡Se debe elegir una sola prueba! ¡Intentalo nuevamente!",
        });
        //se limpia la selección hecha
        const modificarContenedor90 = document.querySelector("#card1");
        modificarContenedor90.style.borderColor = "#ced4da";
        modificarContenedor90.style.boxShadow = "";
        const modificarContenedor91 = document.querySelector("#card2");
        modificarContenedor91.style.borderColor = "#ced4da";
        modificarContenedor91.style.boxShadow = "";
        const modificarContenedor92 = document.querySelector("#card3");
        modificarContenedor92.style.borderColor = "#ced4da";
        modificarContenedor92.style.boxShadow = "";
        const modificarContenedor93 = document.querySelector("#card4");
        modificarContenedor93.style.borderColor = "#ced4da";
        modificarContenedor93.style.boxShadow = "";
        //se limpia el array
        for (let i = seleccionPrueba.length; i > 0; i--) {
          seleccionPrueba.pop();
        }
        break;
      default:
        break;
    }
  }
}
//funcion procesamiento
function juego(valor1, valor2, valor3) {
  switch (valor3) {
    case "1":
      let resultadoSumar = valor1 + valor2;
      return resultadoSumar;
    case "2":
      let resultadoRestar = valor1 * valor2;
      return resultadoRestar;
    case "3":
      let resultadoMultiplicar = valor1 / valor2;
      return resultadoMultiplicar;
    case "4":
      let resultadoDividir = valor1 - valor2;
      return resultadoDividir;
    default:
      break;
  }
}
//función leer data del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    titulo: curso.querySelector(".card-title").innerText,
    texto: curso.querySelector(".card-text").innerText,
    id: curso.querySelector("div").getAttribute("id"),
  };
  seleccionPrueba.push(infoCurso.texto);
}
//funcion cambio de color rojo de box
function cambioContenedorRojo(a) {
  switch (a) {
    case "nombreJugador":
      //modificamos borde
      const modificarContenedor = document.querySelector("#nombreJugador");
      modificarContenedor.style.borderColor = "rgb(255 102 102 / 25%)";
      //modificamos sombra
      const modificarSombra = document.querySelector("#nombreJugador");
      modificarSombra.style.boxShadow = "0 0 0 0.25rem rgb(255 102 102 / 25%)";
      break;
    case "numeroPrimero":
      //modificamos borde
      const modificarContenedor1 = document.querySelector("#numeroPrimero");
      modificarContenedor1.style.borderColor = "rgb(255 102 102 / 25%)";
      //modificamos sombra
      const modificarSombra1 = document.querySelector("#numeroPrimero");
      modificarSombra1.style.boxShadow = "0 0 0 0.25rem rgb(255 102 102 / 25%)";
      break;
    case "numeroSegundo":
      //modificamos borde
      const modificarContenedor2 = document.querySelector("#numeroSegundo");
      modificarContenedor2.style.borderColor = "rgb(255 102 102 / 25%)";
      //modificamos sombra
      const modificarSombra2 = document.querySelector("#numeroSegundo");
      modificarSombra2.style.boxShadow = "0 0 0 0.25rem rgb(255 102 102 / 25%)";
      break;
    case "numeroResultado":
      //modificamos borde
      const modificarContenedor3 = document.querySelector("#numeroResultado");
      modificarContenedor3.style.borderColor = "rgb(255 102 102 / 25%)";
      //modificamos sombra
      const modificarSombra3 = document.querySelector("#numeroResultado");
      modificarSombra3.style.boxShadow = "0 0 0 0.25rem rgb(255 102 102 / 25%)";
      break;
    default:
      break;
  }
}
//funcion cambio de color verde de box
function cambioContenedorVerde(a) {
  switch (a) {
    case "nombreJugador":
      //modificamos borde
      const modificarContenedor = document.querySelector("#nombreJugador");
      modificarContenedor.style.borderColor = "#79CEA6";
      //modificamos sombra
      const modificarSombra = document.querySelector("#nombreJugador");
      modificarSombra.style.boxShadow = "0 0 0 0.25rem rgb(25 135 84 / 25%)";
      break;
    case "numeroPrimero":
      //modificamos borde
      const modificarContenedor1 = document.querySelector("#numeroPrimero");
      modificarContenedor1.style.borderColor = "#79CEA6";
      //modificamos sombra
      const modificarSombra1 = document.querySelector("#numeroPrimero");
      modificarSombra1.style.boxShadow = "0 0 0 0.25rem rgb(25 135 84 / 25%)";
      break;
    case "numeroSegundo":
      //modificamos borde
      const modificarContenedor2 = document.querySelector("#numeroSegundo");
      modificarContenedor2.style.borderColor = "#79CEA6";
      //modificamos sombra
      const modificarSombra2 = document.querySelector("#numeroSegundo");
      modificarSombra2.style.boxShadow = "0 0 0 0.25rem rgb(25 135 84 / 25%)";
      break;
    case "numeroResultado":
      //modificamos borde
      const modificarContenedor3 = document.querySelector("#numeroResultado");
      modificarContenedor3.style.borderColor = "#79CEA6";
      //modificamos sombra
      const modificarSombra3 = document.querySelector("#numeroResultado");
      modificarSombra3.style.boxShadow = "0 0 0 0.25rem rgb(25 135 84 / 25%)";
      break;
    default:
      break;
  }
}
