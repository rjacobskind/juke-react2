import React from 'react';
import initialState from '../initialState';
import {Link} from 'react-router';
import axios from 'axios';
import Albums from './Albums';
import Album from './Album';
import Songs from './Songs';
import {convertAlbums, convertSong} from '../utils';


export default class Artist extends React.Component{
  constructor (props){
    super (props)

    this.state = {artist: {},
                  albums: [],
                  songs: []
                  };
  }

  componentDidMount(){
    const artistId = this.props.routeParams.artistId;

    axios.get(`/api/artists/${artistId}`)
    .then(res => res.data)
    .then(artist => {
      this.setState({artist: artist})
    })
    .catch(console.error);

    axios.get(`/api/artists/${artistId}/albums`)
    .then(res => res.data)
    .then(albums => {
      convertAlbums(albums)
      this.setState({albums: albums})
    })
    .catch(console.error);

    axios.get(`/api/artists/${artistId}/songs`)
    .then(res => res.data)
    .then(songs => {
      songs = songs.map(song => convertSong(song))
      this.setState({songs: songs});
    })
    .catch(console.error);
  }



  render(){
    const album = this.state.album;
    const currentSong = this.state.currentSong;
    const isPlaying = this.props.isPlaying;
    const toggleOne = this.props.toggleOne;

    return (
      <div>
        <h3>ARTIST NAME</h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
        <Songs
          songs = {album.songs}
          currentSong = {currentSong}
          isPlaying = {isPlaying}
          toggleOne = {toggleOne}
        />
      </div>
    )
  }
}
