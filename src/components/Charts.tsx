import React from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import { Grid, Header } from "semantic-ui-react";

interface OwnProps {
  header: string;
  autosize: boolean;
}

type Props = OwnProps;

const Chart = (props: Props) => {
  const { autosize, header } = props;

  return (
    <React.Fragment>
      <Header as='h1' content={header} textAlign='left' />
      <Grid columns='2' stackable>
        <Grid.Row>
          <Grid.Column style={{ height: "375px" }}>
            <TradingViewWidget autosize={autosize} symbol='BITMEX:XBTUSD' theme={Themes.LIGHT} />
          </Grid.Column>
          <Grid.Column style={{ height: "375px" }}>
            <TradingViewWidget autosize={autosize} symbol='BITMEX:XBTZ20' theme={Themes.LIGHT} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default Chart;
