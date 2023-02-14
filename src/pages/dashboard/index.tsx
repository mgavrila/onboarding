import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layout/Layout";

const Dashboard: NextPageWithLayout = () => {
  return null;
};

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
