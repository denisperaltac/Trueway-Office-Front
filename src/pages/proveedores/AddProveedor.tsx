import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Spin,
  message,
} from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useProveedorActions } from "../../hooks/useProveedorActions";

interface FormValues {
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

interface AddProveedorProps {
  onSuccess: () => void;
}

export const AddProveedor = ({ onSuccess }: AddProveedorProps) => {
  const { addProveedor } = useProveedorActions();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false); // Estado para el loader

  const onFinish = (values: FormValues) => {
    setLoading(true); // Mostrar loader

    axios
      .post(BaseUrl + "suppliers/add", values)
      .catch(() => {
        api.open({
          message: "Error al agregar el proveedor",
          type: "error",
          duration: 5,
          placement: "top",
          showProgress: true,
        });
      })
      .finally(() => {
        axios
          .get(BaseUrl + "suppliers/get")
          .then((res) => {
            addProveedor(res.data.result);
          })
          .finally(() => {
            setLoading(false);
            message.success("Proveedor agregado exitosamente");
            form.resetFields();
            onSuccess();
          });
      });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16} wrap={true} justify="start">
            <Col style={{ minWidth: 200, width: "400px" }}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el nombre del proveedor",
                  },
                ]}
              >
                <Input placeholder="Requerido" />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200, width: "400px" }}>
              <Form.Item
                label="Telefono"
                name="phone"
                rules={[
                  { required: false, message: "Por favor ingrese el telefono" },
                ]}
              >
                <Input placeholder="Opcional" />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200, width: "400px" }}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: false, message: "Por favor ingrese el email" },
                ]}
              >
                <Input placeholder="Opcional" />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200, width: "400px" }}>
              <Form.Item
                label="Direccion"
                name="address"
                rules={[
                  {
                    required: false,
                    message: "Por favor ingrese la direccion",
                  },
                ]}
              >
                <Input placeholder="Opcional" />
              </Form.Item>
            </Col>

            <Col
              style={{ minWidth: 200, display: "flex", alignItems: "flex-end" }}
            >
              <Form.Item style={{ width: "100%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Enviar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  );
};
