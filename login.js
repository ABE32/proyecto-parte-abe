const expresion = {
    nombre: /^[a-zA-Z,Á-ÿ\s]{1,40}$/, //Letras, numeros, guion y guion_bajo
    email:/^@[a-zA-Z0-9_.+-]$/
}

function validar() {
    //Se crea una variable de tipo booleano que en principio tendrá un valor 1 y que se convertirá en false cuando la condición no se cumpla
    const todo_correcto = true;

    //El primer campo a comprobar es el del nombre. Lo traemos por id y verificamos la condición, en este caso, por ejemplo, le decimos que tiene que tener más de 10 dígitos para que sea un nombre válido. Si no tiene más de 10 dígitos, la variable todo_correcto devolverá false.
    if(document.getElementById('name').value.length < 10){
        todo_correcto = false;
    }

    //Para comprobar el email haremos uso de una expresion regular esto es de caracteres que nos dira si el valor ingresado por el usuario tienen en el correo electronico.Lo que hacemos es obtener el value del campo de texto al email,y le aplicamos el metodo test() del objeto global RegExp(que nos permite para trabajar con expresiones regulares)
    const valor = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    let email = document.email.value;
    if (!valor.test(email)) {
        todo_correcto = false;
    }

    //Sigue comprobar la contraseña. Lo traemos por id y verificamos la condición, en este caso, haremos lo mismo que se hizo al validar el nombre, la contraseña tiene que tener 10 caracteres para que tome como válida.
    if(document.getElementById('password').value.length < 10){
        todo_correcto = false;
    }

    //Por último, y como aviso para el usuario, si no está todo bién, osea, si la variable todo_correcto ha devuelto false al menos una vez, generaremos una alerta advirtiendo al usuario de que algunos datos ingresados no son los que esperamos.
    if(!todo_correcto){
        alert('Algunos campos no están correctos, vuelva a revisarlos');
    }

    return todo_correcto;
}

