import React from "react";
import { Divider } from "semantic-ui-react";

import Positions from "components/Position/";
import Orders from "components/Order";
import Charts from "components/Charts";

const DefaultMain = () => {
  return (
    <React.Fragment>
      <Divider hidden />

      <Divider section />
      <Orders />
      <Divider hidden />

      <Divider section />
      <Positions header='Positions' />
      <Divider hidden />

      <Divider section />
      <Charts header='Charts' autosize />
      <Divider hidden />
    </React.Fragment>
  );
};

export default DefaultMain;
