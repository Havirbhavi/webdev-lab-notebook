const pokemonColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#ea7ce8",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Add your code here
const pokemonContainer = document.querySelector("#pokemon-container");
const loader = document.querySelector("#loader");
const search = document.querySelector("#search");
const noResults = document.querySelector("#no-results");

let allPokemons = [];

const fetchPokemons = async function () {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
    const data = await response.json();

    const pokemonRequests = data.results.map(function (pokemon) {
      return fetch(pokemon.url).then(function (response) {
        return response.json();
      });
    });

    allPokemons = await Promise.all(pokemonRequests);

    loader.classList.add("hidden");
    displayPokemons(allPokemons);
  } catch (error) {
    loader.innerHTML = "<p>Unable to fetch Pokémon data.</p>";
    console.error(error);
  }
};

const displayPokemons = function (pokemons) {
  pokemonContainer.innerHTML = "";

  if (pokemons.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  pokemons.forEach(function (pokemon) {
    const card = document.createElement("article");
    card.classList.add("pokemon-card");

    const typeElements = pokemon.types
      .map(function (typeInfo) {
        const typeName = typeInfo.type.name;
        const typeColor = pokemonColors[typeName];

        return `<span class="type" style="background-color: ${typeColor};">${typeName}</span>`;
      })
      .join("");

    card.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img
        src="${pokemon.sprites.other["official-artwork"].front_default}"
        alt=""
      />
      <div class="type-container">
        ${typeElements}
      </div>
    `;

    pokemonContainer.appendChild(card);
  });
};

const searchPokemons = function () {
  const query = search.value.toLowerCase().trim();

  const filteredPokemons = allPokemons.filter(function (pokemon) {
    const nameMatch = pokemon.name.toLowerCase().includes(query);

    const typeMatch = pokemon.types.some(function (typeInfo) {
      return typeInfo.type.name.toLowerCase().includes(query);
    });

    return nameMatch || typeMatch;
  });

  displayPokemons(filteredPokemons);
};

search.addEventListener("input", searchPokemons);

fetchPokemons();
