import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Switch,
  Spin,
} from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useAppSelector } from "../../hooks/store";
import TextArea from "antd/es/input/TextArea";

interface FormValues {
  nombreGasto: string;
  montoGasto: number;
  categoriaGasto: string;
  fechaPago?: Date;
  pagado: boolean;
}

interface AddGastoProps {
  setReloadGastos: React.Dispatch<React.SetStateAction<number>>;
}

export const AddGasto: React.FC<AddGastoProps> = ({ setReloadGastos }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false); // Estado para el loader
  const categorias: any = useAppSelector((state) => state.categorias);
  const proveedores: any = useAppSelector((state) => state.proveedores);

  const onFinish = (values: FormValues) => {
    setLoading(true); // Mostrar loader
    axios
      .post(BaseUrl + "addGasto", values)
      .then(() => {
        const now = new Date();
        setReloadGastos(now.getTime());
        api.open({
          message: "Gasto Agregado",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
          pauseOnHover: false,
        });
      })
      .catch(() => {
        api.open({
          message: "Error al agregar el gasto",
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
                label="Nombre del gasto"
                name="nombreGasto"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el nombre del gasto",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item
                label="Monto del gasto"
                name="montoGasto"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el monto del gasto",
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
                label="Categoria del gasto"
                name="categoriaGasto"
                rules={[
                  {
                    required: true,
                    message: "Por favor, seleccione una categoría",
                  },
                ]}
              >
                <Select>
                  {categorias.map((categoria: any) => (
                    <Select.Option
                      key={categoria.categoriaId}
                      value={categoria.categoriaId}
                    >
                      {categoria.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item
                label="Proveedor"
                name="categoriaGasto"
                rules={[
                  {
                    required: true,
                    message: "Por favor, seleccione una categoría",
                  },
                ]}
              >
                <Select>
                  {proveedores.map((categoria: any) => (
                    <Select.Option
                      key={categoria.categoriaId}
                      value={categoria.categoriaId}
                    >
                      {categoria.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item label="Fecha (opcional)" name="fechaPago">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col style={{ minWidth: 200 }}>
              <Form.Item label="Notas" name="notas">
                <TextArea />
              </Form.Item>
            </Col>
            <Col style={{ maxWidth: 100 }}>
              <Form.Item label="Pagado?" name="pagado" valuePropName="checked">
                <Switch />
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
