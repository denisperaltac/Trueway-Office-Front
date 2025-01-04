import { useState } from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useUsersActions } from "../../hooks/useUsersActions";
import { useUserActions } from "../../hooks/useUserActions";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbLogout,
} from "react-icons/tb";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BiCategoryAlt, BiHome } from "react-icons/bi";
import { MdOutlineReceiptLong } from "react-icons/md";
import { Gastos } from "../gastos/Gastos";
import { Categorias } from "../categorias/Categorias";
import { Home } from "../home/Home";
import { Ingresos } from "../ingresos/Ingresos";

const { Sider, Content } = Layout;

export const Dashboard = () => {
  const { removeUser } = useUsersActions();
  const { logOutUser } = useUserActions();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="containerApp">
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
                <MdOutlineReceiptLong
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
              key: "4",
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
          ]}
        />
      </Sider>

      <Layout>
        <div className="flex justify-between items-center min-h-3 p-3">
          {collapsed ? (
            <TbLayoutSidebarRightCollapse
              size="30px"
              className="scaleIcon"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <TbLayoutSidebarLeftCollapse
              size="30px"
              className="scaleIcon"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}

          <TbLogout size="30px" className="scaleIcon" onClick={logOutUser} />
        </div>

        <Content
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
          onClick={() => removeUser(1)}
        >
          {selectedKey === "1" && <Home />}
          {selectedKey === "2" && <Gastos />}
          {selectedKey === "3" && <Categorias />}
          {selectedKey === "4" && <Ingresos />}
        </Content>
      </Layout>
    </Layout>
  );
};
