import React, { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyRxxSX0NqJtF49LUBmbJkcB3wz8E5QcoALXwPgFBUK7InTFdjOUnN7zooEXLYfIfyQ/exec";

export default function AdminProductForm({ onAdd }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Guardar en Google Sheets
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!result.success) {
      alert("Error guardando en Google Sheets: " + result.error);
      return;
    }

    // 2. Actualizar UI del Admin
    onAdd(form);

    // 3. Reset form
    setForm({ id: "", name: "", price: "", category: "", image: "" });

    alert("Producto agregado exitosamente.");
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Agregar Producto Nuevo</h2>

      <input name="id" value={form.id} onChange={handleChange} placeholder="ID" required />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="URL de imagen" required />

      <button type="submit">Agregar Producto</button>
    </form>
  );
}
