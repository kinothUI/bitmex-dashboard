import React from "react";
import { Grid, Divider } from "semantic-ui-react";

import AccountStatistic from "components/AccountStatistic";
import OrderForm from "components/Order/OrderForm";

const DefaultHeader = () => {
  return (
    <React.Fragment>
      <AccountStatistic />
      <Divider section />
      <Grid>
        <Grid.Row>
          <Grid.Column width='8'>
            <OrderForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default DefaultHeader;
