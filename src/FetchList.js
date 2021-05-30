import React from 'react';

class FetchList extends React.Component {
    componentDidMount(){
        this.props.fetchList();
        console.log(this.props)
    }
    render(){
        console.log("items: ", this.props.listItems)
        if(this.props.error) {
            return <li>Error: { this.props.error.message }</li>;
        } else if (!this.props.isLoaded) {
            return <li>Loading</li>;
        } else {
            return ( 
                <ul>
                {this.props.listItems.map((item) =>(
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