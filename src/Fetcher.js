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
            data: [],
            currentPage: 1,
            isPaginated: true,
            isLoaded: false,
            error: null,
            fetchUrl: "https://api.punkapi.com/v2/beers?per_page=20"
        }
    }
    
    baseUrl = "https://api.punkapi.com/v2/beers";

    fetchData = (url) => {
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
                    data: data
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

    setPageParams = (isSingle, id, page) => {
        if(!isSingle){
            this.setState({
                fetchUrl: (this.baseUrl+"?per_page=20&page="+page),
                isListView: true,
                isPaginated: true,
                currentPage: page,
                data: [],
                isLoaded: false
            });
        } else {
            if(id) {
                this.setState({
                    fetchUrl: (this.baseUrl+"?ids="+id),
                    isListView: false,
                    isPaginated: false,
                    id: id,
                    data: [],
                    isLoaded: false
                });
            } else {
                this.setState({fetchUrl: (this.baseUrl+"/random"),
                isListView: false,
                isPaginated: false,
                data: [],
                isLoaded: false
            });
            }
        }
    }

    render(){        
        const {
            isListView,
            error,
            data,
            isLoaded,
            isRandom,
            isPaginated,
            currentPage,
            fetchUrl,
            id
        } = this.state;
        return (
            <div className="wrapper">
            { isListView ?
                (
                    <FetchList 
                        setPageParams={this.setPageParams}
                        listFetcher={() => this.fetchData(fetchUrl)}
                        hasError={error}
                        data={data}
                        isLoaded={isLoaded}
                    />
                ) : (
                    <FetchSingle 
                        id={id}
                        hasError={error}
                        data={data}
                        isLoaded={isLoaded}
                        isRandom={isRandom}
                        fetchSingle={() => this.fetchData(fetchUrl)}
                    />
                )
            }
            <Navigation
                isListView={isListView}
                isPaginated={isPaginated}
                currentPage={currentPage}
                listFetcher={() => this.fetchData(fetchUrl)}
                setPageParams={this.setPageParams}
                baseUrl={this.baseUrl}
                fetchData={this.fetchData}
            />
            </div>
        )
    }
}
export default Fetcher;