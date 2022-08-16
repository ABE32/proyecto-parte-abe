const expresion = {
    nombre: /^[a-zA-Z,Á-ÿ\s]{1,40}$/, //Letras, números, guión y guión bajo
    email:/[a-zA-Z0-9._-]+/ //Minúsculas, Mayúsculas, números, punto, guión y guión bajo
}

function validar() {
    //Se crea una variable de tipo booleano que en principio tendrá un valor 1 (true) y que se convertirá en false cuando la condición no se cumpla
    const todo_correcto = true;

    //El primer campo a comprobar es el del nombre. Lo traemos por id y verificamos la condición, en este caso, por ejemplo, le decimos que tiene que tener más de 10 dígitos para que sea un nombre válido. Si no tiene más de 10 dígitos, la variable todo_correcto devolverá false.
    if(document.getElementById('name').value.length < 10){
        todo_correcto = false;
    }

    //Para comprobar el email haremos uso de una expresión regular que ya fue guardada en una variable (email) esto nos dirá si el valor ingresado por el usuario cumple con las expresiones definidas. Lo que hacemos es obtener el valor del campo de texto al email,y le aplicamos el metodo test() del objeto global RegExp(que nos permite para trabajar con expresiones regulares)
    const valor = email;
    let email = document.email.value;
    if (!valor.test(email)) {
        todo_correcto = false;
    }

    //Sigue comprobar la contraseña. Lo traemos por id y verificamos la condición, en este caso, haremos lo mismo que se hizo al validar el nombre, la contraseña tiene que tener 10 caracteres para que se tome como válida.
    if(document.getElementById('password').value.length < 10){
        todo_correcto = false;
    }

    return todo_correcto;
}

const usersData = [
    { nombre: "Kimberly", Apellido: "Martinez", email: "km0959784@gmail.com", password: "Kimberly200" },
    { nombre: "Fernando", Apellido: "Morales", email: "moralesjafet1354@gmail.com", password: "Arkham15"}
]


