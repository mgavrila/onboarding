import { useState } from "react";
import type { NextPageWithLayout } from "../../_app";
import type { RadioChangeEvent } from "antd";
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
  theme,
} from "antd";
import Layout from "../../../components/layout/Layout";
import {
  FileAddOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import MembersDrawer from "../../../components/projects/MembersDrawer";
import type { MemberType } from "../../../typings/types";
import { api } from "../../../utils/api";

const { useToken } = theme;

const NewProject: NextPageWithLayout = () => {
  const router = useRouter();
  const { token } = useToken();

  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectVisibility, setProjectVisibility] = useState("public");
  const addProjectMutation = api.project.addProject.useMutation();
  const [form] = Form.useForm();

  const onCancel = () => {
    router.back();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onAddMember = (member: MemberType) => {
    setMembers((prevState) => [...prevState, member]);
  };

  const onDeleteMember = (memberId: string) => {
    setMembers((prevState) =>
      prevState.filter((member) => member.id !== memberId)
    );
  };

  const onChangeVisibility = (evt: RadioChangeEvent) => {
    setProjectVisibility(evt.target.value as string);
  };

  const submitForm = () => {
    addProjectMutation.mutate({
      name: projectName,
      members: members.map((member) => member.id),
      visibility: projectVisibility,
    });

    form.resetFields();
    setProjectName("");
    setMembers([]);
    setProjectVisibility("public");
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
                  color: token.colorTextSecondary,
                }}
              />
              <Typography.Title
                level={3}
                style={{ color: token.colorTextSecondary }}
              >
                Create new project
              </Typography.Title>
              <Typography.Paragraph style={{ color: token.colorTextSecondary }}>
                Create a blank project to plan your work, add members, and many
                more things.
              </Typography.Paragraph>
            </div>
          </Col>

          <Col span={1}>
            <Divider
              style={{
                backgroundColor: token.colorTextSecondary,
                height: "100%",
              }}
              type="vertical"
            />
          </Col>

          <Col span={15} style={{ textAlign: "left" }}>
            <Form
              form={form}
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              onFinish={submitForm}
            >
              <Form.Item
                label={
                  <label style={{ color: token.colorTextSecondary }}>
                    Project Name
                  </label>
                }
                name="projectName"
                rules={[
                  {
                    required: true,
                    message: "Please input your project name!",
                  },
                ]}
              >
                <Input
                  placeholder="Write name here"
                  value={projectName}
                  onChange={(evt) => setProjectName(evt.target.value)}
                />
              </Form.Item>

              <Form.Item
                style={{ textAlign: "left" }}
                label={
                  <div
                    style={{ color: token.colorTextSecondary }}
                    className="flex flex-row items-center gap-2"
                  >
                    <label>Visibility Level</label>

                    <Tooltip
                      placement="top"
                      title={
                        <div
                          style={{ color: token.colorTextSecondary }}
                          className="flex flex-col"
                        >
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
                  value={projectVisibility}
                  onChange={onChangeVisibility}
                  options={[
                    {
                      label: (
                        <div
                          style={{ color: token.colorTextSecondary }}
                          className="flex flex-row items-center gap-2"
                        >
                          <label>Private</label>
                        </div>
                      ),
                      value: "private",
                    },
                    {
                      label: (
                        <div
                          style={{ color: token.colorTextSecondary }}
                          className="flex flex-row items-center gap-2"
                        >
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
                    style={{ marginBottom: 6, color: token.colorTextSecondary }}
                  >
                    Members
                  </Typography.Title>

                  <Button
                    type="ghost"
                    shape="circle"
                    className="flex items-center justify-center"
                    style={{ color: token.colorTextSecondary }}
                    onClick={showDrawer}
                    icon={<PlusCircleOutlined />}
                  />
                </div>

                {members.map((member) => (
                  <div
                    key={member.id}
                    style={{ borderColor: token.colorTextSecondary }}
                    className="flex items-center justify-between border border-x-0 border-t-0"
                  >
                    <Typography.Paragraph
                      className="py-4"
                      style={{
                        textAlign: "left",
                        margin: 0,
                        color: token.colorTextSecondary,
                      }}
                    >
                      {member.name} - {member.email}
                    </Typography.Paragraph>

                    <Button
                      shape="circle"
                      style={{ color: token.colorError }}
                      className={`flex items-center justify-center`}
                      icon={<DeleteOutlined />}
                      type="ghost"
                      onClick={() => onDeleteMember(member.id)}
                    />
                  </div>
                ))}
              </Form.Item>

              <Form.Item style={{ margin: 0 }}>
                <div className="justify-left flex h-full w-full flex-row items-center gap-4">
                  <Button
                    style={{ color: token.colorTextSecondary }}
                    className="flex items-center justify-center"
                    htmlType="submit"
                  >
                    Create
                  </Button>
                  <Button
                    style={{ color: token.colorTextSecondary }}
                    className="flex items-center justify-center"
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

      <MembersDrawer
        open={open}
        onClose={onClose}
        onAddMember={onAddMember}
        onDeleteMember={onDeleteMember}
        members={members}
      />
    </>
  );
};

NewProject.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default NewProject;
