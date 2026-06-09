async function buscarPokemon(){

    const pokemon = document
    .getElementById("pokemonName")
    .value
    .toLowerCase();

    const url =
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        document.getElementById("pokemonImg")
        .src =
        data.sprites.other["official-artwork"].front_default;

        document.getElementById("pokemonTitle")
        .innerHTML =
        data.name.toUpperCase();

        document.getElementById("pokemonId")
        .innerHTML =
        "ID: " + data.id;

        document.getElementById("pokemonType")
        .innerHTML =
        "Tipo: " +
        data.types.map(t => t.type.name).join(", ");

        document.getElementById("pokemonHeight")
        .innerHTML =
        "Altura: " + data.height;

        document.getElementById("pokemonWeight")
        .innerHTML =
        "Peso: " + data.weight;

        document.getElementById("pokemonAbilities")
        .innerHTML =
        "Habilidades: " +
        data.abilities
        .map(a => a.ability.name)
        .join(", ");

        let statsHTML = "";

        data.stats.forEach(stat => {

            statsHTML += `

            <div class="stat">

                ${stat.stat.name} :
                ${stat.base_stat}

            </div>

            `;
        });

        document.getElementById("stats")
        .innerHTML = statsHTML;

    }catch(error){

        alert("Pokémon no encontrado");
    }
}