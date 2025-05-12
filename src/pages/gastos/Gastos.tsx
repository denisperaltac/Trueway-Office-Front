import { useState } from "react";
import { AddGasto } from "./AddGasto";
import { ListaGastos } from "./ListaGastos";
import { Button, Form, Modal } from "antd";

export const Gastos = () => {
  const [reloadGastos, setReloadGastos] = useState<number>(1);
  const [isEdit, setIsEdit] = useState(false);
  const [gastoId, setGastoId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gastos</h1>
        <Button
          type="primary"
          style={{ width: "auto" }}
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Gasto
        </Button>
      </div>

      <ListaGastos
        reloadGastos={reloadGastos}
        form={form}
        setIsEdit={setIsEdit}
        setReloadGastos={setReloadGastos}
        setGastoId={setGastoId}
      />

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <AddGasto
            setReloadGastos={setReloadGastos}
            form={form}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            gastoId={gastoId}
          />
        </Modal>
      )}
    </div>
  );
};
