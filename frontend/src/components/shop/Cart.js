import React, { useState, useEffect } from "react";
import useHttp from "../../http/useHttp";
import useCarts from "../../http/useCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  // const [loading, err, products] = useProducts();
  const { isLoading: loading, error: err, Carts } = useCarts();
  const { isLoading, error, sendRequest } = useHttp();
  const [show, setShow] = useState(false);
  // console.log(Carts,"Cart");
  const deleteItemHandler = (productId) => {
    const requestConfig = {
      url: "http://localhost:5000/api/delete",
      method: "POST", // Hoặc "DELETE" nếu backend hỗ trợ
      headers: { "Content-Type": "application/json" },
      body: { productId: productId }, // Truyền productId đúng format
    };

    sendRequest(requestConfig, (responseData) => {
      // Sau khi xóa thành công, cập nhật lại giỏ hàng hoặc xử lý tương tự
      console.log("", responseData);
    });
    setShow(true);
    // navigate("/shop/cart");
    window.location.reload();
  };

  return (
    <div>
      <main>
        {loading && <p>Đang tải...</p>}
        {err && <p>Lỗi: {err.message}</p>}
        {!loading &&
          !err &&
          (Carts.length > 0 ? (
            <ul>
              {Carts.map((p) => (
                <li key={p.productData.id}>
                  <p>
                    {p.productData.title} ({p.qty})
                  </p>
                  <button
                    className="btn"
                    onClick={() => deleteItemHandler(p.productData.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <h1>Giỏ hàng trống!</h1>
          ))}
      </main>
    </div>
  );
};

export default Cart;
