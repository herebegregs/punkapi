import React from 'react';

class FetchSingle extends React.Component {

    componentDidMount(){
        this.props.fetchSingle();
        console.log("single props: ", this.props)
    }

    render(){
        console.log("single name: ", this.props.name);
        console.log(this.props.items)
        if(this.props.error) {
            return <li>Error: { this.props.error.message }</li>;
        } else if (!this.props.isLoaded) {
            return <li>Loading</li>;
        } else {
            return ( 
                <div>
                    {this.props.listItems.map((item) =>(
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