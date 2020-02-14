import React from 'react';
import './SearchResults.css'
import TrackList from '../TrackList/TrackList'

class SearchResults extends React.Component {
    seeData () {console.log(this.props.searchResults);}    



    render() {
        this.seeData();
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList searchResults={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
            </div>
        )
    }
};

export default SearchResults;