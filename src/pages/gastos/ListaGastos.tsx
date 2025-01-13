import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import axios from "axios";
import { BaseUrl } from "../../config/config";
import { useAppSelector } from "../../hooks/store";
import { FormatMoneyUSD } from "../../services/FormatMoney";
import { notification } from "antd";
import {
  GastosType,
  ListaGastosProps,
  TableParams,
} from "../../services/interfaces";

import { CategoriaFormat } from "../../services/CategoriaFormat";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";

export const ListaGastos: React.FC<ListaGastosProps> = ({
  reloadGastos,
  form,
  setIsEdit,
  setReloadGastos,
  setGastoId,
}) => {
  const [api, contextHolder] = notification.useNotification();
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

  const fetchData = () => {
    setLoading(true);
    const baseUrl = `${BaseUrl}getGastos`;

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

  const handleEdit = (gasto: any) => {
    const updatedGasto = {
      ...gasto,
      monto: Number(gasto.monto),
      fecha: gasto.fecha ? dayjs(gasto.fecha) : undefined, // Convertir la fecha si existe
    };
    form.setFieldsValue(updatedGasto);

    setIsEdit(true);
    setGastoId(gasto.gastoId);
  };

  const handleDelete = (id: number) => {
    setLoading(true); // Mostrar loader
    axios
      .put(BaseUrl + "deleteGasto", { id })
      .then(() => {
        const now = new Date();
        setReloadGastos(now.getTime());
        api.open({
          message: "Gasto Eliminado",
          type: "success",
          duration: 5,
          placement: "top",
          showProgress: true,
          pauseOnHover: false,
        });
        setIsEdit(false);
      })
      .catch(() => {
        api.open({
          message: "Error al agregar el gasto",
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
        text.slice(8, 10) + "/" + text.slice(5, 7) + "/" + text.slice(0, 4),
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
    {
      title: "Editar",
      key: "edit",
      render: (_: any, record: GastosType) => (
        <div
          className="iconAction iconPencil"
          onClick={() => handleEdit(record)}
        >
          <FiEdit size={"20px"} />
        </div>
      ),
    },
    {
      title: "Eliminar",
      key: "delete",
      render: (_: any, record: GastosType) => (
        <div
          onClick={() => handleDelete(record.gastoId)}
          className="iconAction iconDelete"
        >
          <FaRegTrashAlt size={"20px"} />
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        rowKey="gastoId"
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};
