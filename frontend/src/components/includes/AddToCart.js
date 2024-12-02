import React, { useState } from "react";
import useHttp from "../../http/useHttp";

const AddToCart = (prods) => {
  console.log(prods);
  const [id, setId] = useState(prods.product.id); // Lấy productId từ props của component AddToCart
  // const productId = productId;
  const { isLoading: loading, error: err, sendRequest } = useHttp();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., make an API call or use fetch()
    const requestConfig = {
      url: "http://localhost:5000/api/postCart",
      method: "POST", // Hoặc "DELETE" nếu backend hỗ trợ
      headers: { "Content-Type": "application/json" },
      // console.log: true
      body: { id: id }, // Truyền productId đúng format
    };

    sendRequest(requestConfig, (responseData) => {
      // Sau khi xóa thành công, cập nhật lại giỏ hàng hoặc xử lý tương tự
      console.log("", responseData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn" type="submit">
        Add to Cart
      </button>
      <input type="hidden" name="productId" value={id} />
    </form>
  );
};

export default AddToCart;
