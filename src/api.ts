import { json } from "stream/consumers";
import { Transaccion } from "./types";
import { promises } from "dns";

const API_URL = "http://localhost:5000"

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

/* export async function crearTransaccion(data: any) {
  return fetch(`${API_URL}/transaccion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}
 */