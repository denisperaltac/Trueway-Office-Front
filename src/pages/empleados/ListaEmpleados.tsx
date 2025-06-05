import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Spin,
  Tag,
  DatePicker,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Empleado, FormValues } from "../../types/empleado";

interface ListaEmpleadosProps {
  empleados: Empleado[];
  onEmpleadoUpdated: () => void;
}

export const ListaEmpleados = ({
  empleados,
  onEmpleadoUpdated,
}: ListaEmpleadosProps) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null);

  const handleEdit = (record: Empleado) => {
    setEditingEmpleado(record);
    form.setFieldsValue({
      ...record,
      dateOfBirth: dayjs(record.dateOfBirth),
      hireDate: dayjs(record.hireDate),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${BaseUrl}employees/${id}`);
      api.open({
        message: "Empleado Eliminado",
        type: "success",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
      onEmpleadoUpdated();
    } catch (error) {
      api.open({
        message: "Error al eliminar el empleado",
        type: "error",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingEmpleado(null);
  };

  const onFinish = async (values: FormValues) => {
    if (!editingEmpleado) return;

    setLoading(true);
    try {
      await axios.put(
        `${BaseUrl}employees/${editingEmpleado.employeeId}`,
        values
      );
      api.open({
        message: "Empleado Actualizado",
        type: "success",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
      handleCancel();
      onEmpleadoUpdated();
    } catch (error) {
      api.open({
        message: "Error al actualizar el empleado",
        type: "error",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      case "on_leave":
        return "orange";
      default:
        return "default";
    }
  };

  const columns: ColumnsType<Empleado> = [
    {
      title: "Nombre",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Departamento",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Puesto",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === "active"
            ? "Activo"
            : status === "inactive"
            ? "Inactivo"
            : "En Permiso"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 120,
      align: "center" as const,
      render: (_: any, record: Empleado) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.employeeId)}
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
        rowKey="employeeId"
        dataSource={empleados}
        pagination={false}
      />

      <Modal
        title="Editar Empleado"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[
                  { required: true, message: "Por favor ingrese el nombre" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Apellido"
                name="lastName"
                rules={[
                  { required: true, message: "Por favor ingrese el apellido" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor ingrese el email" },
                  { type: "email", message: "Email inválido" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Teléfono" name="phone">
                <Input />
              </Form.Item>

              <Form.Item
                label="Fecha de Nacimiento"
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de nacimiento",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Fecha de Contratación"
                name="hireDate"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de contratación",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Salario"
                name="salary"
                rules={[
                  { required: true, message: "Por favor ingrese el salario" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Departamento"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el departamento",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Puesto"
                name="position"
                rules={[
                  { required: true, message: "Por favor ingrese el puesto" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Dirección" name="address">
                <Input />
              </Form.Item>

              <Form.Item
                label="Estado"
                name="status"
                rules={[
                  { required: true, message: "Por favor seleccione el estado" },
                ]}
              >
                <Select>
                  <Select.Option value="active">Activo</Select.Option>
                  <Select.Option value="inactive">Inactivo</Select.Option>
                  <Select.Option value="on_leave">En Permiso</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Contacto de Emergencia" name="emergencyContact">
                <Input />
              </Form.Item>

              <Form.Item label="Teléfono de Emergencia" name="emergencyPhone">
                <Input />
              </Form.Item>
            </div>

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
