import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layout/Layout";

const Timesheet: NextPageWithLayout = () => {
  return null;
};

Timesheet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Timesheet;
