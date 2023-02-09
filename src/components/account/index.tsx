import React from "react";
import { Avatar, Dropdown, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { signOut, useSession } from "next-auth/react";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Button
        type="ghost"
        style={{ width: "100%" }}
        onClick={() => void signOut()}
      >
        Log Out
      </Button>
    ),
  },
];

const Account: React.FC = () => {
  const session = useSession();

  const { data } = session;

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
      <Button
        style={{
          width: "auto",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => e.preventDefault()}
        type="text"
        icon={
          <Avatar
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            gap={0}
            size={40}
            src={data?.user?.image ?? null}
            icon={<UserOutlined />}
          />
        }
      >
        <Typography style={{ color: "white", marginLeft: "8px" }}>
          {data?.user?.name ?? "Account"}
        </Typography>
      </Button>
    </Dropdown>
  );
};

export default Account;
