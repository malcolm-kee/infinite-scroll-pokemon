import React from 'react';
import { Balloon } from './components/balloon';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { getPokemons } from './service';
import { Button } from './components/button';
import { Text } from './components/text';
import { Toolbar } from './components/toolbar';

export class App extends React.Component {
  state = {
    pokemonLoadingStatus: 'loading',
    pokemonCurrentPage: 1,
    pokemons: []
  };

  fetchMorePokemons = () => {
    this.setState({
      pokemonLoadingStatus: 'loading'
    });

    getPokemons({ page: this.state.pokemonCurrentPage })
      .then(pokemons =>
        this.setState(prevState => ({
          pokemons: prevState.pokemons.concat(pokemons),
          pokemonLoadingStatus: 'idle'
        }))
      )
      .catch(err =>
        this.setState(
          {
            pokemonLoadingStatus: 'error'
          },
          () => console.error(err)
        )
      );
  };

  loadMorePokemons = () => {
    if (this.state.pokemonLoadingStatus === 'idle') {
      this.setState(prevState => ({
        pokemonCurrentPage: prevState.pokemonCurrentPage + 1
      }));
    }
  };

  componentDidMount() {
    this.fetchMorePokemons();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.pokemonCurrentPage !== prevState.pokemonCurrentPage) {
      this.fetchMorePokemons();
    }
  }

  render() {
    const { pokemons, pokemonLoadingStatus } = this.state;

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
            <Button onClick={this.loadMorePokemons}>Load More</Button>
          </Toolbar>
        </div>
      </>
    );
  }
}
