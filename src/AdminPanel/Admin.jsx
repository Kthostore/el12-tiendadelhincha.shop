import React, { useState, useEffect } from "react";

// Cargamos los productos correctamente
import stickers from "../data/stickers";

import AdminProductForm from "./AdminProductForm";
import AdminList from "./AdminList";
import AdminGalleryUploader from "./AdminGalleryUploader";

import "./admin.css";

const ADMIN_PASSWORD = "el12boss"; // Cambia si querés

const Admin = () => {
  const [products, setProducts] = useState([]);

  // 🔐 CONTROL DE ACCESO — ahora dentro de useEffect para evitar errores
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

  // 📦 Cargar productos iniciales desde stickers.js
  useEffect(() => {
    setProducts(stickers);
  }, []);

  // ➕ Agregar 1 producto desde el formulario
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // 📥 Agregar muchos productos desde la galería
  const addMassProducts = (prods) => {
    setProducts((prev) => [...prev, ...prods]);
  };

  return (
    <div className="admin-container">
