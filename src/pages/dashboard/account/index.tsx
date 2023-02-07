import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/layout/Layout";

const Account: NextPageWithLayout = () => {
  return <div>TODO</div>;
};

Account.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Account;
