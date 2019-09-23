import React from 'react';

export const Pokemon = ({ name, thumbnail }) => (
  <section className="pokemon nes-container with-title is-centered">
    <h3 className="pokemon-name title">{name}</h3>
    <img
      className="pokemon-thumbnail"
      src={thumbnail}
      alt=""
      loading="lazy"
      width={100}
      height={100}
    />
  </section>
);
