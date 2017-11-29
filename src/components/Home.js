import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// import Counter from './Counter';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Helmet>
          <title>Home | Hansel De La Cruz</title>
        </Helmet>
        <p>Home</p>
      </div>
    );
  }
}

export default Home;
