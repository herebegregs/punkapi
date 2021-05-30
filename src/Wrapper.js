import React from 'react';
import Fetcher from './Fetcher';

class Wrapper extends React.Component {
    render(){
        return(
            <div className="wrapper">
                <Fetcher/>
            </div>
        );
    }
}
export default Wrapper;