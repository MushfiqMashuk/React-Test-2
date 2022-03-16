import axios from "axios";
import React from "react";
import styles from "../styles/SingleProduct.module.css";

const SingleProduct = ({ product, message, setProducts }) => {
  const handleDelete = (e) => {
    const token = document.cookie.split("=")[1];
    deleteData(
      `http://51.195.148.112/api/admin/product-type/${product.id}`,
      token
    );
  };

  async function deleteData(url, token) {
    console.log(url);
    axios({
      method: "delete",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        message(response.data.message);
        setProducts((prev) => prev.filter((value) => value.id !== product.id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <p className={styles.name}>{product.name}</p>
      <p className={styles.id}>{product.id}</p>
      <button className={styles.button} onClick={() => handleDelete()}>
        Delete Product
      </button>
    </div>
  );
};

export default SingleProduct;
