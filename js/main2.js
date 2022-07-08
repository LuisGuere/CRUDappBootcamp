// Variables y constantes

let registros = []; 

const uId = document.getElementById("uId");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const agregarTabla = document.getElementById("agregarTabla");

const generarRegistro = () => {
  const usuario = {
    id: uuidv4(),
    nombre: nombre.value,
    correo: correo.value,
    telefono: telefono.value,
  };
  registros = JSON.parse(localStorage.getItem("usuarios")) || [];
  registros.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(registros));
  muestraRegistros();
};

const muestraRegistros = () => {
  const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];

    agregarTabla.innerHTML = "";
    registrosLocales.forEach((registroLocal) => {
      const fila = `<tr>
      <td>1</td>
      <td>${registroLocal.nombre}</td>
      <td>${registroLocal.correo}</td>
      <td>${registroLocal.telefono}</td>
      <td class="row">      
        <div class="col">

        </div>
        <div class="col">
        
        </div>

      <button type="button" class="btn btn-warning" onclick="iniciarEditarRegistro('${registroLocal.id}')">Editar</button>
      </td>
      <td>
      <button type="button" class="btn btn-danger" onclick="eliminarRegistro('${registroLocal.id}')">Eliminar</button>

      </td>
      </tr>`;
      agregarTabla.innerHTML += fila;
    });

  };
  
  iniciarEditarRegistro = (idRegistro) => {
    const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = registrosLocales.find((registroLocal) => {
      return registroLocal.id === idRegistro;
    });
    
    uId.value = idRegistro;
    nombre.value = usuario.nombre;
    correo.value = usuario.correo;
    telefono.valuie = usuario.telefono;
};

const editarRegistro = () => {
  const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = registrosLocales.find((registroLocal) => {
    return registroLocal.id === uId.value;
  });

  usuario.nombre = nombre.value; 
  usuario.correo = correo.value;
  usuario.telefono = telefono.value;

  localStorage.setItem("usuarios", JSON.stringify(registrosLocales));
  muestraRegistros();
};

const eliminarRegistro = (idRegistro) => {
  const registrosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];

  const registrosFiltrados = registrosLocales.filter((registroLocal) => {
    return registroLocal.id !== idRegistro;
  });
  localStorage.setItem("usuarios", JSON.stringify(registrosFiltrados));
  muestraRegistros();
}


function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

window.onload = () => {

  muestraRegistros();
};