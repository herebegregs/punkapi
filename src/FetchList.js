import React from 'react';

class FetchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    
    componentDidMount(){
        fetch('https://api.punkapi.com/v2/beers')
        .then(response => response.json())
        .then(
            (data) => {
                //console.log(data);
                this.setState({
                    isLoaded: true,
                    items: data
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
    render(){
        console.log("items: ", this.state.items)
        const { error, isLoaded, items } = this.state;
        if(error) {
            return <li>Error: { error.message }</li>;
        } else if (!isLoaded) {
            return <li>Loading</li>;
        } else {
            return ( 
                <ul>
                {items.map((item) =>(
                    <li key={item.id} onClick={() => this.props.fetchSingle(item.id)}>
                        ID: {item.id} {item.name} {item.tagline} - 
                    </li>
                    ))}
                </ul>
            );
        }
    }
} 
export default FetchList;