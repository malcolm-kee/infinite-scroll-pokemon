import React from 'react';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { usePokemonData } from './hooks/use-pokemon-data';
import { useScroll } from './hooks/use-scroll';

function App() {
  const [{ pokemons, status }, loadMorePokemon] = usePokemonData();
  const marginBottom = useScroll();

  React.useEffect(() => {
    if (marginBottom < 20) {
      loadMorePokemon();
    }
  }, [loadMorePokemon, marginBottom]);

  return (
    <>
      <Header />
      <div className="container">
        <div id="pokemon-container">
          {pokemons.map(pokemon => (
            <Pokemon {...pokemon} key={pokemon.id} />
          ))}
        </div>
        {status === 'loading' && (
          <p className="loading-text nes-balloon from-left is-shown">Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
