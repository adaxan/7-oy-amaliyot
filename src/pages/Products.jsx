import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";

function Products() { 
  const [product, setProduct] = useState({});
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      http
        .get(`products/${id}`)
        .then((data) => {
          if (data.data.status === 200) { 
            setProduct(data.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]); 
  return (
    <div className="details-container">
      {product?.id ? ( 
        <div className="product-details">
          <img
            src={product.attributes.image}
            alt={product.attributes.title}
            style={{ width: "300px", height: "300px" }} 
          />
          <h2 className="product-title">{product.attributes.title}</h2>
          <h3 className="product-price">{product.attributes.price} $</h3>
          <p className="product-description">
            {product.attributes.description}
          </p>
        </div>
      ) : (
        <p>Mahsulot topilmadi</p>
      )}
    </div>
  );
}

export default Products;
