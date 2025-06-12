import { useState } from "react";
import { Button, Form, Input, notification, Spin } from "antd";
import axiosInstance from "../../config/axios";
import { useCategoriaActions } from "../../hooks/useCategoriaActions";

interface FormValues {
  name: string;
}

interface AddCategoriaProps {
  onSuccess?: () => void;
}

export const AddCategoria = ({ onSuccess }: AddCategoriaProps) => {
  const { addCategorias } = useCategoriaActions();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: FormValues) => {
    setLoading(true);
    axiosInstance
      .post("categories/add", values)
      .then(() => {
        api.open({
          message: "Categoria Agregada",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
          pauseOnHover: false,
        });
        form.resetFields();
        onSuccess?.();
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
        axiosInstance
          .get("categories/get")
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
