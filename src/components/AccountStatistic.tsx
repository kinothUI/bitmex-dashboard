import React from "react";
import { useSelector } from "react-redux";
import { Statistic, Icon, Segment } from "semantic-ui-react";

import { StoreState } from "types";

const trimDecimal = (value: number, decimal: number) => parseFloat(value.toFixed(decimal));

const AccountStatistic = () => {
  const { margin, position } = useSelector((state: StoreState) => state);

  const marginHasContent = !!margin.content.length;
  const marginContent = margin.content[0];
  const pnlIsPositive = marginHasContent && marginContent.unrealisedPnl >= 0;

  const walletBalance = trimDecimal(
    (marginHasContent && marginContent.walletBalance / 100000000) || 0,
    5
  );
  const unrealisedPnl = trimDecimal(
    (marginHasContent && marginContent.unrealisedPnl / 100000000) || 0,
    5
  );
  const marginBalance = trimDecimal((marginHasContent && walletBalance + unrealisedPnl) || 0, 5);
  const availableBalance = trimDecimal(
    (marginHasContent && marginContent.availableMargin / 100000000) || 0,
    5
  );
  const openPositions = position.content.filter((position) => position.currentQty !== 0).length;

  return (
    <Segment basic loading={margin.isLoading}>
      <Statistic.Group widths='5' size='mini' className='center'>
        <Statistic>
          <Statistic.Value>
            <Icon name='bitcoin' color='orange' />
            {walletBalance}
          </Statistic.Value>
          <Statistic.Label>Wallet Balance</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Icon name='bitcoin' color={pnlIsPositive ? "green" : "red"} />
            {unrealisedPnl}
          </Statistic.Value>
          <Statistic.Label>Total unrealised PnL</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{marginBalance}</Statistic.Value>
          <Statistic.Label>Margin Balance</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{availableBalance}</Statistic.Value>
          <Statistic.Label>Available Balance</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{openPositions}</Statistic.Value>
          <Statistic.Label>Open Positions</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
};

export default AccountStatistic;
