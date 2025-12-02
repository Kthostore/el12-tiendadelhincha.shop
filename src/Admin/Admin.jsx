import React, { useState, useEffect } from "react";
import AdminProductForm from "./AdminProductForm";
import AdminList from "./AdminList";
import "./admin.css";
import AdminGalleryUploader from "./AdminGalleryUploader";


const Admin = () => {
  const [products, setProducts] = useState([]);

  // Cargar productos del archivo stickers.js
  useEffect(() => {
    import("../data/stickers").then((module) => {
      setProducts(module.default);
    });
  }, []);

  // Agregar un producto nuevo
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      <AdminProductForm onAdd={addProduct} />
      <AdminGalleryUploader
        onMassAdd={(prods) => {
          setProducts((prev) => [...prev, ...prods]);
        }}
      />
      <AdminList products={products} />
    </div>
  );
};

export default Admin;
