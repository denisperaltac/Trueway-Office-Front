import { useState } from "react";
import { Button, Input, Modal, Row, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AddProveedor } from "./AddProveedor";
import { ListaProveedores } from "./ListaProveedores";
import { useAppSelector } from "../../hooks/store";

export const Proveedor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const proveedores: any = useAppSelector((state) => state.proveedores);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredProveedores = proveedores.filter((proveedor: any) =>
    proveedor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Proveedores</h1>
      </div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px", width: "100%" }}
      >
        <Space className="flex justify-between items-center w-full">
          <Input
            placeholder="Buscar proveedor..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "300px" }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
          >
            Agregar Proveedor
          </Button>
        </Space>
      </Row>

      <Modal
        title="Agregar un nuevo proveedor"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <AddProveedor onSuccess={handleCloseModal} />
      </Modal>

      <ListaProveedores proveedores={filteredProveedores} />
    </div>
  );
};
