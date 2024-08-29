import { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useUsersActions } from "../../hooks/useUsersActions";
const { Sider, Content } = Layout;
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbLogout,
} from "react-icons/tb";
import { useUserActions } from "../../hooks/useUserActions";
import { Gastos } from "../gastos/Gastos";
import { Categorias } from "../categorias/Categorias";
import { Home } from "../home/Home";

export const Dashboard = () => {
  const { removeUser } = useUsersActions();
  const { logOutUser } = useUserActions();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };
  console.log(selectedKey);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="containerApp">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Gastos",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Categorias",
            },
          ]}
        />
      </Sider>
      <Layout>
        <div
          className="flex justify-between items-center min-h-3 p-3"
          style={{ backgroundColor: colorBgContainer }}
        >
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

          <TbLogout
            size="30px"
            className="scaleIcon"
            onClick={() => logOutUser()}
          />
        </div>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          onClick={() => removeUser(1)}
        >
          {selectedKey === "1" && <Home />}
          {selectedKey === "2" && <Gastos />}
          {selectedKey === "3" && <Categorias />}
        </Content>
      </Layout>
    </Layout>
  );
};
