import React from 'react';

class FetchList extends React.Component {

    componentDidMount(){
        this.props.listFetcher();
        console.log("listFetcher", this.props);
    }
    render(){
        console.log("items: ", this.props.listItems)
        if(this.props.hasError) {
            return <h1 className="error-message">Error: { this.props.hasError } :(</h1>;
        } else if (!this.props.isLoaded) {
            return <li>Loading</li>;
        } else {
            return ( 
                <ul className="beer-list">
                {this.props.listItems.map((item) =>(
                    <li className="beer" key={item.id} onClick={() => this.props.recordRowId(true, item.id)}>
                        <article>
                            <h5>{item.name}</h5>
                            <p>{item.tagline}</p>
                        </article>
                        <figure >
                            <img src={item.image_url} alt={item.name} />
                        </figure>
                    </li>
                    ))}
                </ul>
            );
        }
    }
} 
export default FetchList;