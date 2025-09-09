import { useEffect, useState, useMemo } from "react";
import type { Transaccion } from "../types/transaccion";
import { obtenerTransacciones, eliminarTransaccion } from "../api/transaccionApi";
import ModificarTransaccionModal from "./modificarTransaccionModal";

export default function TransaccionList({ refresh }: { refresh: boolean }) {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [transaccionAEditar, setTransaccionAEditar] = useState<Transaccion | null>(null);

  const montoTotal = transacciones.reduce((accumulator, transacion) => accumulator + transacion.monto , 0  )
  const totalIngresos = transacciones.filter(transacion => transacion.monto > 0 ).reduce((accumulator, transacion) => accumulator + transacion.monto, 0 )
  const totalEgresos = transacciones.filter(transacion => transacion.monto < 0).reduce((accumulator,  transacion) => accumulator + transacion.monto,  0)

  useEffect(() => {
    obtenerTransacciones().then(setTransacciones);
  }, [refresh]);

  const handleDelete = async (id: number) => {
    await eliminarTransaccion(id);
    setTransacciones(prev => prev.filter(t => t.id !== id));
  };

  const cerrarModal = () => setTransaccionAEditar(null);

  const actualizar = () => {
    obtenerTransacciones().then(setTransacciones);
  };


  

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">
        Total de transacciones: ${montoTotal}
      </h2>
      <p>Ingresos: ${totalIngresos}</p>
      <p>Egresos: ${Math.abs(totalEgresos)}</p>

      <ul>
        {transacciones.map(t => (
          <li key={t.id}>
            <button onClick={() => setTransaccionAEditar(t)}>Editar</button>
            <strong>${t.monto}</strong> - {t.descripcion} ({t.fecha}) [Cat: {t.idCategoria}]
            <button onClick={() => handleDelete(t.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {transaccionAEditar && (
        <ModificarTransaccionModal
          transaccion={transaccionAEditar}
          isOpen={true}
          onRequestClose={cerrarModal}
          onSubmit={actualizar}
        />
      )}
    </div>
  );
}
