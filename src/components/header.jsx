import React from 'react';

export const Header = () => (
  <header>
    <div className="container appbar">
      <div>
        <h1>
          <a href="/">React Pokemon App</a>
        </h1>
      </div>
      <div className="github-link">
        <a
          href="https://github.com/malcolm-kee/vanilla-pokemon"
          target="_BLANK"
          rel="nofollow noopener noreferrer"
        >
          <i className="nes-octocat animate"></i>
        </a>
      </div>
    </div>
  </header>
);
