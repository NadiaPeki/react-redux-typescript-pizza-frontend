import React, { useEffect, useRef } from 'react';
import qs, { ParsedQs } from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFilter, setFilters } from '../redux/slices/filterSlice.js';
import Categories from '../components/Categories.tsx';
import Sort from '../components/Sort.tsx';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';
import { sortList } from '../components/Sort.tsx';
import { fetchPizzas, setPagination } from '../redux/slices/pizzasSlice.js';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const pizzas = useSelector((state) => state.pizzas.items);
  const { status, pagination } = useSelector((state) => state.pizzas);
  const totalPages = useSelector((state) => state.pizzas.pagination.totalPages);

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue !== '' ? `search=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!currentPage) {
      const params = qs.parse(window.location.search.substring(1));
      let currentPageFromURL: number | undefined;
      if (typeof params.currentPage === 'string') {
        currentPageFromURL = parseInt(params.currentPage, 10);
      }
      if (currentPageFromURL !== undefined && !isNaN(currentPageFromURL)) {
        dispatch(setFilters({ currentPage: currentPageFromURL }));
      }
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (status === 'success' && pagination && pagination.next && pagination.next.page) {
      dispatch(setPagination(pagination.next.page));
    }
  }, [status, pagination, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [categoryId, sortType, searchValue, currentPage, totalPages]);

  const items = Array.isArray(pizzas)
    ? pizzas.map((item) => <PizzaBlock {...item} key={item.id} />)
    : null;

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error occurred!</h2>
          <p>Failed to load pizzas... Please, try again later.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : items}</div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};

export default Home;
