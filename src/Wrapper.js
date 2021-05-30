import React from 'react';
import Fetcher from './Fetcher';
import Navigation from './Navigation';

class Wrapper extends React.Component {
    render(){
        return(
            <div className="wrapper">
                <Fetcher/>
                <Navigation />
            </div>
        );
    }
}
export default Wrapper;