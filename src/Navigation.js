import React from 'react';

const Navigation = ({
    setPageParams, 
    fetchData, 
    currentPage,
    baseUrl,
    isPaginated,
    isListView
}) => {    
    const loadPage = (page) => {
        setPageParams(false , null, page);
        fetchData(baseUrl+"?per_page=20&page="+page);
    };
    return (
        <div className="nav">
                { isListView ? 
                    (<button onClick={() => setPageParams(true , null)}>
                        Random
                    </button>
                    ) : ( 
                    <button onClick={() => setPageParams(false , null, currentPage)}>
                        List All
                    </button>
                    )
                }
                {isPaginated &&
                    <div className="pagination-cluster">
                        {currentPage > 1 && 
                            <button onClick={() => loadPage(currentPage - 1)}>
                                Prev
                            </button>
                        } 
                        <button onClick={() => loadPage(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                }
            </div>
    );
};
export default Navigation;
