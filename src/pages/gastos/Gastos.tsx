import { useState } from "react";
import { AddGasto } from "./AddGasto";
import { ListaGastos } from "./ListaGastos";
import { Form } from "antd";

export const Gastos = () => {
  const [reloadGastos, setReloadGastos] = useState<number>(1);
  const [isEdit, setIsEdit] = useState(false);
  const [gastoId, setGastoId] = useState();
  const [form] = Form.useForm();
  return (
    <div>
      <AddGasto
        setReloadGastos={setReloadGastos}
        form={form}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        gastoId={gastoId}
      />
      <ListaGastos
        reloadGastos={reloadGastos}
        form={form}
        setIsEdit={setIsEdit}
        setReloadGastos={setReloadGastos}
        setGastoId={setGastoId}
      />
    </div>
  );
};
