import React, { useState } from "react";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { FieldTimeOutlined, DashboardOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Footer, Sider, Content } = Layout;

const MENU_ITEMS = [
  {
    key: "/dashboard",
    icon: DashboardOutlined,
    label: "Dashboard",
  },
  {
    key: "/dashboard/account",
    icon: FieldTimeOutlined,
    label: "Account",
  },
];

const items: MenuProps["items"] = MENU_ITEMS.map((item) => {
  return {
    key: item.key,
    icon: React.createElement(item.icon),
    label: item.label,
  };
});

const layoutStyle: React.CSSProperties = {
  height: "100vh",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const CustomLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleClick: MenuProps["onClick"] = (props) => {
    router.push(props.key);
  };

  return (
    <Layout style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={siderStyle}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
          theme="dark"
          onClick={handleClick}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
