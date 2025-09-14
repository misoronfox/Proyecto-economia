import { useState } from "react";
import Modal from "react-modal";
import type { Transaccion } from "../types/transaccion";
import { modificarTransaccion } from "../api/transaccionApi";

interface Props {
  transaccion: Transaccion;
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
}

export default function ModificarTransaccionModal({
  transaccion,
  isOpen,
  onRequestClose,
  onSubmit,
}: Props) {
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
    await modificarTransaccion(transaccion.id, {
      ...formulario,
      monto: Number(formulario.monto),
      idCategoria: Number(formulario.idCategoria),
    });
    onRequestClose();
    onSubmit(); // refresca la lista
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modificar Transacción"
      className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Modificar Transacción
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="monto"
          type="number"
          value={formulario.monto}
          onChange={handleChange}
          required
          placeholder="Monto"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="descripcion"
          type="text"
          value={formulario.descripcion}
          onChange={handleChange}
          required
          placeholder="Descripción"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="fecha"
          type="date"
          value={formulario.fecha}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="idCategoria"
          type="number"
          value={formulario.idCategoria}
          onChange={handleChange}
          required
          placeholder="ID Categoría"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
  );
}
