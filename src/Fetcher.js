import React from 'react';
import FetchList from './FetchList.js';
import FetchSingle from './FetchSingle.js';

class Fetcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchView: "list",
            id: null,
            random: false
        }
    }
    
    fetchSingle = (id) => {
        console.log("name ", id)
        this.setState({fetchView:"single"});
        this.setState({id: id})
    }
    render(){
        const { fetchView } = this.state;
        if(fetchView === "list"){
            return (
                <FetchList 
                    fetchSingle={this.fetchSingle}
                />
            )
        } else if(fetchView === "single") {
            return (
                <FetchSingle 
                    name={this.state.id}
                />
            )
        }
    }
}
export default Fetcher;