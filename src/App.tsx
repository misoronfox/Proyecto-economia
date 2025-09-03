import React from "react";
import './App.css'

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
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Agregar Nuevo Gasto</h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre del gasto"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Monto"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            >
              Agregar
            </button>
          </form>
        </section>
      </main>

      <footer className="mt-6 text-gray-500 text-sm">
        © 2025 Mi Aplicación de Economía
      </footer>
    </div>
  );
}

export default App;
