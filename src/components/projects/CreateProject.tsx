import React from "react";
import { Typography, Button } from "antd";
import { useRouter } from "next/navigation";

const CreateProject: React.FC = () => {
  const router = useRouter();

  const onNewProject = () => {
    router.push("/projects/new");
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Typography.Title level={3} style={{ color: "#ECECEF" }}>
        Projects
      </Typography.Title>

      <Button className="text-[#ECECEF]" onClick={onNewProject}>
        New Project
      </Button>
    </div>
  );
};

export default CreateProject;
