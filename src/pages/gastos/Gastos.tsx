import { useState } from "react";
import { AddGasto } from "./AddGasto";
import { ListaGastos } from "./ListaGastos";
import { Button, Form, Modal } from "antd";
import dayjs from "dayjs";

export const Gastos = () => {
  const [reloadGastos, setReloadGastos] = useState<number>(1);
  const [isEdit, setIsEdit] = useState(false);
  const [gastoId, setGastoId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [form] = Form.useForm();

  const handleEdit = (data: any) => {
    const formattedData = {
      ...data,
      fecha: data.fecha ? dayjs(data.fecha) : undefined,
      monto: Number(data.monto),
      categoriaId: data.categoriaId?.toString(),
      areaId: data.areaId?.toString(),
      proveedorId: data.proveedorId?.toString(),
    };
    setFormData(formattedData);
    setIsEdit(true);
    setGastoId(data.gastoId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setGastoId(undefined);
    setFormData(null);
    form.resetFields();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gastos</h1>
        <Button
          type="primary"
          style={{ width: "auto" }}
          onClick={() => {
            setIsEdit(false);
            setFormData(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Agregar Gasto
        </Button>
      </div>

      <ListaGastos
        reloadGastos={reloadGastos}
        setReloadGastos={setReloadGastos}
        onEdit={handleEdit}
      />

      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <AddGasto
          setReloadGastos={setReloadGastos}
          form={form}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          gastoId={gastoId}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
        />
      </Modal>
    </div>
  );
};
