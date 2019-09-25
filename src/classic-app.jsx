import createClass from 'create-react-class';
import React from 'react';
import { Balloon } from './components/balloon';
import { Button } from './components/button';
import { Header } from './components/header';
import { Pokemon } from './components/pokemon';
import { Text } from './components/text';
import { Toolbar } from './components/toolbar';
import { getPokemons } from './service';

/**
 * Mixin is the original approach to extract stateful logic
 * in React. It is intuitive and easy to understand, same mechanism
 * is ported to Vue.
 *
 * Let's understand our current application and then extract the logic
 * out into a mixin.
 */

/**
 * `createClass` is legacy method in React 15, deprecated in React 16.
 */
export const App = createClass({
  // initialize state
  getInitialState: function() {
    return {
      status: 'loading', // track data is loading/idle/error
      currentPage: 1, // pagination parameter
      pokemons: [] // pokemon data
    };
  },
  // custom method to make API call and append it to `pokemons` state
  fetchMorePokemons: function() {
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
      .catch(error =>
        this.setState(
          {
            status: 'error'
          },
          () => console.error(error)
        )
      );
  },
  // get the initial list of pokemons when mounted
  componentDidMount: function() {
    this.fetchMorePokemons();
  },
  // custom method to increment `currentPage` state when `status` is not `loading`/`error`
  loadMorePokemons: function() {
    if (this.state.status === 'idle') {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
    }
  },
  // fetch more pokemon data whenever `currentPage` is changed
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.fetchMorePokemons();
    }
  },
  render: function() {
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
});
