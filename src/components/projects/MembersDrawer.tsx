import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Drawer, Avatar, List, Button, Input } from "antd";
import { api } from "../../utils/api";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import type { MemberType } from "../../typings/types";

type MembersDrawerType = {
  onDeleteMember: (memberId: string) => void;
  onAddMember: (member: MemberType) => void;
  onClose: () => void;
  open: boolean;
  members: MemberType[];
};

const MembersDrawer: React.FC<MembersDrawerType> = ({
  onAddMember,
  onDeleteMember,
  onClose,
  open,
  members,
}) => {
  const { data: sessionData } = useSession();

  const { data: allUsers } = api.user.getAll.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const [filter, setFilter] = useState("");

  return (
    <Drawer title="Members" placement="right" onClose={onClose} open={open}>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Search"
          value={filter}
          onChange={(evt) => setFilter(evt.target.value)}
        />
        <List
          itemLayout="horizontal"
          dataSource={allUsers?.filter((user) =>
            filter === ""
              ? true
              : user.name?.includes(filter) || user.email?.includes(filter)
          )}
          renderItem={(item) => {
            const memberExist = !!members.find(
              (member) => member.id === item.id
            );

            return (
              <List.Item
                style={{ paddingLeft: 0, paddingRight: 0 }}
                key={item.id}
                actions={[
                  memberExist && (
                    <Button
                      key={`delete-${item.id}`}
                      type="ghost"
                      shape="circle"
                      className="flex items-center justify-center text-[#B20000] hover:text-[#00274d]"
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteMember(item.id)}
                    />
                  ),
                  <Button
                    key={`add-${item.id}`}
                    type="ghost"
                    shape="circle"
                    className="flex items-center justify-center hover:text-[#00274d] disabled:text-[#d3d3d3]"
                    icon={<PlusCircleOutlined />}
                    onClick={() => onAddMember(item)}
                    disabled={memberExist}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<p>{item.name}</p>}
                  description={item.email}
                />
              </List.Item>
            );
          }}
        />
      </div>
    </Drawer>
  );
};

export default MembersDrawer;
