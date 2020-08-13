import React from "react";
import { Divider } from "semantic-ui-react";

import AccountStatistic from "components/AccountStatistic";
import OrderForm from "components/Order/OrderForm";

const DefaultHeader = () => {
  return (
    <React.Fragment>
      <AccountStatistic />
      <Divider section />
      <OrderForm />
    </React.Fragment>
  );
};

export default DefaultHeader;
