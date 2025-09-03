import { useState } from "react";
import Modal from "react-modal"
import { modificarTransaccion } from "./api";
import { Transaccion } from "./types";

interface Props {
  transaccion: Transaccion;
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
}

export default function ModificarTransaccionModal({ transaccion, isOpen, onRequestClose, onSubmit }: Props) {
  const [formulario, setFormulario] = useState({
    monto: transaccion.monto.toString(),
    descripcion: transaccion.descripcion,
    fecha: transaccion.fecha,
    idCategoria: transaccion.idCategoria.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await (transaccion.id, {
      ...formulario,
      monto: Number(formulario.monto),
      idCategoria: Number(formulario.idCategoria),
    });
    onRequestClose();
    onSubmit(); // para recargar la lista
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Modificar Transacción">
      <h2>Modificar Transacción</h2>
      <form onSubmit={handleSubmit}>
        <input name="monto" type="number" value={formulario.monto} onChange={handleChange} required />
        <input name="descripcion" type="text" value={formulario.descripcion} onChange={handleChange} required />
        <input name="fecha" type="date" value={formulario.fecha} onChange={handleChange} required />
        <input name="idCategoria" type="number" value={formulario.idCategoria} onChange={handleChange} required />
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
}
