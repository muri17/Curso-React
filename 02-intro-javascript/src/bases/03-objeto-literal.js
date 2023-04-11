

const persona = {
    nombre: 'Tony',
    apellido: 'Stark',
    edad: 45,
    direccion: {
        ciudad: 'New York',
        zip: 523423423,
        lat: 10.445312,
        lng: 34.123123
    }
};

// console.table( persona );

const persona2 = { ...persona };
persona2.nombre = 'Juan';


console.log( persona );
console.log( persona2 )







