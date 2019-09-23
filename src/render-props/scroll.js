import React from 'react';

export class Scroll extends React.Component {
  state = {
    scrollMarginBottom: 0
  };

  handleScroll = () => {
    this.setState({
      scrollMarginBottom:
        document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop)
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return this.props.render({
      marginBottom: this.state.scrollMarginBottom
    });
  }
}
