import React from 'react';

class FetchSingle extends React.Component {

    componentDidMount(){
        if(!this.props.isRandom){
            this.props.fetchSingle();
        } else {
            this.props.fetchRandom();
        }
    }

    render(){
        if(this.props.hasError) {
            return <h1 className="error-message">Error: { this.props.hasError } :(</h1>;
        } else if (!this.props.isLoaded) {
            return <p>Loading</p>;
        } else {
            return ( 
                <div>
                    {this.props.listItems.map((item) =>(
                        <div key={item.id} className="single-beer">
                            <aside className="nametag text">
                                <h3>
                                    {item.name}
                                </h3>
                                <h5>
                                    {item.tagline}
                                </h5>
                            </aside>
                            <figure className="image">
                                <img src={item.image_url} alt={item.name}/>
                            </figure>
                            <article className="desc text">
                                <h5>Description:</h5>
                                <p>
                                    {item.description}
                                </p>
                                <h5>Brewer's notes:</h5>
                                <p className="notes text">
                                    "{item.brewers_tips}"
                                </p>
                            </article>
                            <aside className="ingredients text">
                                <h5>Ingredients</h5>
                                <p className="ingredient">Malt:</p>
                                <ul>
                                {item.ingredients.malt.map((malt, index) =>
                                    <li key={index}>{malt.name} - {malt.amount.value} {malt.amount.unit}</li>
                                    )}
                                </ul>
                                <p className="ingredient">Hops:</p>
                                <ul>
                                {item.ingredients.hops.map((hops, index) =>
                                        <li key={index}>{hops.name} - {hops.amount.value} {hops.amount.unit}</li>
                                        )}
                                        </ul>
                                <p className="ingredient">Yeast:</p>
                                <ul>
                                    <li>{item.ingredients.yeast}</li>
                                </ul>
                            </aside>
                            <article className="food">
                                <h5>Pairs well with:</h5>
                                <ul>
                                    {item.food_pairing.map((food, index) =>
                                        <li key={index}>{food}</li>
                                        )}
                                </ul>
                            </article>
                        </div>
                    ))}
                </div>
            );
        }
    }
} 
export default FetchSingle;