import React from 'react';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
// import { usePokemonData } from './hooks/use-pokemon-data';
// import { useScroll } from './hooks/use-scroll';
import createClass from 'create-react-class';
import { PokemonDataMixin } from './mixins/pokemon-data-mixin';
import { ScrollMixin } from './mixins/scroll-mixin';

// function App() {
//   const [{ pokemons, status }, loadMorePokemon] = usePokemonData();
//   const marginBottom = useScroll();

//   console.log(marginBottom);

//   React.useEffect(() => {
//     if (marginBottom < 20) {
//       loadMorePokemon();
//     }
//   }, [loadMorePokemon, marginBottom]);

//   return (
//     <>
//       <Header />
//       <div className="container">
//         <div id="pokemon-container">
//           {pokemons.map(pokemon => (
//             <Pokemon {...pokemon} key={pokemon.id} />
//           ))}
//         </div>
//         {status === 'loading' && (
//           <p className="loading-text nes-balloon from-left is-shown">Loading...</p>
//         )}
//       </div>
//     </>
//   );
// }
const App = createClass({
  mixins: [PokemonDataMixin, ScrollMixin],
  componentDidUpdate: function(_, prevState) {
    if (
      this.state.scrollMarginBottom !== prevState.scrollMarginBottom &&
      this.state.scrollMarginBottom < 20
    ) {
      this.loadMorePokemons();
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
            <p className="loading-text nes-balloon from-left is-shown">Loading...</p>
          )}
        </div>
      </>
    );
  }
});

export default App;
