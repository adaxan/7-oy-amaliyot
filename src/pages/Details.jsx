import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";

function Details() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((data) => {
        if (data.status == 200) {
          setProduct(data.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="details-container">
      {product.id && (
        <>
          <div className="product-details">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
            />
            <h2 className="product-title">{product.attributes.title}</h2>
            <h3 className="product-price">{product.attributes.price} $</h3>
            <p className="product-description">
              {product.attributes.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;