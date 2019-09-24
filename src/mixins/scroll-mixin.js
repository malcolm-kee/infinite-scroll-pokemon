/**
 * `ScrollMixin` will add `scrollMarginBottom` properties to state, which is
 * the height between the bottom of the viewport and the bottom of the full page.
 *
 * Note that `scrollMarginBottom` will only be updated when user scroll the page;
 * it will not be updated automatically if page height is increased when dynamic
 * contents are loaded.
 */
export const ScrollMixin = {
  // initialize `scrollMarginBottom` state
  getInitialState: function() {
    return {
      scrollMarginBottom: 0
    };
  },
  // custom method to update `scrollMarginBottom` based on scroll position
  _handleScroll: function() {
    this.setState({
      scrollMarginBottom:
        document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop)
    });
  },
  // start listenining to window `scroll` event
  componentDidMount: function() {
    window.addEventListener('scroll', this._handleScroll);
  },
  // stop listening to window `scroll` event
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._handleScroll);
  }
};
