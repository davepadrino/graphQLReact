import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';




class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state= {
            title: ''
        }
    }
    
    onSubmit(ev) {
        ev.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            // to re-reun queries and fetch the updated data
            refetchQueries: [{ query }] // runs a query not directly asociated to the current component
        })
        .then(()=> hashHistory.push("/"))
        .catch(err => console.log(err));

    }
    
    render() {


        return (
        <div>
            <Link to="/">Back</Link>
            <h3>CREATE NEW SONG</h3>
            <form onSubmit={(ev) => this.onSubmit(ev)}>
                <label>Song title:</label>
                <input type="text" 
                    onChange = {ev => this.setState({title: ev.target.value})}
                    value={this.state.title} 
                />
            </form>
        </div>
        )
  }
}

// write this mutiaton this way so we can communicate inner component with this external variable
const mutation = gql`
    mutation Addsong($title: String){
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);