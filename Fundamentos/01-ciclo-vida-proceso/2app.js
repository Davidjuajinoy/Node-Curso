console.log("Inicio de primgrama"); //1

setTimeout(() => {
  console.log("Primer TimeOut"); //3
}, 3000);

setTimeout(() => {
  console.log("Segundo TimeOut"); //4
}, 3000);

setTimeout(() => {
  console.log("Tercer TimeOut"); //5
}, 3000);

console.log("Fin de programa"); //2

/*
Node ejecuta todo secuencialmente y cada proceso que va ejecutando lo va eliminando 
* Pila de procesos (call stack)
    crea el proceso main() que es el que se encarga de registrar funciones y ejecutar el codigo linea por linea y despues lo borra.
    --Se ejecutaria el console.log("Inicio de primgrama")
    --registraria los SetTimeOut y los envia a Node Apis
    --Se ejecuta el console.log("Fin de programa");
* Node Apis
    cuando el call stack registra una funcion que no tiene que ser ejecutada la guarda aca y esta en la espera de que se ejecute (por tiempo,etc).
    --Cuando se ejecuta se envia a la cola de callbacks
* Cola de callbacks
    Almacena las funciones que se ejecutan en el NodeApis y las envia al CallStack cuando halla terminado el main();
    --Se envian los 3 setTimeOut a el callStack y se ejecutan
*/
