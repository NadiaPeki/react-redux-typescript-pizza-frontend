import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      console.log('Fetching pizza data...');
      try {
        const response = await fetch(
          'https://react-redux-typescript-pizza-backend-j7u3.vercel.app/api/pizzas/' + id,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch pizza');
        }
        const data = await response.json();
        console.log('Pizza data:', data);
        setPizza(data);
      } catch (error) {
        console.error('Error!', error);
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" width={400} height={400} />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} p.</h3>
    </div>
  );
};

export default FullPizza;
