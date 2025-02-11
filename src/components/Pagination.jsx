import ReactPaginate from 'react-paginate';

const Pagination = ({ handlePageClick }) => {

  return (
    <div className='wrapper-pagination'>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={10}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default Pagination
