import { useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useUsersActions } from "../../hooks/useUsersActions";
import { useUserActions } from "../../hooks/useUserActions";
import { TbLogout } from "react-icons/tb";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BiCategoryAlt, BiHome } from "react-icons/bi";
import { Gastos } from "../gastos/Gastos";
import { Categories } from "../categorias/Categorias";
import { Home } from "../home/Home";
import { Ingresos } from "../ingresos/Ingresos";
import { PiMapPinAreaBold, PiTruckDuotone } from "react-icons/pi";
import { Proveedor } from "../proveedores/Proveedor";
import { IoReceiptOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { Empleados } from "../empleados/Empleados";
import LogoOffice2 from "../../assets/LogoOffice2.png";
import { Areas } from "../areas/Areas";
import { Usuarios } from "../usuarios/Usuarios";
import { FaUsers } from "react-icons/fa";

const { Sider, Content } = Layout;

export const Dashboard = () => {
  const { removeUser } = useUsersActions();
  const { logOutUser } = useUserActions();
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getContent = () => {
    switch (selectedKey) {
      case "1":
        return <Home />;
      case "2":
        return <Gastos />;
      case "3":
        return <Ingresos />;
      case "4":
        return <Categories />;
      case "5":
        return <Proveedor />;
      case "6":
        return <Empleados />;
      case "7":
        return <Areas />;
      case "8":
        return <Usuarios />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout className="containerApp">
      <Sider trigger={null} collapsed={true}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          items={[
            {
              key: "0",
              icon: (
                <img
                  src={LogoOffice2}
                  alt="Logo"
                  className="h-8"
                  style={{ minWidth: "65px", marginRight: "-20px" }}
                />
              ),
              style: {
                pointerEvents: "none",
                display: "flex",
                margin: "5px 0px",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100%",
              },
            },
            {
              key: "1",
              label: "Home",
              icon: (
                <BiHome
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "2",
              label: "Gastos",
              icon: (
                <IoReceiptOutline
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "3",
              label: "Ingresos",
              icon: (
                <FaRegMoneyBill1
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "4",
              label: "Categorias",
              icon: (
                <BiCategoryAlt
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "5",
              label: "Proveedores",
              icon: (
                <PiTruckDuotone
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "6",
              label: "Empleados",
              icon: (
                <BsPeople
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "7",
              label: "Areas",
              icon: (
                <PiMapPinAreaBold
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            {
              key: "8",
              label: "Usuarios",
              icon: (
                <FaUsers
                  size="25px"
                  style={{ minWidth: "30px", marginLeft: "-8px" }}
                />
              ),
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
          ]}
        />
      </Sider>

      <Layout>
        <div className="flex justify-end items-center min-h-3 p-3">
          <TbLogout size="30px" className="scaleIcon" onClick={logOutUser} />
        </div>

        <Content
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
          onClick={() => removeUser(1)}
        >
          {getContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export const AdminRoute = {
  path: "/",
  element: <Dashboard />,
};
