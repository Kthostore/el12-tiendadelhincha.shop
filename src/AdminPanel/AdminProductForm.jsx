import React, { useState } from "react";

// Convierte un link de Drive común → a link directo usable por la tienda
const normalizeDriveURL = (url) => {
  if (!url) return "";

  // Caso 1: ya es el formato correcto
  if (url.includes("uc?export=view")) return url;

  // Caso 2: link típico de /file/d/ID/view
  const match = url.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
};

const AdminProductForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category || !image) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(), // ID único
      name,
      price: Number(price),
      category,
      image: normalizeDriveURL(image), // conversion Drive
    };

    onAdd(newProduct);

    // Limpiar formulario
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
  };

  return (
    <div className="admin-section">
      <h2>Agregar producto individual</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoría (ej: Remeras, Stickers)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Link de Google Drive de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit" className="admin-btn">
          Agregar producto
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
