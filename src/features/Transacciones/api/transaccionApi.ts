import type { Transaccion } from "../types/transaccion";
import { API_URL } from "../../../config/apiConfig";



export async function obtenerTransacciones(): Promise<Transaccion[]>{
    const res = await fetch(`${API_URL}/transaccion`);
    return res.json();
}

export async function crearTransaccion(data: any): Promise<Transaccion> {
  const res = await fetch(`${API_URL}/transaccion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
    
  });
  return res.json();
}

export async function modificarTransaccion(data:any, id:number):Promise<Transaccion>{
  const res = await fetch(`${API_URL}/transaccion/${id}`,{
    method:"PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarTransaccion(id:number) {
  await fetch(`${API_URL}/transaccion/${id}`,{
    method : "DELETE",
  });

}