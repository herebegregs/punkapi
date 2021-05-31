import React from 'react';

class FetchList extends React.Component {

    componentDidMount(){
        this.props.listFetcher();
    }
    render(){
        const {hasError, isLoaded, data, setPageParams} = this.props
        if(hasError) {
            return <h1 className="message">Error: { hasError } :(</h1>;
        } else if (!isLoaded) {
            return <h1 className="message">Loading</h1>;
        } else {
            return ( 
                <ul className="beer-list">
                {data.map((item) =>(
                    <li className="beer" key={item.id} onClick={() => setPageParams(true, item.id)}>
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