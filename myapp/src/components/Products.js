import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/Products.module.css";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [id, setId] = useState("");
  const [successMsg, setSuccessMsg] = useState();

  const handleSubmit = async () => {
    const token = document.cookie.split("=")[1];

    if (token) {
      setLoading(true);
      getData("http://51.195.148.112/api/admin/product-type/", token);
    } else {
      console.log("Unauthorized User!");
    }
  };

  /**
   *
   * @param {string} url
   * @param {object} bodyData
   */

  async function getData(url, token) {
    axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        setError("");
        setProducts(response.data.data);
        console.log(products);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch products!");
      });
  }

  const handleAdd = async () => {
    if (value.length > 0) {
      const token = document.cookie.split("=")[1];
      const bodyData = {
        name: value,
      };

      postData(
        "http://51.195.148.112/api/admin/product-type/",
        bodyData,
        token
      );
    }
  };

  const handleEdit = async () => {
    if (updatedValue.length > 0 && id.length > 0) {
      const token = document.cookie.split("=")[1];
      const bodyData = {
        name: updatedValue,
      };

      editData(
        `http://51.195.148.112/api/admin/product-type/${id}`,
        bodyData,
        token
      );
    }
  };

  /**
   *
   * @param {string} url
   * @param {object} bodyData
   * @param {string} token
   */

  async function editData(url, bodyData, token) {
    axios({
      method: "patch",
      url,
      data: JSON.stringify(bodyData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        setError("");
        setUpdatedValue("");
        setId("");
        setSuccessMsg(response.data.message);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch products!");
      });
  }

  /**
   *
   * @param {string} url
   * @param {object} bodyData
   * @param {string} token
   */

  const postData = async (url, bodyData, token) => {
    axios({
      method: "post",
      url,
      data: JSON.stringify(bodyData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        setError("");
        setValue("");
        setSuccessMsg(response.data.message);
        console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch products!");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button className={styles.button} onClick={handleSubmit}>
          Get All Products
        </button>
        <div className={styles.add_product}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className={styles.input}
            placeholder="Type product name..."
          />
          <button className={styles.button} onClick={handleAdd}>
            Add Product
          </button>
        </div>

        <div className={styles.add_product}>
          <input
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
            type="text"
            className={styles.input}
            placeholder="Type product name to edit..."
          />
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
            className={styles.input}
            placeholder="Type product ID to edit..."
          />
          <button className={styles.button} onClick={handleEdit}>
            Update Product Name
          </button>
          <p className={styles.message}>{!loading && !error && successMsg}</p>
        </div>
      </div>
      <div className={styles.right}>
        {products &&
          products.map((product) => (
            <SingleProduct
              key={product.id}
              product={product}
              message={setSuccessMsg}
              setProducts={setProducts}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
