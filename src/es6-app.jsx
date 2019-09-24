import React from 'react';
import { Balloon } from './components/balloon';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { getPokemons } from './service';
import { Button } from './components/button';
import { Text } from './components/text';
import { Toolbar } from './components/toolbar';

/**
 * Even though simple, mixin has few disadvantages:
 * - potential name clashing
 * - you can't use same mixin more than once in a component; there is only one `state` in
 *   a component that you can mess with
 * - hard to trace state/methods
 *
 * As a result, when React move to use `class` syntax, they deprecate
 * the mixin mechanism.
 *
 * To extract out reusable logic in `class` syntax, the pattern
 * to use is called "render props", which overcome the mixin disadvantages:
 * - no name clashing in render props
 * - you can use same render props multiple times in a component
 * - you can trace the state/methods
 *
 * Let's see what is render props in the code below, which has same
 * functionality as the previous application, just rewritten in `class`
 * syntax.
 */

export class App extends React.Component {
  state = {
    status: 'loading',
    currentPage: 1,
    pokemons: []
  };

  fetchMorePokemons = () => {
    this.setState({
      status: 'loading'
    });

    getPokemons({ page: this.state.currentPage })
      .then(pokemons =>
        this.setState(prevState => ({
          pokemons: prevState.pokemons.concat(pokemons),
          status: 'idle'
        }))
      )
      .catch(err =>
        this.setState(
          {
            status: 'error'
          },
          () => console.error(err)
        )
      );
  };

  componentDidMount() {
    this.fetchMorePokemons();
  }

  loadMorePokemons = () => {
    if (this.state.status === 'idle') {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
    }
  };

  componentDidUpdate(_, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.fetchMorePokemons();
    }
  }

  render() {
    const { pokemons, status } = this.state;

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
            <Button onClick={this.loadMorePokemons}>Load More</Button>
          </Toolbar>
        </div>
      </>
    );
  }
}
