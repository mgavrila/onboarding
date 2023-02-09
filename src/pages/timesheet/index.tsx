import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layout/Layout";

const Timesheet: NextPageWithLayout = () => {
  return <div>TODO</div>;
};

Timesheet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Timesheet;
