import React, { useEffect, useState } from "react";
import { Table, Tag, Button, message, Popconfirm } from "antd";
import axiosInstance from "../../config/axios";
import { useAppSelector } from "../../hooks/store";
import { FormatMoneyUSD } from "../../services/FormatMoney";
import { GastosType, TableParams } from "../../services/interfaces";
import { CategoriaFormat } from "../../services/CategoriaFormat";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ListaGastosProps {
  reloadGastos: number;
  setReloadGastos: React.Dispatch<React.SetStateAction<number>>;
  onEdit: (data: any) => void;
}

export const ListaGastos: React.FC<ListaGastosProps> = ({
  reloadGastos,
  setReloadGastos,
  onEdit,
}) => {
  const [data, setData] = useState<GastosType[]>([]);
  const [searchParams, _] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const categorias: any = useAppSelector((state) => state.categorias);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const reloadParams = [
    reloadGastos,
    tableParams.pagination.current,
    tableParams.pagination.pageSize,
    tableParams.sortOrder,
    tableParams.sortField,
    JSON.stringify(tableParams.filters),
  ];

  useEffect(() => {
    fetchData();
  }, reloadParams);

  const fetchData = async () => {
    setLoading(true);
    const baseUrl = `expenses/get`;

    const params = {
      montoMin: searchParams.montoMin,
      montoMax: searchParams.montoMax,
      categoriaId: searchParams.categoriaId,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
      size: tableParams.pagination.pageSize,
      page: tableParams.pagination.current,
      sort: searchParams.sort,
    };

    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const url = `${baseUrl}?${queryString}`;
    try {
      const res = await axiosInstance.get(url);
      setData(res.data.result);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.count,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error al cargar los gastos");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setData([]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`expenses/delete/${id}`);
      const now = new Date();
      setReloadGastos(now.getTime());
      message.success("Gasto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      message.error("Error al eliminar el gasto");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      render: (text: number) => (text ? FormatMoneyUSD(text) : "N/A"),
    },
    {
      title: "Categoría",
      key: "categoria",
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
              paddingInline: "10px",
              maxWidth: "180px",
              fontSize: "16px",
            }}
          >
            {categoria.name}
          </Tag>
        );
      },
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text: string) =>
        text
          ? text.slice(8, 10) + "/" + text.slice(5, 7) + "/" + text.slice(0, 4)
          : "N/A",
    },
    {
      title: "Notas",
      dataIndex: "notas",
      key: "notas",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: GastosType) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<FaEdit className="text-blue-600" />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Eliminar gasto"
            description="¿Estás seguro de querer eliminar este gasto?"
            onConfirm={() => handleDelete(record.gastoId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<FaTrash className="text-red-600" />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey="gastoId"
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
