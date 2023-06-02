// Obtener referencias a los formularios
const doctorForm = document.getElementById('doctor-form');
const pacienteForm = document.getElementById('paciente-form');

// Inicializar arrays para almacenar los datos de doctores y pacientes
let doctores = [];
let pacientes = [];

// Función para guardar los datos en un objeto y luego en un archivo JSON
function guardarDatosEnJSON(datos, nombreArchivo) {
    const datosJSON = JSON.stringify(datos);
    localStorage.setItem(nombreArchivo, datosJSON);
}

// Función para obtener los datos guardados en el archivo JSON desde el almacenamiento local del navegador
function obtenerDatosDesdeJSON(nombreArchivo) {
    const datosJSON = localStorage.getItem(nombreArchivo);
    return JSON.parse(datosJSON);
}

// Función para mostrar los datos de doctores en la página
function mostrarDoctores() {
    const doctorTable = document.getElementById('doctores-table').getElementsByTagName('tbody')[0];
    doctorTable.innerHTML = '';

    // Agregar filas de datos
    doctores.forEach(doctor => {
        const row = document.createElement('tr');
        const rowData = [doctor.nombre, doctor.apellido, doctor.cedula, doctor.especialidad, doctor.consultorio, doctor.correo];
        rowData.forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        doctorTable.appendChild(row);
    });
}

// Función para mostrar los datos de pacientes en la página
function mostrarPacientes() {
    const pacienteTable = document.getElementById('pacientes-table').getElementsByTagName('tbody')[0];
    pacienteTable.innerHTML = '';

    // Agregar filas de datos
    pacientes.forEach(paciente => {
        const row = document.createElement('tr');
        const rowData = [paciente.nombre, paciente.apellido, paciente.cedula, paciente.edad, paciente.telefono, paciente.especialidad];
        rowData.forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        pacienteTable.appendChild(row);
    });
}

// Función para validar los campos del formulario utilizando expresiones regulares
function validarFormulario(formulario) {
    const nombre = formulario.querySelector('[id$="nombre"]').value.trim();
    const apellido = formulario.querySelector('[id$="apellido"]').value.trim();
    const cedula = formulario.querySelector('[id$="cedula"]').value.trim();

    // Validar que los campos no estén vacíos
    if (nombre === '' || apellido === '' || cedula === '') {
        alert('Todos los campos son obligatorios');
        return false;
    }

    // Validar formato de la cédula utilizando una expresión regular
    const cedulaRegex = /^\d{9}$/;
    if (!cedulaRegex.test(cedula)) {
        alert('Formato de cédula inválido');
        return false;
    }

    return true;
}

// Evento para guardar los datos del formulario de doctores
doctorForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validarFormulario(doctorForm)) {
        const nombre = doctorForm.querySelector('#doctor-nombre').value.trim();
        const apellido = doctorForm.querySelector('#doctor-apellido').value.trim();
        const cedula = doctorForm.querySelector('#doctor-cedula').value.trim();
        const especialidad = doctorForm.querySelector('#doctor-especialidad').value.trim();
        const consultorio = doctorForm.querySelector('#doctor-consultorio').value.trim();
        const correo = doctorForm.querySelector('#doctor-correo').value.trim();

        // Crear objeto doctor
        const doctor = {
            nombre,
            apellido,
            cedula,
            especialidad,
            consultorio,
            correo
        };

        // Agregar el doctor al array de doctores
        doctores.push(doctor);

        // Guardar los datos en el archivo JSON
        guardarDatosEnJSON(doctores, 'doctores.json');

        // Actualizar la visualización de los doctores en la página
        mostrarDoctores();

        // Limpiar el formulario
        doctorForm.reset();
    }
});

// Evento para guardar los datos del formulario de pacientes
pacienteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validarFormulario(pacienteForm)) {
        const nombre = pacienteForm.querySelector('#paciente-nombre').value.trim();
        const apellido = pacienteForm.querySelector('#paciente-apellido').value.trim();
        const cedula = pacienteForm.querySelector('#paciente-cedula').value.trim();
        const edad = pacienteForm.querySelector('#paciente-edad').value.trim();
        const telefono = pacienteForm.querySelector('#paciente-telefono').value.trim();
        const especialidad = pacienteForm.querySelector('#paciente-especialidad').value.trim();

        // Crear objeto paciente
        const paciente = {
            nombre,
            apellido,
            cedula,
            edad,
            telefono,
            especialidad
        };

        // Agregar el paciente al array de pacientes
        pacientes.push(paciente);

        // Guardar los datos en el archivo JSON
        guardarDatosEnJSON(pacientes, 'pacientes.json');

        // Actualizar la visualización de los pacientes en la página
        mostrarPacientes();

        // Limpiar el formulario
        pacienteForm.reset();
    }
});

// Obtener los datos guardados en los archivos JSON al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los datos de doctores
    const doctoresJSON = obtenerDatosDesdeJSON('doctores.json');
    if (doctoresJSON) {
        doctores = doctoresJSON;
        mostrarDoctores();
    }

    // Obtener los datos de pacientes
    const pacientesJSON = obtenerDatosDesdeJSON('pacientes.json');
    if (pacientesJSON) {
        pacientes = pacientesJSON;
        mostrarPacientes();
    }
});
