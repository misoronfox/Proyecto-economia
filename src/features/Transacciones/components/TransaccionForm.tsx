import React, { useState } from "react";
import { crearTransaccion } from "../api/transaccionApi";


export default function TransaccionForm({ onNuevaTransaccion }: { onNuevaTransaccion: () => void }) {
  const [monto, setMonto] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [idCategoria, setIdCategoria] = useState(1); // Puedes reemplazar esto por un dropdown luego

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearTransaccion({ monto, descripcion, fecha, idCategoria });
    onNuevaTransaccion();
    setMonto(0);
    setDescripcion("");
    setFecha("");
  };



return(
    <form onSubmit={handleSubmit}>
        <input type="number" value={monto} onChange={e => setMonto(Number(e.target.value))} placeholder="Monto" />.
        <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        <input type="number" value={idCategoria} onChange={e => setIdCategoria(Number(e.target.value))} placeholder="ID Categoría" />
        <button type="submit">Crear</button>
    </form>
    );
}