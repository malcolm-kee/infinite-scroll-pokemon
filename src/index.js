import React from 'react';
import ReactDOM from 'react-dom';
import 'nes.css/css/nes.css';
import './index.css';
/**
 * # Extract out reusable stateful logic
 * - so you can reuse same logic in multiple components
 * - so you can separate out big components into smaller units that can be
 *   understand and tested independently
 */
import { App } from './classic-app'; // legacy way - mixin
// import { App } from './es6-app'; // pre-hook way - render props
// import { App } from './hook-app'; // hook way - custom hook

/**
 * # Why is this important?
 * - understand why hook is introduced
 * - understand legacy codebase that use older pattern
 */
ReactDOM.render(<App />, document.getElementById('root'));
