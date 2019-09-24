import createClass from 'create-react-class';
import React from 'react';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
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
    return (
      <>
        <Header />
        <div className="container">
          <div id="pokemon-container">
            {this.state.pokemons.map(pokemon => (
              <Pokemon {...pokemon} key={pokemon.id} />
            ))}
          </div>
          {this.state.pokemonLoadingStatus === 'loading' && (
            <p className="nes-balloon from-left is-shown">Loading...</p>
          )}
          {this.state.pokemonLoadingStatus === 'error' && (
            <p className="nes-text is-error">Something goes wrong!</p>
          )}
          <div className="nes-container toolbar">
            <button onClick={this.loadMorePokemons} className="nes-btn is-primary" type="button">
              Load More
            </button>
          </div>
        </div>
      </>
    );
  }
});
