import React, { useState } from "react";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { FieldTimeOutlined, DashboardOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useRouter as useNextRouter } from "next/router";

import Account from "../account";

const { Header, Sider, Content } = Layout;

const MENU_ITEMS = [
  {
    key: "/dashboard",
    icon: DashboardOutlined,
    label: "Dashboard",
  },
  {
    key: "/timesheet",
    icon: FieldTimeOutlined,
    label: "Timesheet",
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
  display: "flex",
  justifyContent: "flex-end",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#00274d",
};

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
  background: "#231942",
};

const CustomLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useNextRouter();
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
          defaultSelectedKeys={[pathname]}
          style={{
            height: "100%",
            borderRight: 0,
            paddingTop: "8px",
          }}
          items={items}
          theme="dark"
          onClick={handleClick}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Account />
        </Header>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
