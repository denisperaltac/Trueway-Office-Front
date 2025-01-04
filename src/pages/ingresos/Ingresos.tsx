import { useState } from "react";
import { AddIngreso } from "./AddIngreso";
import { ListaIngresos } from "./ListaIngresos";

export const Ingresos = () => {
  const [reloadIngresos, setReloadIngresos] = useState<number>(1);
  return (
    <div>
      <AddIngreso setReloadIngresos={setReloadIngresos} />
      <ListaIngresos reloadIngresos={reloadIngresos} />
    </div>
  );
};
