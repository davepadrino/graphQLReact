import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';



class SongDetail extends Component {
  render() {
    const {song, loading} = this.props.data;
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Link to="/"> Back </Link>
            <h3>{song.title}</h3>
            <LyricList lyrics={song.lyrics} />
            <LyricCreate songId={this.props.params.id}/>
        </div>
    )
  }
}

export default graphql(fetchSong, {
    // pass params from parent component to graph, and after that to the current component
    // doing querys for a particular record using info from the URL
    options: props => ({variables: { id: props.params.id}}) 
})(SongDetail);