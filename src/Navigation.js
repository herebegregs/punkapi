import React from 'react';

class Navigation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          pagination: false,
        };
    }
    render () {
        const { pagination } = this.state;
        return (
            <div className="nav">
                <button>
                    List All
                </button>
                <button>
                    Random
                </button>
                {pagination &&
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