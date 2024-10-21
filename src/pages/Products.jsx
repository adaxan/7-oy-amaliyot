import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios"; // Sizning axios instance

function Products() { // Nomi to'g'irlash tavsiya qilinadi
  const [product, setProduct] = useState({});
  const { id } = useParams(); // params osonroq olish

  useEffect(() => {
    if (id) {
      http
        .get(`products/${id}`)
        .then((data) => {
          if (data.data.status === 200) { // == o'rniga === ishlatish yaxshi amaliyot
            setProduct(data.data.data);
          }
        })
        .catch((err) => {
          console.error("Xato:", err);
        });
    }
  }, [id]); 
  return (
    <div className="details-container">
      {product?.id ? ( // Tekshiruvni yanada aniqroq qilish
        <div className="product-details">
          <img
            src={product.attributes.image}
            alt={product.attributes.title}
            style={{ width: "300px", height: "300px" }} // Tasvir o'lchami to'g'irlash (agar kerak bo'lsa)
          />
          <h2 className="product-title">{product.attributes.title}</h2>
          <h3 className="product-price">{product.attributes.price} $</h3>
          <p className="product-description">
            {product.attributes.description}
          </p>
        </div>
      ) : (
        <p>Mahsulot topilmadi</p> // Fallback holat uchun
      )}
    </div>
  );
}

export default Products;
