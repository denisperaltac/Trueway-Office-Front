import { useState } from "react";
import { AddIngreso } from "./AddIngreso";
import { ListaIngresos } from "./ListaIngresos";
import { Button, Modal } from "antd";

export const Ingresos = () => {
  const [reloadIngresos, setReloadIngresos] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ingresos</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Agregar Ingreso
        </Button>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <AddIngreso setReloadIngresos={setReloadIngresos} />
        </Modal>
      )}
      <ListaIngresos
        reloadIngresos={reloadIngresos}
        setReloadIngresos={setReloadIngresos}
      />
    </div>
  );
};
