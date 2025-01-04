import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { FormatMoneyUSD } from "../../services/FormatMoney";
import {
  IngresoType,
  FormState,
  TableParams,
  ListaIngresosProps,
} from "../../services/interfaces";

import { CategoriaIngresos } from "../../services/Constants";
import { IngresoFormat } from "../../services/IngresoFormat";

export const ListaIngresos: React.FC<ListaIngresosProps> = ({
  reloadIngresos,
}) => {
  const [data, setData] = useState<IngresoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, _] = useState<FormState>({});
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const reloadParams = [
    reloadIngresos,
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
    const baseUrl = `${BaseUrl}getIngresos`;

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
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      render: (text: number) => (text ? FormatMoneyUSD(text) : "N/A"),
    },
    {
      title: "Tipo",
      key: "type",
      render: (_: any, record: IngresoType) => {
        const categoria = CategoriaIngresos.find(
          (cat: any) => cat === record.type
        );

        if (!categoria) return "N/A";

        let { icon, color } = IngresoFormat(categoria);

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
            {categoria}
          </Tag>
        );
      },
    },

    {
      title: "Fecha",
      dataIndex: "fechaEfectuado",
      key: "fechaEfectuado",
      render: (text: string) => new Date(text).toLocaleDateString(), // Ajusta el formato de fecha según necesites
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
