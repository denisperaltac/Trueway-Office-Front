import { useState } from "react";
import { Button, Input, Modal, Row, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AddCategoria } from "./AddCategoria";
import { ListaCategorias } from "./ListaCategorias";
import { useAppSelector } from "../../hooks/store";

export const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const categorias: any = useAppSelector((state) => state.categorias);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredCategorias = categorias.filter((categoria: any) =>
    categoria.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categorías</h1>
      </div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px", width: "100%" }}
      >
        <Space className="flex justify-between items-center w-full">
          <Input
            placeholder="Buscar categoría..."
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
            Agregar Categoría
          </Button>
        </Space>
      </Row>

      <Modal
        title="Agregar Nueva Categoría"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <AddCategoria onSuccess={handleCloseModal} />
      </Modal>

      <ListaCategorias categorias={filteredCategorias} />
    </div>
  );
};
