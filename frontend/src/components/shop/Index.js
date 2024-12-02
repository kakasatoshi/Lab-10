import React from "react";
import AddToCart from "../includes/AddToCart"; // Separate AddToCart component
import "../../css/product.css";
import useProducts from "../../http/useProduct";
const Index = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch products: {error.message}</p>;
  }

  // console.log(products);

  return (
    <div>
      <main>
        {products.length > 0 ? (
          <div className="grid">
            {products.map((product) => (
              <article className="card product-item" key={product.id}>
                <header className="card__header">
                  <h1 className="product__title">{product.title}</h1>
                </header>
                <div className="card__image">
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="card__content">
                  <h2 className="product__price">${product.price}</h2>
                  <p className="product__description">{product.description}</p>
                </div>
                <div className="card__actions">
                  <AddToCart product={product} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <h1>No Products Found!</h1>
        )}
      </main>
    </div>
  );
};

export default Index;
