import type { NextPageWithLayout } from "../_app";
import { Col, Row, Divider } from "antd";
import Layout from "../../components/layout/Layout";
import CreateProject from "../../components/projects/CreateProject";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="flex w-full flex-col py-6 px-16">
      <Row>
        <CreateProject />
      </Row>
      <Divider style={{ backgroundColor: "#ffffff", margin: "12px 0px" }} />
      <Row>
        <Col span={24}>TODO</Col>
      </Row>
    </div>
  );
};

Projects.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Projects;
