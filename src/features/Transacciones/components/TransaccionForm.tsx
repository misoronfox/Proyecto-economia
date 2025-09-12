import React, { useState } from "react";
import { crearTransaccion } from "../api/transaccionApi";

export default function TransaccionForm({ onNuevaTransaccion }: { onNuevaTransaccion: () => void }) {
  const [monto, setMonto] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [idCategoria, setIdCategoria] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearTransaccion({ monto, descripcion, fecha, idCategoria });
    onNuevaTransaccion();
    setMonto(0);
    setDescripcion("");
    setFecha("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-700 text-center">Nueva Transacción</h2>

      <input
        type="number"
        value={monto}
        onChange={e => setMonto(Number(e.target.value))}
        placeholder="Monto"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        value={idCategoria}
        onChange={e => setIdCategoria(Number(e.target.value))}
        placeholder="ID Categoría"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Crear
      </button>
    </form>
  );
}
