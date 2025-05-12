import { Button, Modal } from "antd";
import { AddProveedor } from "./AddProveedor";
import { ListaProveedores } from "./ListaProveedores";
import { useState } from "react";

export const Proveedor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Agregar Proveedor
        </Button>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <AddProveedor />
        </Modal>
      )}
      <ListaProveedores />
    </div>
  );
};
