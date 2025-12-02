import React, { useState } from "react";

// Normaliza un link de Google Drive → formato usable
const normalizeDriveURL = (url) => {
  if (!url) return "";
  if (url.includes("uc?export=view")) return url;

  const match = url.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
};

const AdminGalleryUploader = ({ onMassAdd }) => {
  const [rawLinks, setRawLinks] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const processLinks = () => {
    if (!rawLinks.trim()) {
      alert("Pegá al menos 1 link de Drive");
      return;
    }

    if (!price || !category) {
      alert("Precio y categoría son obligatorios");
      return;
    }

    // Separar por líneas → cada link un producto
    const urls = rawLinks
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const products = urls.map((url) => ({
      id: crypto.randomUUID(),
      name: "Producto sin nombre", // luego lo podrás editar
      category,
      price: Number(price),
      image: normalizeDriveURL(url),
    }));

    onMassAdd(products);

    // limpiar
    setRawLinks("");
  };

  return (
    <div className="admin-section">
      <h2>Agregar productos por galería (Drive)</h2>

   

      <textarea
        placeholder="Pegá aquí muchos links de Drive (uno por línea)"
        value={rawLinks}
        onChange={(e) => setRawLinks(e.target.value)}
        rows={6}
      />

      <input
        type="text"
        placeholder="Categoría (ej: Remeras, Stickers)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="admin-btn" onClick={processLinks}>
        Cargar galería completa
      </button>
    </div>
  );
};

export default AdminGalleryUploader;
