import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

function Home() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue !== '' ? `search=${searchValue}` : '';

    fetch(
      `https://react-redux-typescript-pizza-backend-j7u3.vercel.app/api/pizzas?page=${currentPage}&${category}&sort=${sortBy}&order=${order}&${search}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data.pizzas);
        if (data.pagination && data.pagination.next && data.pagination.next.page) {
          setTotalPages(data.pagination.next.page);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} totalPages={totalPages} />
    </>
  );
}

export default Home;
