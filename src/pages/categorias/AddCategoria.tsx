import { useState } from "react";
import { Button, Col, Form, Input, notification, Row, Spin } from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useCategoriaActions } from "../../hooks/useCategoriaActions";

interface FormValues {
  name: string;
}

export const AddCategoria = () => {
  const { addCategorias } = useCategoriaActions();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false); // Estado para el loader

  const onFinish = (values: FormValues) => {
    setLoading(true); // Mostrar loader
    axios
      .post(BaseUrl + "addCategoria", values)
      .then(() => {
        api.open({
          message: "Categoria Agregada",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
          pauseOnHover: false,
        });
      })
      .catch(() => {
        api.open({
          message: "Error al agregar la categoria",
          type: "error",
          duration: 5,
          placement: "top",
          showProgress: true,
        });
      })
      .finally(() => {
        axios
          .get(BaseUrl + "getCategorias")
          .then((res) => {
            addCategorias(res.data.result);
          })
          .finally(() => setLoading(false));
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
                label="Nombre de la categoria"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el nombre de la categoria",
                  },
                ]}
              >
                <Input />
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
