import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filter/slice';
import styles from './Pagination.module.scss';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const dispatch = useDispatch();

  const onChangePage = (event: number) => {
    dispatch(setCurrentPage(event));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={totalPages}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
