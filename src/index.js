import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      selectedArtist: '',
    };
  }
  async componentDidMount() {
    const artists = (await axios.get('/artist')).data;
    //const performance = (await axios.get('/artist/performance/:id')).data;
    this.setState({ artists });
    window.addEventListener('hashchange', () => {
      this.setState({ selectedArtist: window.location.hash.slice(1) });
    });
  }
  render() {
    const { artists } = this.state;
    return (
      <div>
        <h1>27 Club Artists</h1>
        <ul id="list">
          {artists.map((artist) => (
            <li key={artist.id}>
              <a href={`#${artist.id}`}>
                {' '}
                {artist.first_name + ' ' + artist.last_name}{' '}
                <div className="image">
                  <img src={`../public/${artist.image_Url}`} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
