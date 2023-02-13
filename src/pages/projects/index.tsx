import type { NextPageWithLayout } from "../_app";
import { Col, Row, Divider, Card, Typography, Space } from "antd";
import Layout from "../../components/layout/Layout";
import CreateProject from "../../components/projects/CreateProject";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";

const Projects: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  const { data: allProjects } = api.project.getAll.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex w-full flex-col py-6 px-16">
      <Row>
        <CreateProject />
      </Row>
      <Divider style={{ backgroundColor: "#ffffff", margin: "12px 0px" }} />
      <Row gutter={[16, 16]}>
        {allProjects?.map((project) => (
          <Col key={project?.id}>
            <Card
              title={project?.projectName}
              bordered={false}
              style={{ width: 300 }}
            >
              <Typography>Members: {project?.userIDs?.length}</Typography>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

Projects.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Projects;
