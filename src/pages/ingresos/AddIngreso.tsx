import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Select,
  notification,
  Row,
  Spin,
  InputNumber,
  DatePicker,
  Input,
} from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { CategoriaIngresos } from "../../services/Constants";

interface FormValues {
  monto: number;
  type: string;
  fecha?: Date;
}

interface AddIngresoProps {
  setReloadIngresos: React.Dispatch<React.SetStateAction<number>>;
}

export const AddIngreso: React.FC<AddIngresoProps> = ({
  setReloadIngresos,
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false); // Estado para el loader

  const onFinish = (values: FormValues) => {
    setLoading(true); // Mostrar loader
    axios
      .post(BaseUrl + "income/add", values)
      .then(() => {
        const now = new Date();
        setReloadIngresos(now.getTime());
        api.open({
          message: "Ingreso Agregado",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
          pauseOnHover: false,
        });
      })
      .catch(() => {
        api.open({
          message: "Error al agregar el ingreso",
          type: "error",
          duration: 5,
          placement: "top",
          showProgress: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16} wrap={true} justify="start">
            <Col style={{ minWidth: 200 }}>
              <Form.Item
                label="Monto"
                name="monto"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el monto del ingreso",
                  },
                  {
                    type: "number",
                    message: "El monto debe ser un número válido",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={
                    (value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Formato de moneda
                  }
                  step={0.01}
                  onKeyDown={(e) => {
                    const key = e.key;
                    // Permite solo números, Backspace, Tab, Enter y las teclas de flecha
                    if (
                      !/[\d.\b\tEnter]/.test(key) ||
                      ["e", "E", "R", "r", "T", "t", "N", "n"].includes(key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item
                label="Tipo"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Por favor, seleccione un tipo",
                  },
                ]}
              >
                <Select>
                  {CategoriaIngresos.map((Categoria: any) => (
                    <Select.Option key={Categoria} value={Categoria}>
                      {Categoria}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item label="Fecha" name="fecha">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item
                label="Caja ID"
                name="cajaId"
                rules={[
                  {
                    required: false,
                    message:
                      "Por favor, ingrese el identificador (ID) de la caja",
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
