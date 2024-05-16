import React from 'react';
import { Link } from 'react-router-dom';
import cartEmpryImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Cart empty <i>😕</i>
        </h2>
        <p>
          Most likely, you haven't ordered pizza yet.
          <br />
          To order pizza, please go to the main page.
        </p>
        <img src={cartEmpryImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
