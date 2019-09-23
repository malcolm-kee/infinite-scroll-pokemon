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
