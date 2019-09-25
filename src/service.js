import axios from 'axios';

export const getPokemons = ({ page = 1, limit = 5 } = {}) =>
  axios(`https://pokemon-json.herokuapp.com/api/pokemons`, {
    params: {
      _page: page,
      _limit: limit
    }
  }).then(res => res.data);
