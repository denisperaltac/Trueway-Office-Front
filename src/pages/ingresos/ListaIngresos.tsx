import React, { useEffect, useState } from "react";
import { notification, Table, Tag } from "antd";
import axiosInstance from "../../config/axios";
import { FormatMoneyUSD } from "../../services/FormatMoney";
import {
  IngresoType,
  FormState,
  TableParams,
  ListaIngresosProps,
} from "../../services/interfaces";

import { CategoriaIngresos } from "../../services/Constants";
import { IngresoFormat } from "../../services/IngresoFormat";
import { FaRegTrashAlt } from "react-icons/fa";

export const ListaIngresos: React.FC<ListaIngresosProps> = ({
  reloadIngresos,
  setReloadIngresos,
}) => {
  const [api] = notification.useNotification();
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
    const baseUrl = `income/get`;

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
    axiosInstance.get(url).then((res) => {
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

  const handleDelete = (id: number) => {
    setLoading(true); // Mostrar loader
    axiosInstance
      .delete("income/delete/" + id)
      .then(() => {
        const now = new Date();
        setReloadIngresos(now.getTime());
        api.open({
          message: "Ingreso Eliminado",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
          pauseOnHover: false,
        });
      })
      .catch(() => {
        api.open({
          message: "Error al eliminar el ingreso",
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
      dataIndex: "fecha",
      key: "fecha",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
      render: (text: string) => text?.slice(0, 8),
    },
    {
      title: "Eliminar",
      key: "delete",
      render: (_: any, record: IngresoType) => (
        <div
          onClick={() => handleDelete(record.ingresoId)}
          className="iconAction iconDelete"
        >
          <FaRegTrashAlt size={"20px"} />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey="ingresoId"
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
