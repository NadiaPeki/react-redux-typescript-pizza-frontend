import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, id) => {
          return (
            <li
              onClick={() => onClickCategory(id)}
              className={categoryId === id ? 'active' : ' '}
              key={id}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
