import React from 'react';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { getPokemons } from './service';

export const App = () => {
  const [pokemonLoadingStatus, setPokemonLoadingStatus] = React.useState('loading');
  const [pokemons, setPokemons] = React.useState([]);
  const [pokemonCurrentPage, setPokemonCurrentPage] = React.useState(1);

  React.useEffect(() => {
    getPokemons({
      page: pokemonCurrentPage
    })
      .then(newPokemons => {
        setPokemons(oldPokemons => oldPokemons.concat(newPokemons));
        setPokemonLoadingStatus('idle');
      })
      .catch(() => setPokemonLoadingStatus('error'));
  }, [pokemonCurrentPage]);

  const loadMorePokemons = () => {
    if (pokemonLoadingStatus === 'idle') {
      setPokemonCurrentPage(page => page + 1);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div class="nes-container toolbar">
          <button onClick={loadMorePokemons} className="nes-btn is-primary" type="button">
            Load More
          </button>
        </div>
        <div id="pokemon-container">
          {pokemons.map(pokemon => (
            <Pokemon {...pokemon} key={pokemon.id} />
          ))}
        </div>
        {pokemonLoadingStatus === 'loading' && (
          <p className="loading-text nes-balloon from-left is-shown">Loading...</p>
        )}
        {pokemonLoadingStatus === 'error' && (
          <p className="nes-text is-error">Something goes wrong!</p>
        )}
      </div>
    </>
  );
};
