import { useState } from "react"
import TransaccionForm from "../features/Transacciones/components/TransaccionForm"
import TransaccionList from "../features/Transacciones/components/TransaccionList"
export default function Main(){

    const[refresh, setRefresh] = useState(false);
    const triggerRefresh =  () => setRefresh((prev:boolean) => !prev);
    
    
    
    return(
        <main className="w-full max-w-xl">
            <section className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-xl font-semibold mb-2">Balance Mensual</h2>
                <p className="text-gray-700">
                    Aquí podrás ver tus ingresos, gastos y ahorro mensual.
                </p>
                <TransaccionList refresh={refresh} onRefresh={triggerRefresh}></TransaccionList>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">Agregar Nuevo Gasto</h2>
                <TransaccionForm onNuevaTransaccion={triggerRefresh} ></TransaccionForm>
            </section>
      </main>
    )
}