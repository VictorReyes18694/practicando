const grid = new Muuri('.grid',{
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
    // agregamos los listener de los enlaces para filtrar por categoria.
    const enlaces = document.querySelectorAll('#categorias a');
    /* en este foreach estoy pidiendo que para cada uno de los elementos enlaces (categoria)
    ejecute el codigo que tendremos dentro de los {}   */
    enlaces.forEach( (elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            /*guardamos en la variable categoria, al click que obtenemos por pantalla (si se clickea en largo, medio, corto, todos)
            para poder hacer los filtros */
            const categoria = evento.target.innerHTML.toLowerCase();
            /* si categoria es igual a todos entonces que muestre todos los elementos que tengan data- categoria  */
            /*los : sirven como condicional si no hace eso q haga lo otro */
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);

        });
    } );

    //agregamos los listener para la barra de busqueda (para que filtre segun la busqueda)
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) =>{
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    //agregamos listener para las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) =>{
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });


    /* eventlistener del boton cerrar */
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    /*evenlistener del overlay */
    overlay.addEventListener('click', (evento) => {
       // overlay.classList.remove('activo');
       evento.target.id === 'overlay' ? overlay.classList.remove('activo') : ''; 
    });
});