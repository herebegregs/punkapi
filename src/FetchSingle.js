import React from 'react';

class FetchSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          beer_id: null
        };
    }
    
    componentDidMount(){
        fetch('https://api.punkapi.com/v2/beers/random')
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
        console.log("single name: ", this.props.name);
        console.log(this.state.items)
        const { error, isLoaded, items } = this.state;
        if(error) {
            return <li>Error: { error.message }</li>;
        } else if (!isLoaded) {
            return <li>Loading</li>;
        } else {
            return ( 
                <div>
                    {items.map((item) =>(
                        <div key={item.id} className="beer">
                            <p >
                                {item.name}
                            </p>
                            <p>
                                {item.tagline}
                            </p>
                            <figure>
                                <img src={item.image_url} alt={item.name}/>
                            </figure>
                            <p>
                                {item.description}
                            </p>
                            <p>
                                {item.brewers_tips}
                            </p>
                            <p>Ingredients</p>
                            <p>Malt:</p>
                            <ul>
                            {item.ingredients.malt.map((malt, index) =>
                                <li key={index}>{malt.name} - {malt.amount.value} {malt.amount.unit}</li>
                                )}
                            </ul>
                            <p>Hops:</p>
                            <ul>
                            {item.ingredients.hops.map((hops, index) =>
                                    <li key={index}>{hops.name} - {hops.amount.value} {hops.amount.unit}</li>
                                    )}
                                    </ul>
                            <p>Yeast: {item.ingredients.yeast}</p>
                            <p>Food pairing</p>
                            <ul>
                            {item.food_pairing.map((food, index) =>
                                    <li key={index}>{food}</li>
                                    )}
                                    </ul>
                        </div>
                    ))}
                </div>
            );
        }
    }
} 
export default FetchSingle;