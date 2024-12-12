import React, { useState } from "react";
import "../../css/product.css";
import useProducts from "../../http/useProduct";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const { products, isLoading, error } = useProducts();
  console.log(products);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch products: {error.message}</p>;
  }

  const deleteProductHandler = async (productId) => {
    const url = "http://localhost:5000/admin/delete-product";
    const payload = {
      productId: productId,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) navigate("/admin/ProductList"); // Redirect to product list
    } catch (error) {
      console.error("Error submitting form", error);
    }
    // navigate("/admin/ProductList");
    window.location.reload();
  };

  const editProductHandler = (product) => {
    navigate(`/admin/EditProduct/${product.id}`, {
      state: { editing: true, product: product },
    });
  };

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
                  <button
                    className="btn"
                    onClick={() => editProductHandler(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => deleteProductHandler(product.id)}
                  >
                    Delete
                  </button>
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

export default ProductList;
