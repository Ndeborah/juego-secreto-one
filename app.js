//forma de conectar javascrip con los elementos es atraves del "document" (puente entre js y html)
//permite trabajar con varios metodos, uno de ellos es el query selector (le pasao el nombre de un elemento "h1" y se lo atribuyo a la variable "titulo")
//es un objeto.
//let titulo = document.querySelector('h1');
//le damos un valor que inserta en el html
//titulo.innerHTML = "Bienvenido al juego: Número secreto";
//let parrafo = document.querySelector('p');
//parrafo.innerHTML = "Ingresa un número del 1 al 10";

//control + f para buscar cosas en el codigo.

let numeroMaximo = 25;
//debemos crear la variable para guardar el numero generado por la funcion. variable global.
let numeroSecreto = 0;
//funcion para crear el numero aleatorio
let intentos = 0;
let cantidadMaxDeIntentos = 3;
let listaNumerosSorteados = [];


function generarNumeroSecreto() {
    //variable numeroSecreto alcance de bloque, funciona solo para este bloque de codigo, por eso podemos crear una variable global, 
    //mas arriba con el mismo nombre.
    //let numeroSecreto = Math.floor(Math.random()*numeroMaximo)+1;
    //podemos directamente retornar el resultado de la funcion sin crear una variable.

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;


    console.log(listaNumerosSorteados);

    //Si ya sorteamos todos los numeros podemos mostrar un mensaje en la pantalla y cerrar el juego. 

    if (listaNumerosSorteados.length == numeroMaximo) {

        asignatTextoElemento('p', 'Ya salieron todos los números disponibles.');

    } else {

        //Si el numero generado esta incluido en la lista hacemos una cosa, si no hacemos otra.

        if (listaNumerosSorteados.includes(numeroGenerado)) {
            //recursividad, la funcion se llama a si misma.   entonces llamamos a retunr para que realice la funcion y la retorne para
            //que pueda volver a chequear si esta incluido en la lista. 
            //con la recursividad debemos tener cuidado, ya que puede acabarse los recursos de la funcion
            //en este casi si llega al numero maximo, osea si sortea 25 veces y se completan los numeros del 1 al 24 en la lista
            //la funcion no tendra mas recursos. 
            //debemos indicar una condicion de salida para evitar el problema. 
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;

        }
    }




}

//para optimizar el codigo las asignaciones de texto se pueden realizar en una funcion, para no repetir el innerHTML
//es una buena practica colocar siempre el return, por mas que no reterne nada.
function asignatTextoElemento(elemento, texto) {
    //lo que teniamos arriba ahora lo tenemos en una funcion
    //Asi va a ser generica entonces "elemento" va a recibir los elementos "h1,p,etc" y "texto" va a recibir el texto que queremos que tenga. 
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
    return;
}


function limpiarCampo() {
    //si utilizamos querySelector en lugar de getElementById, como es un selector universal, debemos indicarle que buscamos
    //como en este caso buscamos un elemento por ID le colocamos el #.
    // esta es una forma de hacerlo  --->let valorCaja = document.querySelector('#numeroDeUsuario');
    //le damos el valor vacio para que lo borre.
    // ----> valorCaja.value = ''; pero lo podemos reducir si hacemos:
    document.querySelector('#numeroDeUsuario').value = '';
    return;
}
function ingresarIntento() {
    //capturar lo que el usuario ingreso obtener el valor del id numeroDeUsuario
    //colocamos el parseInt para que lo ingresado por el usuario, que es tomado como un string se convierta en un int, ya que es lo 
    //que necesitamos.
    let numeroIngresado = parseInt(document.getElementById('numeroDeUsuario').value);
    //typeof es para saber como se toma el dato ingresado, osea de que tipo es para el programa.
    // console.log(typeof(numeroIngresado));
    // console.log(numeroIngresado);

    if (intentos >= cantidadMaxDeIntentos) {
        asignatTextoElemento('p', `Ya superaste la cantidad máxima de ${cantidadMaxDeIntentos} intentos disponibles. :(`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        
        if(numeroIngresado>numeroMaximo || numeroIngresado<1) {

            asignatTextoElemento('p', 'El número ingresado está fuera del rango solicitado. x.x');
            limpiarCampo();

        } else {
            if (numeroIngresado === numeroSecreto) {
                asignatTextoElemento('p', `Genial! Acertaste! El número Secreto era: ${numeroSecreto}. Lo hiciste en: ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
                //con esta funcion del DOM removeAtribute le quitamos el atributo disabled al elemento que tiene el id reiniciar
                //en este caso el boton "nuevo juego"
                document.getElementById('reiniciar').removeAttribute('disabled');
    
            } else {
    
                //el usuario no acerto, utilizamos una funcion para limpiar el numero ingresado del campo blanco.
                if (numeroIngresado > numeroSecreto) {
                    asignatTextoElemento('p', 'El número secreto es menor.');
                } else {
                    asignatTextoElemento('p', 'El número secreto es mayor.');
                }
    
                intentos++;
                limpiarCampo();
    
            }
            return;
        }
        
       
    }


}

// los ponemos en una funcion para que cada vez que los tengamos que usar en un reinicio de juego solamente llamemos a la funcion
//y no tengamos que escribir todo de nuevo.  
function condicionesIniciales() {
    //llamamos a la funcion y le damos los parametros que necesitamos
    asignatTextoElemento('h1', "Juego del Número Secreto");
    asignatTextoElemento('p', `Ingresa un número del 1 al ${numeroMaximo}`);
    //generar numero aleatorio
    numeroSecreto = generarNumeroSecreto();
    //inicializar el numero de intentos. hay que hacer un reinicio de todo.
    intentos = 1;
    console.log(numeroSecreto);
    return;
}

//declaracion de funcion que se usara en el onclick del boton intento 
function reiniciarJuego() {
    //primero necesito limpiar la caja blanca.
    limpiarCampo();
    //indicar mensajes de intervalos de nuevo
    condicionesIniciales();
    //desabilitar el boton de nuevo juego. en este caso lo utilizamos con el queryselector asi que usamos el numeral para buscar un ID
    //y utilizamos el setAtribute y como es un set osea un cambio necesito poner dos parametros, el atributo que quiero cambiar y el estado
    //al que lo quiero cambiar.
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');


    return;
}

//Estas son las condiciones iniciales del juego
condicionesIniciales();


//llamamos a la funcion y le damos los parametros que necesitamos
//asignatTextoElemento('h1',"Juego del Número Secreto");
//asignatTextoElemento('p', `Ingresa un número del 1 al ${numeroMaximo}`);
//declaracion de funcion que se usara en el onclick del boton intento