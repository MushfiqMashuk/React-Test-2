import axios from "axios";
import React from "react";
import styles from "../styles/SingleProduct.module.css";

const SingleProduct = ({ product, message }) => {
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
        //setLoading(false);
        //setError("");
        // set cookie
        message(response.data.message);
        console.log(response.data);
      })
      .catch((err) => {
        //setLoading(false);
        //setError("Failed to Login!");
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
