import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useAppSelector } from "../../hooks/store";
import { FormatMoneyUSD } from "../../services/FormatMoney";
import {
  GastosType,
  FormState,
  ListaGastosProps,
  TableParams,
} from "../../services/interfaces";

import { CategoriaFormat } from "../../services/CategoriaFormat";

export const ListaGastos: React.FC<ListaGastosProps> = ({ reloadGastos }) => {
  const [data, setData] = useState<GastosType[]>([]);
  const [loading, setLoading] = useState(false);
  const categorias: any = useAppSelector((state) => state.categorias);
  const [form, _] = useState<FormState>({});
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
      .filter(([_, value]) => value !== undefined)
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
      render: (text: string) => new Date(text).toLocaleDateString(),
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
