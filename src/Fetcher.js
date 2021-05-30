import React from 'react';
import Navigation from './Navigation.js';
import FetchList from './FetchList.js';
import FetchSingle from './FetchSingle.js';

class Fetcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListView: true,
            id: null,
            isRandom: false,
            listItems: [],
            page: 1,
            isPaginated: true,
            isLoaded: false,
            fetchUrl: "https://api.punkapi.com/v2/beers"
        }
    }
    
    

    beerFetch = () => {
        console.log("beer fetching: ", this.state.fetchUrl);
        fetch(this.state.fetchUrl)
        .then(response => response.json())
        .then(
            (data) => {
                console.log("data: ", data);
                this.setState({
                    isLoaded: true,
                    listItems: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    generateFetch = (isSingle, id) => {
        const baseUrl = "https://api.punkapi.com/v2/beers";
        if(!isSingle){
            this.setState({
                fetchUrl: (baseUrl+"?page="+this.state.page),
                isListView: true,
                isPaginated: true,
                listItems: []
            });
        } else {
            if(id) {
                this.setState({
                    fetchUrl: (baseUrl+"?ids="+id),
                    isListView: false,
                    isPaginated: false,
                    id: id,
                    listItems: []
                });
            } else {
                this.setState({fetchUrl: (baseUrl+"/random"),
                isListView: false,
                isPaginated: false,
                listItems: []
            });
            }
        }
    }

    render(){        
        const { isListView } = this.state;
        return (
            <div className="wrapper">
            { isListView ?
                (
                    <FetchList 
                    recordRowId={this.generateFetch}
                    listFetcher={() => this.beerFetch()}
                    listItems={this.state.listItems}
                    isLoaded={this.state.isLoaded}
                    />
                ) : (
                    <FetchSingle 
                    id={this.state.id}
                    listItems={this.state.listItems}
                    isLoaded={this.state.isLoaded}
                    isRandom={this.state.isRandom}
                    fetchSingle={() => this.beerFetch()}
                    />
                )
            }
            <Navigation
            isListView={this.state.isListView}
            isPaginated={this.state.isPaginated}
            fetchRandom={this.generateFetch}
            />
            </div>
        )
    }
}
export default Fetcher;