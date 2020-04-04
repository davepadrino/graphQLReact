import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: { // optimization, increment number of likes instead of waiting for api response
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes+1
                }
            }
        })

    }

  render() {
    const renderLyrics = () => (
        this.props.lyrics.map(({id, content, likes}) => (
            <li key={id} className="collection-item">
                {content}
                <div className="vote-box">
                    {likes}
                    <i onClick={() => this.onLike(id, likes)}
                    className="material-icons">thumb_up</i>
                </div>
            </li>
        ))    
    );

    return(
      <ul className="collection">
        {renderLyrics()}
      </ul> 
    )
  }
}

const mutation = gql`
    mutation LikeLyrics($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;


export default graphql(mutation)(LyricList);