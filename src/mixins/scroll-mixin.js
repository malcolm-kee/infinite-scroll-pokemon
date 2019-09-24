/**
 * `ScrollMixin` will add `scrollMarginBottom` properties to state, which is
 * the height between the bottom of the viewport and the bottom of the full page.
 *
 * Note that `scrollMarginBottom` will only be updated when user scroll the page;
 * it will not be updated automatically if page height is increased when dynamic
 * contents are loaded.
 */
export const ScrollMixin = {
  getInitialState: function() {
    return {
      scrollMarginBottom: 0
    };
  },
  _handleScroll: function() {
    this.setState({
      scrollMarginBottom:
        document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop)
    });
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this._handleScroll);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._handleScroll);
  }
};
