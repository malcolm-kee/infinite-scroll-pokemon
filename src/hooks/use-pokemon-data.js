import React from 'react';
import { getPokemons } from '../service';

const pokemonDataReducer = (state, action) => {
  switch (action.type) {
    case 'loadMore':
      return {
        ...state,
        status: 'loading',
        page: state.status === 'idle' ? state.page + 1 : state.page
      };

    case 'loaded':
      return {
        ...state,
        status: 'idle',
        pokemons: state.pokemons.concat(action.payload)
      };

    case 'error':
      return {
        ...state,
        status: 'error'
      };

    default:
      throw new Error(`action type not supported for pokemonDataReducer: ${action.type}`);
  }
};

export const usePokemonData = () => {
  const [state, dispatch] = React.useReducer(pokemonDataReducer, {
    status: 'loading',
    pokemons: [],
    page: 1
  });

  const loadMore = React.useCallback(
    () =>
      dispatch({
        type: 'loadMore'
      }),
    []
  );

  React.useEffect(() => {
    getPokemons({ page: state.page })
      .then(pokemons =>
        dispatch({
          type: 'loaded',
          payload: pokemons
        })
      )
      .catch(() =>
        dispatch({
          type: 'error'
        })
      );
  }, [state.page]);

  return [state, loadMore];
};
