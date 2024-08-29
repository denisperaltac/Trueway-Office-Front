import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useAppSelector } from "../../hooks/store";

interface DataType {
  gastoId: number;
  name: string;
  categoriaId: number;
  fechaEfectuado: string;
  monto: number;
  notes?: string;
  pagado?: boolean;
}

interface FormState {
  montoMin?: number;
  montoMax?: number;
  categoriaId?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  sort?: string;
}

interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
    total?: number;
  };
  sortOrder?: string;
  sortField?: string;
  filters?: any;
}

interface DataType {
  gastoId: number;
  name: string;
  categoriaId: number;
  fechaEfectuado: string;
  notes?: string;
  pagado?: boolean;
}

interface ListaGastosProps {
  reloadGastos: number;
}

export const ListaGastos: React.FC<ListaGastosProps> = ({ reloadGastos }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const categorias: any = useAppSelector((state) => state.categorias);
  const [form, setForm] = useState<FormState>({});
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    fetchData();
  }, [reloadGastos]);

  const fetchData = () => {
    setLoading(true);
    const baseUrl = `${BaseUrl}getGastos`;

    const params = {
      montoMin: form.montoMin,
      montoMax: form.montoMax,
      categoriaId: form.categoriaId,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      size: tableParams.pagination.pageSize,
      page: tableParams.pagination.current,
      sort: form.sort,
    };

    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const url = `${baseUrl}?${queryString}`;
    axios.get(url).then((res) => {
      setData(res.data.result);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.count,
        },
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination.current,
    tableParams.pagination.pageSize,
    tableParams.sortOrder,
    tableParams.sortField,
    JSON.stringify(tableParams.filters),
  ]);

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

  const columns = [
    {
      title: "ID",
      dataIndex: "gastoId",
      key: "gastoId",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      render: (text: number) =>
        text
          ? `$${text.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "N/A",
    },
    {
      title: "Categoría",
      key: "categoria",
      render: (text: any, record: DataType) => {
        const categoria = categorias.find(
          (cat: any) => cat.categoriaId === record.categoriaId
        );
        return categoria ? categoria.name : "N/A";
      },
    },
    {
      title: "Fecha",
      dataIndex: "fechaEfectuado",
      key: "fechaEfectuado",
      render: (text: string) => new Date(text).toLocaleDateString(), // Ajusta el formato de fecha según necesites
    },
    {
      title: "Notas",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Pagado",
      dataIndex: "pagado",
      key: "pagado",
      render: (text: boolean) => (text ? "Sí" : "No"),
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
