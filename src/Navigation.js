import React from 'react';

class Navigation extends React.Component{
    render () {
        console.log("currentpage ", this.props.currentPage);
        return (
            <div className="nav">
                { this.props.isListView ? 
                    (<button onClick={() => this.props.loadPage(true , null)}>
                        Random
                    </button>
                    ) : ( 
                    <button onClick={() => this.props.loadPage(false , null, this.props.currentPage)}>
                        List All
                    </button>
                    )
                }
                {this.props.isPaginated &&
                    <div className="pagination-cluster">
                        {this.props.currentPage > 1 && 
                            <button onClick={() => this.props.loadPage(false , null, (this.props.currentPage - 1))}>
                                Prev
                            </button>
                        } 
                        <button onClick={() => this.props.loadPage(false , null, (this.props.currentPage + 1))}>
                            Next
                        </button>
                    </div>
                }
            </div>
        );
    }
}
export default Navigation;