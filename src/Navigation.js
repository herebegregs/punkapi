import React from 'react';

class Navigation extends React.Component{
    render () {
        return (
            <div className="nav">
                { this.props.isListView ? 
                    (<button onClick={() => this.props.fetchRandom(true , null)}>
                        Random
                    </button>
                    ) : ( 
                    <button onClick={() => this.props.fetchRandom(false , null)}>
                        List All
                    </button>
                    )
                }
                {this.props.isPaginated &&
                    <div className="pagination-cluster">
                        <button>
                            Prev
                        </button>
                        <button>
                            Next
                        </button>
                    </div>
                }
            </div>
        );
    }
}
export default Navigation;