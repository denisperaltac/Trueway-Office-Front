import { useState } from "react";
import { AddGasto } from "./AddGasto";
import { ListaGastos } from "./ListaGastos";

export const Gastos = () => {
  const [reloadGastos, setReloadGastos] = useState<number>(1);
  return (
    <div>
      <AddGasto setReloadGastos={setReloadGastos} />
      <ListaGastos reloadGastos={reloadGastos} />
    </div>
  );
};
