import { useEffect, useState } from "react";
import type { Transaccion } from "../types/transaccion";
import { obtenerTransacciones, eliminarTransaccion } from "../api/transaccionApi";
import ModificarTransaccionModal from "./modificarTransaccionModal";





export default function TransaccionList({ refresh }: { refresh: boolean }) {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [transaccionAEditar, setTransaccionAEditar] = useState<Transaccion|null>(null)
  

  useEffect(() => {
    obtenerTransacciones().then(setTransacciones);
  }, [refresh]);

  const handleDelete = async(id:number) =>{
    await eliminarTransaccion(id)
    setTransacciones(prev => prev.filter(t => t.id !== id));
  }

  const cerrarModal = () => setTransaccionAEditar(null);

  const actualizar = () =>{
    obtenerTransacciones().then(setTransacciones);
  };



  return (
    <ul>
      {transacciones.map(t => (
        <li key={t.id}>
          <button onClick={() => setTransaccionAEditar(t)}>Editar</button>
          <strong>${t.monto}</strong> - {t.descripcion} ({t.fecha}) [Cat: {t.idCategoria}]
          <button onClick={()=> handleDelete(t.id)} style={{ marginLeft: "1rem" }}>
            Eliminar
          </button>
        </li>
      ))}

      {transaccionAEditar && (
        <ModificarTransaccionModal
          transaccion={transaccionAEditar}
          isOpen={true}
          onRequestClose={cerrarModal}
          onSubmit={actualizar}        
        />
      )}
    </ul>
  );
}