import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag'

import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongdelete(id) {
        this.props.mutate({
            variables: { id }
        }).then(() => this.props.data.refetch()); // an alternative to refetch 2nd parameter in SongCreate.js

    }


    rendersongs() {
        return this.props.data.songs.map(({id, title} )=> (
            <li key={id} className="collection-item">
                <Link to={`/song/${id}`}>
                    {title}
                </Link>
                
                <i className="material-icons"
                    onClick={() => this.onSongdelete(id)}>
                    delete
                </i>
            </li>
        ))
    } 

  render() {
    if (this.props.data.loading) {
        return <div>Loading...</div>;
    }

    return (
    <div>        
      <ul className="collection">
        {this.rendersongs()}       
      </ul>
      <Link to="/songs-create" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link> 
    </div>
    )
  }
}

const mutation = gql`
    mutation Deletesong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

// weirdo, to call mutation and query
export default graphql(mutation)(graphql(query)(SongList));
