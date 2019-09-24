import React from 'react';
import { Balloon } from './components/balloon';
import { Button } from './components/button';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { Text } from './components/text';
import { Toolbar } from './components/toolbar';
import { getPokemons } from './service';

/**
 * Render props solve the limitation of mixin, but it has its own drawback too:
 * - not intuitive. The code is hard to read.
 * - nested component.
 *
 * It is time to fix the problem within the framework, instead of developer
 * to use complex pattern to overcome the framework limitation.
 *
 * "React Hooks"
 */

export const App = () => {
  const [status, setStatus] = React.useState('loading');
  const [pokemons, setPokemons] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setStatus('loading');

    getPokemons({
      page: currentPage
    })
      .then(newPokemons => {
        setPokemons(oldPokemons => oldPokemons.concat(newPokemons));
        setStatus('idle');
      })
      .catch(() => setStatus('error'));
  }, [currentPage]);

  const loadMorePokemons = () => {
    if (status === 'idle') {
      setCurrentPage(page => page + 1);
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
        {status === 'loading' && <Balloon>Loading...</Balloon>}
        {status === 'error' && <Text variant="error">Something goes wrong!</Text>}
        <Toolbar>
          <Button onClick={loadMorePokemons}>Load More</Button>
        </Toolbar>
      </div>
    </>
  );
};
