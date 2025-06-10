"use client";

import CostosYConfianza from "./(components)/CostosConfianza";
import FormularioPublicacion from "./(components)/FormularioPublicacion";
import HeaderVendeConInmova from "./(components)/header";
import ProcesoVentaInmova from "./(components)/process";

export default function Vender() {
  return (
    <div>
      <HeaderVendeConInmova />
      <ProcesoVentaInmova />
      <CostosYConfianza />
      <FormularioPublicacion />
    </div>
  );
}
