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
            currentPage: 1,
            isPaginated: true,
            isLoaded: false,
            error: null,
            fetchUrl: "https://api.punkapi.com/v2/beers?per_page=20"
        }
    }
    

    beerFetch = () => {
        console.log("beer fetching: ", this.state.fetchUrl);
        fetch(this.state.fetchUrl)
        .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              return Promise.reject(response.status)
            }
          })
        .then(
            (data) => {
                console.log("data: ", data);
                this.setState({
                    isLoaded: true,
                    listItems: data
                });
            },
        )
        .catch(error => {
            console.log('error is', error);
            this.setState({
                isLoaded: true,
                error: error
            });
        }
        );
    }

    generateFetch = (isSingle, id, page) => {
        const baseUrl = "https://api.punkapi.com/v2/beers";
        if(!isSingle){
            this.setState({
                fetchUrl: (baseUrl+"?per_page=20&page="+page),
                isListView: true,
                isPaginated: true,
                currentPage: page,
                listItems: [],
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
        console.log("currentpage: ", this.state.currentPage);
        return (
            <div className="wrapper">
            { isListView ?
                (
                    <FetchList 
                    recordRowId={this.generateFetch}
                    listFetcher={() => this.beerFetch()}
                    hasError={this.state.error}
                    listItems={this.state.listItems}
                    isLoaded={this.state.isLoaded}
                    />
                ) : (
                    <FetchSingle 
                    id={this.state.id}
                    hasError={this.state.error}
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
            currentPage={this.state.currentPage}
            listFetcher={() => this.beerFetch()}
            loadPage={this.generateFetch}
            />
            </div>
        )
    }
}
export default Fetcher;