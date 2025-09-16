import type { Transaccion } from "../features/Transacciones/types/transaccion";

export function agruparPorCategoria(transacciones: Transaccion[]){
    const mapa = new Map<string,number>();
    const categorias: Record<number, string> = {
        1: "Alimentación",
        2: "Transporte",
        3: "Ocio",
        4: "Salud",
    };
    transacciones.forEach((t) => {
         const categoria = categorias[t.idCategoria] || "Sin categoría";
         if (t.monto < 0){
            mapa.set(categoria, (mapa.get(categoria)||0)+ Math.abs(t.monto));
        }
    });
    return Array.from(mapa, ([name, value]) => ({name,value}))
}