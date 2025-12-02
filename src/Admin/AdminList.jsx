import React from "react";

const AdminList = ({ products }) => {
  return (
    <div className="admin-section">
      <h2>Productos cargados</h2>

      {products.length === 0 && <p>No hay productos aún.</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — ${p.price} — {p.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
