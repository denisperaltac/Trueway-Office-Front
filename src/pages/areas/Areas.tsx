import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Tag,
} from "antd";
import { useAppSelector } from "../../hooks/store";
import { useAreaActions } from "../../hooks/useAreaActions";
import { Area } from "../../store/area/slice";
import { BaseUrl } from "../../config/config";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AreaFormat } from "../../services/AreaFormat";

export const Areas: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const areas = useAppSelector((state) => state.area);
  console.log(areas);
  const { addArea, updateArea, deleteArea } = useAreaActions();

  const showModal = (area?: Area) => {
    if (area) {
      setEditingArea(area);
      form.setFieldsValue(area);
    } else {
      setEditingArea(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingArea(null);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingArea) {
        const response = await axios.put(
          `${BaseUrl}areas/${editingArea.areaId}`,
          values
        );
        updateArea(response.data);
        message.success("Area actualizada correctamente");
      } else {
        const response = await axios.post(`${BaseUrl}areas/add`, values);
        addArea(response.data);
        message.success("Area creada correctamente");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingArea(null);
    } catch (error) {
      message.error("Error al guardar la area");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (areaId: number) => {
    try {
      await axios.delete(`${BaseUrl}areas/${areaId}`);
      deleteArea(areaId);
      message.success("Area eliminada correctamente");
    } catch (error) {
      message.error("Error al eliminar la area");
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a: Area, b: Area) => a.name.localeCompare(b.name),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Icono",
      key: "ícono",
      render: (_: any, record: Area) => {
        const area = areas.find((area) => area.areaId === record.areaId);

        if (!area) return "N/A";

        let { icon, color } = AreaFormat(area);
        return (
          <Tag
            color={color}
            icon={icon}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              fontSize: "16px",
              height: "30px",
            }}
          ></Tag>
        );
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Area) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<FaEdit className="text-blue-600" />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Eliminar area"
            description="¿Estás seguro de querer eliminar esta area?"
            onConfirm={() => handleDelete(record.areaId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<FaTrash className="text-red-600" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Areas</h1>
        <Button type="primary" onClick={() => showModal()}>
          Agregar Area
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={areas.filter((area) => !area.deleted)}
        rowKey="areaId"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingArea ? "Editar Area" : "Agregar Area"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            {editingArea ? "Actualizar" : "Crear"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el nombre de la area!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
