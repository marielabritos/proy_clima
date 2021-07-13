const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',() =>{
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();

    //console.log('Buscando el clima');

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    //console.log(ciudad);
    //console.log(pais);

    if(ciudad === '' || pais ===''){
        //hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //consultar API
    consultaApi(ciudad, pais);

}

function mostrarError(mensaje){
    //console.log(mensaje);
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        //creamos una alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3',
    'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>

    `;
    container.appendChild(alerta);

        //se elimine la alerta despues de 5 seg
        setTimeout(()=>{
            alerta.remove();
        }, 5000);

    }
    
}

function consultaApi(ciudad, pais){
    const appId = 'd48f341b5a37250e954232d45d986ba1';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();//muestra un spinner de recarga
    //console.log(url);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            limpiarHTML(); //limpiar el resultado previo
            if(datos.cod ==="404"){
                mostrarError('Ciudad NO encontrada');
                return;
            }
            //imprimi la respuesta en el HTML
            mostrarCLima(datos);

        })

}

function mostrarCLima(datos){
    const {name, main:{temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinAcentrigrados(temp);
    const max = kelvinAcentrigrados(temp_max);
    const min = kelvinAcentrigrados(temp_min);
    //const centigrados = temp - 273.15;

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    //console.log(temp - 273.15);
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `MAX: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `MIN: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima); 
    resultado.appendChild(resultadoDiv);

}

//function kelvinAcentrigrados(grados){
    //return parseInt(grados-273.15);
//}
//se puede hacer de mejor forma la funcion anterior

const kelvinAcentrigrados = grados => parseInt(grados-273.15);

function Spinner(){

    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}