import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Proveedor {
  proveedorId: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

interface ListaProveedoresProps {
  proveedores: Proveedor[];
}

export const ListaProveedores = ({ proveedores }: ListaProveedoresProps) => {
  const columns: ColumnsType<Proveedor> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contacto",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={proveedores}
      rowKey="proveedorId"
      pagination={{ pageSize: 10 }}
    />
  );
};
