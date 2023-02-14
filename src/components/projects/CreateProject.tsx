import React from "react";
import { Typography, Button, theme } from "antd";
import { useRouter } from "next/navigation";

const { useToken } = theme;

const CreateProject: React.FC = () => {
  const { token } = useToken();

  const router = useRouter();

  const onNewProject = () => {
    router.push("/projects/new");
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Typography.Title level={3} style={{ color: token.colorTextSecondary }}>
        Projects
      </Typography.Title>

      <Button
        onClick={onNewProject}
        style={{ color: token.colorTextSecondary }}
      >
        New Project
      </Button>
    </div>
  );
};

export default CreateProject;
