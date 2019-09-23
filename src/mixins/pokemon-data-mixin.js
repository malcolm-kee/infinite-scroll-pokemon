import { getPokemons } from '../service';

export const PokemonDataMixin = {
  getInitialState: function() {
    return {
      pokemonLoadingStatus: 'idle',
      pokemonCurrentPage: 1,
      pokemons: []
    };
  },
  loadMorePokemonsData: function() {
    this.setState({
      pokemonLoadingStatus: 'loading'
    });
    getPokemons({ page: this.state.pokemonCurrentPage }).then(pokemons =>
      this.setState(prevState => ({
        pokemons: prevState.pokemons.concat(pokemons),
        pokemonLoadingStatus: 'idle'
      }))
    );
  },
  componentDidMount: function() {
    this.loadMorePokemonsData();
  },
  componentDidUpdate: function(_, prevState) {
    if (prevState.pokemonCurrentPage !== this.state.pokemonCurrentPage) {
      this.loadMorePokemonsData();
    }
  },
  loadMorePokemons: function() {
    if (this.state.pokemonLoadingStatus === 'idle') {
      this.setState(prevState => ({
        pokemonCurrentPage: prevState.pokemonCurrentPage + 1
      }));
    }
  }
};
