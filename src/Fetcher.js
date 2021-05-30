import React from 'react';
import FetchList from './FetchList.js';
import FetchSingle from './FetchSingle.js';

class Fetcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchView: "list",
            id: null,
            random: false,
            listItems: []

        }
    }
    
    url = "https://api.punkapi.com/v2/beers";
    
    beerFetch = (url) => {
        console.log("beer fetching: ", url);
        fetch(url)
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

    fetchSingle = (id) => {
        console.log("id = ", id)
        this.setState({fetchView:"single"});
        this.setState({id: id})
    }
    render(){
        const { fetchView } = this.state;
        if(fetchView === "list"){
            return (
                <FetchList 
                    fetchSingle={this.fetchSingle}
                    fetchList={() => this.beerFetch(this.url)}
                    listItems={this.state.listItems}
                    isLoaded={this.state.isLoaded}
                />
            )
        } else if(fetchView === "single") {
            return (
                <FetchSingle 
                    id={this.state.id}
                    fetchSingle={() => this.beerFetch(this.url+"?ids="+this.state.id)}
                    listItems={this.state.listItems}
                    isLoaded={this.state.isLoaded}
                />
            )
        }
    }
}
export default Fetcher;