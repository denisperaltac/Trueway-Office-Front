import { Table, Tag } from "antd";
import { useAppSelector } from "../../hooks/store";
import { GastosType } from "../../services/interfaces";
import { CategoriaFormat } from "../../services/CategoriaFormat";

export const ListaCategorias = () => {
  const categorias: any = useAppSelector((state) => state.categorias);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icono",
      key: "ícono",
      render: (_: any, record: GastosType) => {
        const categoria = categorias.find(
          (cat: any) => cat.categoriaId === record.categoriaId
        );

        if (!categoria) return "N/A";

        let { icon, color } = CategoriaFormat(categoria);
        return (
          <Tag
            color={color}
            icon={icon}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "36px",
              fontSize: "16px",
              height: "30px",
            }}
          ></Tag>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey="gastoId"
      dataSource={categorias}
      pagination={false}
    />
  );
};
