import createClass from 'create-react-class';
import React from 'react';
import { Balloon } from './components/balloon';
import { Button } from './components/button';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { Text } from './components/text';
import { Toolbar } from './components/toolbar';
import { getPokemons } from './service';

export const App = createClass({
  getInitialState: function() {
    return {
      pokemonLoadingStatus: 'loading',
      pokemonCurrentPage: 1,
      pokemons: []
    };
  },
  fetchMorePokemons: function() {
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
      .catch(error =>
        this.setState(
          {
            pokemonLoadingStatus: 'error'
          },
          () => console.error(error)
        )
      );
  },
  loadMorePokemons: function() {
    if (this.state.pokemonLoadingStatus === 'idle') {
      this.setState(prevState => ({
        pokemonCurrentPage: prevState.pokemonCurrentPage + 1
      }));
    }
  },
  componentDidMount: function() {
    this.fetchMorePokemons();
  },
  componentDidUpdate: function(_, prevState) {
    if (this.state.pokemonCurrentPage !== prevState.pokemonCurrentPage) {
      this.fetchMorePokemons();
    }
  },
  render: function() {
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
});
