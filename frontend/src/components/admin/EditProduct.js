import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/forms.css";
import { useLocation } from "react-router-dom";

function EditProduct() {
  const location = useLocation();
  const { editing, product } = location.state || {};
  // console.log(`Edit Product`, editing, product);
  const [title, setTitle] = useState(editing ? product.title : "");
  const [imageUrl, setImageUrl] = useState(editing ? product.imageUrl : "");
  const [price, setPrice] = useState(editing ? product.price : "");
  const [description, setDescription] = useState(
    editing ? product.description : ""
  );
  const [productId, setProductId] = useState(editing ? product.id : "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editing
      ? `http://localhost:5000/admin/edit-product`
      : "http://localhost:5000/admin/add-product";
    const payload = {
      productId: editing ? product.id : null,
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
      productId: editing ? productId : undefined,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Redirect to product list after successful submission.
        // console.log("ok", response);
        navigate("/admin/ProductList");
      } // Redirect to product list
    } catch (error) {
      console.error("Error submitting form", error);
    }
    navigate("/admin/ProductList");
  };

  return (
    <main>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {editing && <input type="hidden" value={productId} name="productId" />}

        <button className="btn" type="submit">
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </main>
  );
}

export default EditProduct;
