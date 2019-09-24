import React from 'react';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { getPokemons } from './service';

export class App extends React.Component {
  state = {
    pokemonLoadingStatus: 'loading',
    pokemonCurrentPage: 1,
    pokemons: []
  };

  fetchMorePokemons = () => {
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
    return (
      <>
        <Header />
        <div className="container">
          <div class="nes-container toolbar">
            <button onClick={this.loadMorePokemons} className="nes-btn is-primary" type="button">
              Load More
            </button>
          </div>
          <div id="pokemon-container">
            {this.state.pokemons.map(pokemon => (
              <Pokemon {...pokemon} key={pokemon.id} />
            ))}
          </div>
          {this.state.pokemonLoadingStatus === 'loading' && (
            <p className="loading-text nes-balloon from-left is-shown">Loading...</p>
          )}
          {this.state.pokemonLoadingStatus === 'error' && (
            <p className="nes-text is-error">Something goes wrong!</p>
          )}
        </div>
      </>
    );
  }
}
