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
  render: function() {
    return null;
  }
});
