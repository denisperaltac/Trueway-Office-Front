import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  notification,
  Spin,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../config/axios";
import { Empleado, FormValues } from "../../types/empleado";
import { ListaEmpleados } from "./ListaEmpleados";
import { Area } from "../../store/area/slice";
import { useAppSelector } from "../../store/hooks";

export const Empleados = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const areas = useAppSelector((state) => state.area);

  const fetchEmpleados = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("employees");
      setEmpleados(res.data);
    } catch (error) {
      api.open({
        message: "Error al cargar los empleados",
        type: "error",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      await axiosInstance.post("employees", values);
      api.open({
        message: "Empleado Agregado",
        type: "success",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
      handleCancel();
      fetchEmpleados();
    } catch (error) {
      api.open({
        message: "Error al agregar el empleado",
        type: "error",
        duration: 5,
        placement: "top",
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEmpleados = empleados?.filter(
    (empleado: Empleado) =>
      empleado.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      empleado.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      empleado.email.toLowerCase().includes(searchText.toLowerCase()) ||
      empleado.area?.name.toLowerCase().includes(searchText.toLowerCase()) ||
      empleado.position.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {contextHolder}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Empleados</h1>
      </div>

      <div className="flex justify-between items-center mb-2">
        <Input
          placeholder="Buscar empleado..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Empleado
        </Button>
      </div>

      <Spin spinning={loading}>
        <ListaEmpleados
          empleados={filteredEmpleados}
          onEmpleadoUpdated={fetchEmpleados}
        />
      </Spin>

      <Modal
        title="Agregar Empleado"
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
                name="areaId"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el departamento",
                  },
                ]}
              >
                <Select>
                  {areas
                    .filter((area) => !area.deleted)
                    .map((area: Area) => (
                      <Select.Option key={area.areaId} value={area.areaId}>
                        {area.name}
                      </Select.Option>
                    ))}
                </Select>
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
                initialValue="active"
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
                Agregar
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};
