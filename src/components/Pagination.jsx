import ReactPaginate from "react-paginate"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { IconContext } from "react-icons"
import { useMemo, useState } from "react"
const Pagination = ({ totalPages }) => {
  const [page, setPage] = useState(0)

  /* const filterData = useMemo(() => {
    return data.filter((item, index) => {
        return (index >= page * totalPages) & (index < (page + 1) * totalPages);
        })
  }, [page]) */

  return (
    <>
      <ReactPaginate
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(totalPages / totalPages)}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
    </>
  )
}

export default Pagination
