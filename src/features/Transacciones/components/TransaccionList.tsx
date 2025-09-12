import { useEffect, useState } from "react";
import type { Transaccion } from "../types/transaccion";
import { obtenerTransacciones, eliminarTransaccion } from "../api/transaccionApi";
import ModificarTransaccionModal from "./modificarTransaccionModal";

export default function TransaccionList({ 
  refresh,
  onRefresh,

 }: {
    refresh: boolean;
    onRefresh: () => void;  
  }) {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [transaccionAEditar, setTransaccionAEditar] = useState<Transaccion | null>(null);
  
  
  const montoTotal = transacciones.reduce((accumulator, t) => accumulator + t.monto, 0);
  const totalIngresos = transacciones
    .filter(t => t.monto > 0)
    .reduce((accumulator, t) => accumulator + t.monto, 0);
  const totalEgresos = transacciones
    .filter(t => t.monto < 0)
    .reduce((accumulator, t) => accumulator + t.monto, 0);
  const formatear = (monto: number): string =>
    monto.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  useEffect(() => {
    obtenerTransacciones().then(setTransacciones);
  }, [refresh]);

  const handleDelete = async (id: number) => {
    await eliminarTransaccion(id);
    setTransacciones(prev => prev.filter(t => t.id !== id));
  };

  const cerrarModal = () => setTransaccionAEditar(null);


  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
      {/* Resumen */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">
          Total de transacciones: {formatear(montoTotal)}
        </h2>
        <p className="text-green-600">Ingresos: {formatear(totalIngresos)}</p>
        <p className="text-red-600">Egresos: {formatear(Math.abs(totalEgresos))}</p>
      </div>

      {/* Lista */}
      <ul className="space-y-3">
        {transacciones.map(t => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <div>
              <strong className={t.monto >= 0 ? "text-green-600" : "text-red-600"}>
                {formatear(t.monto)}
              </strong>{" "}
              - {t.descripcion} <span className="text-gray-500">({t.fecha})</span>{" "}
              <span className="text-sm text-gray-400">[Cat: {t.idCategoria}]</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTransaccionAEditar(t)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {transaccionAEditar && (
        <ModificarTransaccionModal
          transaccion={transaccionAEditar}
          isOpen={true}
          onRequestClose={cerrarModal}
          onSubmit={onRefresh}
        />
      )}
    </div>
  );
}
