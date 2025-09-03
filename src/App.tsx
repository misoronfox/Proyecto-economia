import './App.css'
import TransaccionForm from './components/TransaccionForm';
import TransaccionList from "./components/TransaccionList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="bg-white shadow-md rounded-lg w-full max-w-xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Mi Aplicación de Economía
        </h1>
      </header>

      <main className="w-full max-w-xl">
        <section className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">Balance Mensual</h2>
          <p className="text-gray-700">
            Aquí podrás ver tus ingresos, gastos y ahorro mensual.
          </p>
          <TransaccionList refresh={true}></TransaccionList>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Agregar Nuevo Gasto</h2>
          <TransaccionForm onNuevaTransaccion={() => console.log("Nueva transacción")} ></TransaccionForm>
        </section>
      </main>

      <footer className="mt-6 text-gray-500 text-sm">
        © 2025 Mi Aplicación de Economía
      </footer>
    </div>
  );
}

export default App;
