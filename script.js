const users = [
    {
        name: "Ana",
        documento: "1234",
        password: "1111",
        tipoUsuario: 1,
    },
    {
        name: "Maria",
        documento: "12345",
        password: "2222",
        tipoUsuario: 1,
    },
    {
        name: "Jose",
        documento: "123456",
        password: "3333",
        tipoUsuario: 2,
    }
];

const dineroEnCajero = [
    {
        denominacion: 100000,
        cantidad: 0,
    },
    {
        denominacion: 50000,
        cantidad: 0,
    },
    {
        denominacion: 20000,
        cantidad: 0,
    },
    {
        denominacion: 10000,
        cantidad: 0,
    },
    {
        denominacion: 5000,
        cantidad: 0,
    },
];


const inicioCajero = () => {
    const numeroDocumento = prompt("Por favor ingrese su número de documento");
    const password = prompt("Por favor ingrese su contraseña");
    return {
        numeroDocumento,
        password,
    };
};

const validateUser = () => {
    let usuarioIniciado = inicioCajero();
    let userFound = users.find(
        (user) =>
            user.documento === usuarioIniciado.numeroDocumento &&
            user.password === usuarioIniciado.password
    );
    while (!userFound) {
        alert("El usuario no existe o los datos ingresados son incorrectos");
        let usuarioIniciado = inicioCajero();
        let userFound = users.find(
            (user) =>
                user.documento === usuarioIniciado.numeroDocumento &&
                user.password === usuarioIniciado.password
        );
    }
    return userFound;
};

const depositarDinero = () => {
    alert("Vamos a depositar dinero");
    let totalDineroEnCajero = 0;
    dineroEnCajero.forEach((billete) => {
        const cantidadDepositadaStr = prompt(`Por favor ingrese la cantidad de billetes de ${billete.denominacion} a depositar`
        );
        const cantidadDepositada = Number(cantidadDepositadaStr);
        billete.cantidad += cantidadDepositada;
        const sumaDenominacion = billete.denominacion * billete.cantidad;
        totalDineroEnCajero += sumaDenominacion;
        console.log(`Total ${sumaDenominacion} en billetes de ${billete.denominacion}`);
    }
    );
    console.log("Dinero en cajero por denominación", dineroEnCajero);
    console.log("Total de dinero en el cajero", totalDineroEnCajero);
};


const retirarDinero = () => {
    alert("Vamos a retirar dinero");
    let totalDineroEnCajero = 0;
    dineroEnCajero.forEach((billete) => {
        const cantidadRetiradaStr = prompt(`Por favor ingrese la cantidad a retirar`);
        if (totalDineroEnCajero == 0) {
            alert("Cajero en mantenimiento");
        } else if (totalDineroEnCajero > 0) {
            if (cantidadRetiradaStr <= totalDineroEnCajero) {
                let cantidadEntregar = 0;
                dineroEnCajero.forEach(billete => {
                    const billetesNecesarios = Math.floor(cantidadRetiradaStr / billete.denominacion);

                    if (billetesNecesarios <= billete.cantidad) {
                        if (cantidadRetiradaStr >= billete.denominacion * billetesNecesarios) {
                            cantidadRetiradaStr -= billete.denominacion * billetesNecesarios;
                            billete.cantidad -= billetesNecesarios;
                            cantidadEntregar += billete.denominacion * billetesNecesarios;
                            console.log("Se entrego " + billetesNecesarios + " de " + billete.denominacion);
                        }
                    } else if (billetesNecesarios > billete.cantidad) {
                        if (cantidadRetiradaStr >= billete.denominacion * billete.cantidad) {
                            console.log("Se entrego " + billete.cantidad + "de" + billete.denominacion);
                            cantidadEntregar += billete.denominacion * billete.cantidad;
                            cantidadRetiradaStr -= billete.denominacion * billete.cantidad;
                            billete.cantidad -= billete.cantidad;
                        }
                    }
                })
                alert("El cajero puede entregar en este momento " + cantidadEntregar + "faltó por entregar de su solicitud " + cantidadRetiradaStr);
                let dineroDisponible = 0;
                totalDineroEnCajero.forEach(billete => {
                    const totalDenominacion = billete.denominacion * billete.cantidad;
                    console.log("Dinero disponible en el cajero " + totalDenominacion + " de los billetes de " + billete.denominacion);
                    dineroDisponible += totalDenominacion;
                }
                );
            } else if (cantidadRetiradaStr > totalDineroEnCajero) {
                alert("El cajero no cuenta con esta cantidad de dinero en el momento, intente un valor menor o vuelva mas tarde.");
            }
        }
    });
};

//let x = validateUser();
//let x = depositarDinero();

/*const transaccionesCajero = () => {
    const loginUser = validateUser ();
    if (loginUser) {
        if (loginUser.tipoUsuario === 1) {
            depositarDinero();
        }else {
            retirarDinero();
        }
    }
};*/
