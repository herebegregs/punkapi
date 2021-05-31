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
    
    baseUrl = "https://api.punkapi.com/v2/beers";

    beerFetch = (url) => {
        fetch(url)
        .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              return Promise.reject(response.status)
            }
          })
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    listItems: data
                });
            },
        )
        .catch(error => {
            this.setState({
                isLoaded: true,
                error: error
            });
        }
        );
    }

    generateFetch = (isSingle, id, page) => {
        if(!isSingle){
            this.setState({
                fetchUrl: (this.baseUrl+"?per_page=20&page="+page),
                isListView: true,
                isPaginated: true,
                currentPage: page,
                listItems: [],
                isLoaded: false
            });
        } else {
            if(id) {
                this.setState({
                    fetchUrl: (this.baseUrl+"?ids="+id),
                    isListView: false,
                    isPaginated: false,
                    id: id,
                    listItems: [],
                    isLoaded: false
                });
            } else {
                this.setState({fetchUrl: (this.baseUrl+"/random"),
                isListView: false,
                isPaginated: false,
                listItems: [],
                isLoaded: false
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
                        listFetcher={() => this.beerFetch(this.state.fetchUrl)}
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
                        fetchSingle={() => this.beerFetch(this.state.fetchUrl)}
                    />
                )
            }
            <Navigation
                isListView={this.state.isListView}
                isPaginated={this.state.isPaginated}
                currentPage={this.state.currentPage}
                listFetcher={() => this.beerFetch(this.state.fetchUrl)}
                loadPage={this.generateFetch}
                baseUrl={this.baseUrl}
                beerFetch={this.beerFetch}
            />
            </div>
        )
    }
}
export default Fetcher;