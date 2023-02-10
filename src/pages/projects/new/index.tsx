import { useState } from "react";
import type { NextPageWithLayout } from "../../_app";
import {
  Col,
  Row,
  Typography,
  Divider,
  Form,
  Input,
  Radio,
  Tooltip,
  Button,
  Drawer,
} from "antd";
import Layout from "../../../components/layout/Layout";
import {
  FileAddOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const DUMMY_MEMBERS = [
  {
    id: 1,
    name: "Member 1",
  },
  {
    id: 2,
    name: "Member 2",
  },
  {
    id: 3,
    name: "Member 3",
  },
];

const NewProject: NextPageWithLayout = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    router.back();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-12 py-6 px-16">
        <Row>
          <Col span={5}>
            <div className="flex h-full w-full flex-col items-start gap-1 text-left">
              <FileAddOutlined
                style={{
                  fontSize: "76px",
                  marginBottom: "8px",
                }}
              />
              <Typography.Title level={3} style={{ color: "#ECECEF" }}>
                Create new project
              </Typography.Title>
              <Typography.Paragraph style={{ color: "#ECECEF" }}>
                Create a blank project to plan your work, add members, and many
                more things.
              </Typography.Paragraph>
            </div>
          </Col>

          <Col span={1}>
            <Divider
              style={{ backgroundColor: "#ECECEF", height: "100%" }}
              type="vertical"
            />
          </Col>

          <Col span={15} style={{ textAlign: "left" }}>
            <Form
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Form.Item
                label={<label style={{ color: "#ECECEF" }}>Project Name</label>}
                name="projectName"
                rules={[
                  {
                    required: true,
                    message: "Please input your project name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ textAlign: "left" }}
                label={
                  <div className="flex flex-row items-center gap-2 text-[#ECECEF]">
                    <label>Visibility Level</label>

                    <Tooltip
                      placement="top"
                      title={
                        <div className="flex flex-col text-[#ECECEF]">
                          <label>
                            <span className="font-bold">Private</span> - visible
                            to members only.
                          </label>
                          <label>
                            <span className="font-bold">Public</span> - visible
                            to everyone.
                          </label>
                        </div>
                      }
                    >
                      <QuestionCircleOutlined style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </div>
                }
              >
                <Radio.Group
                  options={[
                    {
                      label: (
                        <div className="flex flex-row items-center gap-2 text-[#ECECEF]">
                          <label>Private</label>
                        </div>
                      ),
                      value: "private",
                    },
                    {
                      label: (
                        <div className="flex flex-row items-center gap-2 text-[#ECECEF]">
                          <label>Public</label>
                        </div>
                      ),
                      value: "public",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <div className="flex w-full items-center gap-1">
                  <Typography.Title
                    level={3}
                    style={{ color: "#ECECEF", marginBottom: 6 }}
                  >
                    Members
                  </Typography.Title>

                  <Button
                    type="ghost"
                    shape="circle"
                    className="flex items-center justify-center text-[#ECECEF]"
                    onClick={showDrawer}
                    icon={<PlusCircleOutlined />}
                  />
                </div>

                {DUMMY_MEMBERS.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border border-x-0 border-t-0 border-[#ECECEF]"
                  >
                    <Typography.Paragraph
                      className="py-4"
                      style={{
                        color: "#ECECEF",
                        textAlign: "left",
                        margin: 0,
                      }}
                    >
                      {member.name}
                    </Typography.Paragraph>

                    <Button
                      shape="circle"
                      className="flex items-center justify-center text-[#B20000] hover:text-[#ECECEF]"
                      icon={<DeleteOutlined />}
                      type="ghost"
                    />
                  </div>
                ))}
              </Form.Item>

              <Form.Item style={{ margin: 0 }}>
                <div className="justify-left flex h-full w-full flex-row items-center gap-4">
                  <Button className="flex items-center justify-center text-[#ECECEF]">
                    Create
                  </Button>
                  <Button
                    className="flex items-center justify-center text-[#ECECEF]"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <Drawer title="Members" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

NewProject.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default NewProject;
