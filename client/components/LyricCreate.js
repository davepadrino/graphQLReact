import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';


class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        }).then(() => this.setState({content: ''}))
    }

    render() {

    return (
        <form  onSubmit={(ev) => this.onSubmit(ev)}>
            <label>Add a Lyric</label>
            <input type="text" 
                value={this.state.content}
                onChange={ev => this.setState({content: ev.target.value})}
            />
        </form>
    )
  }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);
