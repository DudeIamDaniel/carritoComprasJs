//CREAR VARIABLES


const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//CREAR LISTENERS
cargarEventListeners();
function cargarEventListeners(){
    //FUNCION DE AGREGAR CURSOS 
    listaCursos.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarCurso)
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHtml();
    })
};



function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
};

//Eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        //OBTENER EL ID DEL CURSO QUE SE DESEA ELIMINAR
        cursoId = e.target.getAttribute('data-id')
        //Eliminar del arreglo articulosCarrito por medio del data id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        carritoHTML();
    }
}

//FUNCION DE LEER LOS DATOS DEL CURSO QUE SE SELECCIONO 
function leerDatosCurso(cursoActual){
    //console.log(cursoActual)

    //OBJETO CON LA INFORMACION DEL CURSO SELECCIONADO
    //SELECCIONAR LO QUE SE QUIERE MOSTRAR POR MEDIO DE UN OBJETO Y TRAVERSING
    const infoCurso = {
        imagen: cursoActual.querySelector('img').src,
        titulo: cursoActual.querySelector('h4').textContent,
        precio: cursoActual.querySelector('.precio span').textContent,
        id: cursoActual.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }
            else{
                return curso;
            }
        });

        articulosCarrito = [...cursos]

    }else{
        //AGREGAR ELEMENTOS AL CARRITO DE COMPRAS
        articulosCarrito = [...articulosCarrito, infoCurso] 
    }
    //AGREGAR ELEMENTOS AL CARRITO DE COMPRAS
    carritoHTML();
};

//GENERAR O CREAR EL HTML DE LOS ARTICULOS
function carritoHTML(){

    limpiarHtml();
    articulosCarrito.forEach( curso => {
        //CREAR UN ELEMENTO HTML
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${curso.imagen}" width="100"> </td>
        <td> ${curso.titulo} </td>
        <td> ${curso.precio} </td>
        <td> ${curso.cantidad} </td>
        <td>
            <a href= "#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        // AGREGAR EL HTML AL CONTENEDOR DEL CARRITO
        contenedorCarrito.appendChild(row)
    })
};

//ELIMINAR EL HTML QUE SE GENERA DE PRIMERAS (REST)
//MIENTRAS EL CONTENEDER TENGA UN HIJO SE ELIMINARA EL PRIMER HIJO 
function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};

