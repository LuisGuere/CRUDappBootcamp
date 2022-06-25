const contactForm = document.getElementById('contact-form');
const names = document.getElementById('names');
const mail = document.getElementById('mail');
const telephone = document.getElementById('telephone');
const addUsers = document.getElementById('add-users');

/*
const contactoForm = document.getElementById('contacto-form');
const inputNombre = document.getElementById('inputNombre');
const inputApellido = document.getElementById('inputApellido');
const inputTelefono = document.getElementById('inputTelefono');
const bodyTabla = document.getElementById('body-tabla');
*/
let contactos = [{
    nombre: 'Maria',
    correo: 'mlopez@deathmail.com',
    telefono: '1256432184',
},
{
    nombre: 'Maria',
    correo: 'mlopez@livermail.com',
    telefono: '9923432184',
},
];


function agregarContacto(nombre, correo, telefono) {
    contactos.push({
        nombre,
        correo: correo,
        telefono: telefono,
    })
}

function eliminarContacto(indice) {

    contactos.splice(indice, 1)

    mostrarContactos();
}

function mostrarContactos() {
    addUsers.innerHTML = '';
    contactos.forEach(function (contacto, indice) {
        addUsers.innerHTML += `<tr>
        <th scope="row">${indice + 1}</th>
        <td>${contacto.nombre}</td>
        <td>${contacto.correo}</td>
        <td>${contacto.telefono}</td>
        <td>              
        <button class="btn btn-dark" id="button-edit" onclick="editarContacto(${indice})"><img class="text-white" src="imgs/menu.svg"></button>
        <button class="btn btn-dark" id="button-erase" onclick="eliminarContacto(${indice})"><img class="text-white" src="imgs/x.svg"></button>        
        </td>
        </tr>`
    })
}

function editarContacto(indice) {
    contactos[indice].nombre =  prompt('Ingresa un nuevo nombre.');
    contactos[indice].correo = prompt('Ingresa un nuevo correo.');
    contactos[indice].telefono = prompt('Ingresa un nuevo telefono.');

    mostrarContactos();
}


contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    /* 
    numero1 = numero1 + 123424123;
    numero1 += 123424123;
     */
    if (names.value.trim() !== '' && mail.value.trim() !== '' && telephone.value.trim() !== '') {

        addUsers.innerHTML = '';

        agregarContacto(names.value, mail.value, telephone.value);

        mostrarContactos();

        event.target.reset();
    } else {
        alert('Los 3 campos son obligatorios');
    }
});

function guardarContactosStorage() {
    const contactosGuardar = JSON.stringify(contactos);
    localStorage.setItem('contactos', contactosGuardar);
}

function obtenerContactosStorage() {
    const contactosStorage = localStorage.getItem('contactos');
    /* if (contactosStorage == null) {
        contactos = [];
    } else {
        contactos = JSON.parse(contactosStorage);
    } */
    //Operador ternario
    contactos = contactosStorage == null ? [] : JSON.parse(contactosStorage);
}



obtenerContactosStorage()
mostrarContactos();