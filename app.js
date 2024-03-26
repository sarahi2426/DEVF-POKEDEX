function fetchPokemonNumber(number){
    for(let i = 1; i <= number; i++){
        fetchPokemon(i)
    }
}

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
       cardsPokemon(data);
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
}

function cardsPokemon(data){
    const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

    const card = document.createElement('div');
    card.classList.add('card');

    const head = document.createElement('div');
    head.classList.add('head');

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const imgCard = document.createElement('div');
    imgCard.classList.add('img-card');

    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.alt = "imagen de pokemon";

    const number = document.createElement('h4');
    number.classList.add('number');
    number.textContent = `#${data.id}`;

    const description = document.createElement('div');
    description.classList.add('description');

    const name = document.createElement('h3');
    name.id = "name";
    name.classList.add('nombre');
    name.textContent = data.name;

    const tipo = document.createElement('p');
    tipo.classList.add('tipo');
    tipo.textContent = data.types[0].type.name;

    const habilidades = document.createElement('button');
    habilidades.id = "habilidades";
    habilidades.classList.add('more-info');
    habilidades.textContent = "Pokedatos";

    habilidades.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = modalesPokemon(data);
        modal.classList.add('modal--show');
    });

    contenedorTarjetas.appendChild(card);
    card.appendChild(head);
    head.appendChild(circle);
    head.appendChild(imgCard);
    imgCard.appendChild(img);
    imgCard.appendChild(number);
    card.appendChild(description);
    description.appendChild(name);
    description.appendChild(tipo);
    description.appendChild(habilidades);
}

function modalesPokemon(data){
    const modalSection = document.createElement('section');
    modalSection.classList.add('modal');
    modalSection.id = "modal";

    const modalInfo = document.createElement('div');
    modalInfo.classList.add('modal-info');
    modalInfo.id = 'modalInfo';

    const titulo = document.createElement('h2');
    titulo.classList.add('modal-titulo');
    titulo.textContent = data.name;

    const habilidad = document.createElement('p');
    habilidad.textContent = `Habilidad: ${data.abilities.map(ability => ability.ability.name).join(', ')}`;

    const experiencia = document.createElement('p');
    experiencia.textContent = `Experiencia: ${data.base_experience}`;

    const elementos = document.createElement('p');
    elementos.textContent = `Altura: ${data.height}m`;

    const versiones = document.createElement('p');
    versiones.textContent = `Velocidad: ${data.stats[5].base_stat}`;

    const cerrarModal= document.createElement('a');
    cerrarModal.href= '#';
    cerrarModal.classList.add('modal-cerrar');
    cerrarModal.id = 'cerrar-modal';
    cerrarModal.textContent = 'Cerrar';

    modalInfo.appendChild(titulo);
    modalInfo.appendChild(habilidad);
    modalInfo.appendChild(experiencia);
    modalInfo.appendChild(elementos);
    modalInfo.appendChild(versiones);
    modalInfo.appendChild(cerrarModal);

    modalSection.appendChild(modalInfo);
    document.body.appendChild(modalSection);

    const closeModal = document.querySelector('#cerrar-modal');
    closeModal.addEventListener('click', (e) =>{
        e.preventDefault();
        modalSection.classList.remove('modal--show');
        modalSection.remove();
    });

    return modalSection;
}

function searchPokemon() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('.nombre').textContent.toLowerCase();
        const number = card.querySelector('.number').textContent.replace('#', '');

        if (name.includes(searchTerm) || number.includes(searchTerm)) {
            card.style.display = 'block'; // Mostrar la tarjeta si coincide con el término de búsqueda
        } else {
            card.style.display = 'none'; // Ocultar la tarjeta si no coincide con el término de búsqueda
        }
    });
}

// Escuchar el evento de cambio en el campo de búsqueda
document.getElementById('search-input').addEventListener('input', searchPokemon);
fetchPokemonNumber(30);
