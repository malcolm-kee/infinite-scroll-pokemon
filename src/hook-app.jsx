import React from 'react';
import { Balloon } from './components/balloon';
import { Button } from './components/button';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { Text } from './components/text';
import { Toolbar } from './components/toolbar';
import { getPokemons } from './service';

export const App = () => {
  const [pokemonLoadingStatus, setPokemonLoadingStatus] = React.useState('loading');
  const [pokemons, setPokemons] = React.useState([]);
  const [pokemonCurrentPage, setPokemonCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setPokemonLoadingStatus('loading');

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
        <div id="pokemon-container">
          {pokemons.map(pokemon => (
            <Pokemon {...pokemon} key={pokemon.id} />
          ))}
        </div>
        {pokemonLoadingStatus === 'loading' && <Balloon>Loading...</Balloon>}
        {pokemonLoadingStatus === 'error' && <Text variant="error">Something goes wrong!</Text>}
        <Toolbar>
          <Button onClick={loadMorePokemons}>Load More</Button>
        </Toolbar>
      </div>
    </>
  );
};
