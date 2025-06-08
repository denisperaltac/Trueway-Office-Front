import React, { useState, useEffect } from "react";
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
  Spin,
  Divider,
  message,
} from "antd";
import axiosInstance from "../../config/axios";
import { useAppSelector } from "../../hooks/store";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

interface FormValues {
  gastoId?: number;
  name: string;
  monto: number;
  categoriaId: string;
  areaId: string;
  fecha?: Date;
  pagado: boolean;
  proveedorId?: string;
  notas?: string;
}

interface AddGastoProps {
  setReloadGastos: React.Dispatch<React.SetStateAction<number>>;
  form: any;
  isEdit: boolean;
  setIsEdit: any;
  gastoId?: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
}

export const AddGasto: React.FC<AddGastoProps> = ({
  setReloadGastos,
  form,
  isEdit,
  setIsEdit,
  gastoId,
  setIsModalOpen,
  formData,
}) => {
  const [_, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const categorias: any = useAppSelector((state) => state.categorias);
  const proveedores: any = useAppSelector((state) => state.proveedores);
  const areas: any = useAppSelector((state) => state.area);

  useEffect(() => {
    if (isEdit && formData) {
      form.resetFields();
      form.setFieldsValue(formData);
    }
  }, [isEdit, formData, form]);

  const onFinish = (values: FormValues) => {
    setLoading(true);
    const data = {
      ...values,
      gastoId: isEdit ? gastoId : undefined,
      fecha: values.fecha
        ? dayjs(values.fecha).format("YYYY-MM-DD")
        : undefined,
    };

    console.log("Datos a enviar:", data); // Debug log

    axiosInstance
      .post("expenses/add", data)
      .then(() => {
        const now = new Date();
        setReloadGastos(now.getTime());
        message.success(
          isEdit
            ? "Gasto actualizado correctamente"
            : "Gasto agregado correctamente"
        );
        setIsEdit(false);
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error al guardar:", error); // Debug log
        message.error(
          isEdit ? "Error al actualizar el gasto" : "Error al agregar el gasto"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <div className="text-2xl font-bold mb-4">
          {isEdit ? "Editar Gasto" : "Agregar Nuevo Gasto"}
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          preserve={false}
        >
          <Row gutter={[24, 16]} wrap={true}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Nombre del gasto"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el nombre del gasto",
                  },
                ]}
              >
                <Input placeholder="Ej: Compra de materiales" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Monto del gasto"
                name="monto"
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
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  step={0.01}
                  onKeyDown={(e) => {
                    const key = e.key;
                    if (
                      !/[\d.\b\tEnter]/.test(key) ||
                      ["e", "E", "R", "r", "T", "t", "N", "n"].includes(key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  min={0}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Categoría"
                name="categoriaId"
                rules={[
                  {
                    required: true,
                    message: "Por favor, seleccione una categoría",
                  },
                ]}
              >
                <Select placeholder="Seleccione una categoría">
                  {categorias.map((categoria: any) => (
                    <Select.Option
                      key={categoria.categoriaId}
                      value={categoria.categoriaId.toString()}
                    >
                      {categoria.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Área"
                name="areaId"
                rules={[
                  {
                    required: true,
                    message: "Por favor, seleccione un área",
                  },
                ]}
              >
                <Select placeholder="Seleccione un área">
                  {areas
                    .filter((area: any) => !area.deleted)
                    .map((area: any) => (
                      <Select.Option
                        key={area.areaId}
                        value={area.areaId.toString()}
                      >
                        {area.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Proveedor" name="proveedorId">
                <Select placeholder="Seleccione un proveedor (opcional)">
                  {proveedores.map((proveedor: any) => (
                    <Select.Option
                      key={proveedor.proveedorId}
                      value={proveedor.proveedorId.toString()}
                    >
                      {proveedor.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Fecha" name="fecha">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Seleccione fecha (opcional)"
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Notas" name="notas">
                <TextArea
                  rows={4}
                  placeholder="Agregue notas adicionales sobre el gasto..."
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Divider />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    width: "100%",
                    height: "45px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {isEdit ? "Actualizar Gasto" : "Agregar Gasto"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  );
};
