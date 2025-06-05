import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Spin,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CategoriaFormat } from "../../services/CategoriaFormat";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useCategoriaActions } from "../../hooks/useCategoriaActions";
import { Categorias } from "../../store/categorias/slice";
import type { ColumnsType } from "antd/es/table";

interface FormValues {
  name: string;
}

interface ListaCategoriasProps {
  categorias: Categorias[];
}

export const ListaCategorias = ({ categorias }: ListaCategoriasProps) => {
  const { addCategorias } = useCategoriaActions();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categorias | null>(
    null
  );

  const handleEdit = (record: Categorias) => {
    setEditingCategory(record);
    form.setFieldsValue({ name: record.name });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingCategory(null);
  };

  const onFinish = (values: FormValues) => {
    if (!editingCategory) return;

    setLoading(true);
    axios
      .put(`${BaseUrl}categories/update/${editingCategory.categoriaId}`, values)
      .then(() => {
        api.open({
          message: "Categoría Actualizada",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
        });
        handleCancel();
      })
      .catch(() => {
        api.open({
          message: "Error al actualizar la categoría",
          type: "error",
          duration: 5,
          placement: "top",
          showProgress: true,
        });
      })
      .finally(() => {
        axios
          .get(BaseUrl + "categories/get")
          .then((res) => {
            addCategorias(res.data.result);
          })
          .finally(() => setLoading(false));
      });
  };

  const columns: ColumnsType<Categorias> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icono",
      key: "ícono",
      render: (_: any, record: Categorias) => {
        const categoria = categorias.find(
          (cat) => cat.categoriaId === record.categoriaId
        );

        if (!categoria) return "N/A";

        let { icon, color } = CategoriaFormat(categoria);
        return (
          <Tag
            color={color}
            icon={icon}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              fontSize: "16px",
              height: "30px",
            }}
          ></Tag>
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 100,
      align: "center" as const,
      render: (_: any, record: Categorias) => (
        <div className="flex justify-center items-center">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        rowKey="categoriaId"
        dataSource={categorias}
        pagination={false}
      />

      <Modal
        title="Editar Categoría"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Nombre de la categoría"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el nombre de la categoría",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Actualizar
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
