import React, { useState, useEffect } from "react";

// Import correcto para obtener productos reales
import { getStickers } from "../data/stickers";

import AdminProductForm from "./AdminProductForm";
import AdminList from "./AdminList";
import AdminGalleryUploader from "./AdminGalleryUploader";

import "./Admin.css";

const ADMIN_PASSWORD = "el12boss";

const Admin = () => {
  const [products, setProducts] = useState([]);

  // 🔐 Control de acceso
  useEffect(() => {
    const storedPass = localStorage.getItem("admin_pass");

    if (storedPass !== ADMIN_PASSWORD) {
      const userPass = prompt("Ingrese contraseña del panel:");

      if (userPass !== ADMIN_PASSWORD) {
        alert("Acceso denegado");
        window.location.href = "/";
      } else {
        localStorage.setItem("admin_pass", ADMIN_PASSWORD);
      }
    }
  }, []);

  // 📦 Cargar productos desde Google Sheets
  useEffect(() => {
    async function load() {
      const data = await getStickers();
      setProducts(data);
    }
    load();
  }, []);

  // ➕ Agregar un producto (a memoria por ahora)
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // 📥 Agregar productos masivos desde galería
  const addMassProducts = (prods) => {
    setProducts((prev) => [...prev, ...prods]);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      <AdminProductForm onAdd={addProduct} />

      <AdminGalleryUploader onMassAdd={addMassProducts} />

      <AdminList products={products} />
    </div>
  );
};

export default Admin;
