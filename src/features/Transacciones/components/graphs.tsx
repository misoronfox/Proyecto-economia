import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis,  YAxis,  Bar, CartesianGrid} from "recharts";
import { agruparPorCategoria } from "../../../utils/transaccionUtils";
import type { Transaccion } from "../types/transaccion";
import { useState, useEffect } from "react";
import { obtenerTransacciones } from "../api/transaccionApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function GraficoGastos() {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);

  useEffect(() => {
    obtenerTransacciones().then(setTransacciones);
  }, []);

  const data = agruparPorCategoria(transacciones); 

  return (
    <div className="flex justify-center items-center border  w-full h-[500px]">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`} 
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
