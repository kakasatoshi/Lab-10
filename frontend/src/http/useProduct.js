import { useState, useEffect } from "react";

import useHttp from "./useHttp";

var methodString = "GET";
var str = "http://localhost:5000/api/";
const requestConfig = {
  url: str,
  method: methodString,
};

const useProducts = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const applyData = (data) => {
      const arr = data.map((e) => ({
        id: e.id,
        title: e.title,
        price: e.price,
        imageUrl: e.imageUrl,
        description: e.description,
        // quantity: e.quantity,
        // add more properties as needed...
      }));

      // console.log(arr);
      setProducts(arr);
    };
    sendRequest(requestConfig, applyData);
  }, []);

  return { products, isLoading, error };
};

export default useProducts;
