import React from 'react';
import { getPokemons } from '../service';

export class PokemonData extends React.Component {
  state = {
    pokemonLoadingStatus: 'idle',
    pokemonCurrentPage: 1,
    pokemons: []
  };

  loadMorePokemonsData = () => {
    this.setState({
      pokemonLoadingStatus: 'loading'
    });
    getPokemons({ page: this.state.pokemonCurrentPage }).then(pokemons =>
      this.setState(prevState => ({
        pokemons: prevState.pokemons.concat(pokemons),
        pokemonLoadingStatus: 'idle'
      }))
    );
  };

  componentDidMount() {
    this.loadMorePokemonsData();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.pokemonCurrentPage !== this.state.pokemonCurrentPage) {
      this.loadMorePokemonsData();
    }
  }

  loadMorePokemons = () => {
    if (this.state.pokemonLoadingStatus === 'idle') {
      this.setState(prevState => ({
        pokemonCurrentPage: prevState.pokemonCurrentPage + 1
      }));
    }
  };

  render() {
    return this.props.render({
      status: this.state.pokemonLoadingStatus,
      pokemons: this.state.pokemons,
      loadMorePokemons: this.loadMorePokemons
    });
  }
}
