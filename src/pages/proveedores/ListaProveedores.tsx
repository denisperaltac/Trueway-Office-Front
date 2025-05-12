import { Table } from "antd";
import { useAppSelector } from "../../hooks/store";

export const ListaProveedores = () => {
  const proveedores: any = useAppSelector((state) => state.proveedores);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <Table
      scroll={{ y: "60vh" }}
      columns={columns}
      rowKey="gastoId"
      dataSource={proveedores}
      pagination={false}
    />
  );
};
