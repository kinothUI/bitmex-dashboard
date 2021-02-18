import React from "react";
import { Table } from "semantic-ui-react";

import PositionFull from "entities/PositionFull";
import { PositionContext } from "components/Layout/Layout";

interface OwnProps {
  position: PositionFull;
}

type Props = OwnProps;

const SinglePositionAdministration = (props: Props) => {
  const { position } = props;
  const {
    setSymbol,
    setSymbolClickCount,
    setPositionSize,
    setPositionSizeClickCount,
  } = React.useContext(PositionContext);

  const unrealisedPnl = position.unrealisedGrossPnl / 100000000;
  const realisedPnl = position.realisedGrossPnl / 100000000;

  return (
    <Table.Row>
      <Table.Cell className={position.currentQty < 0 ? "negative-value" : "positive-value"}>
        <span
          onClick={() => {
            setSymbol(position.symbol);
            setSymbolClickCount((old) => old + 1);
          }}
          className='underline-text'
        >
          {position.symbol}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span
          onClick={() => {
            setPositionSize(position.currentQty);
            setPositionSizeClickCount((old) => old + 1);
          }}
          className='underline-text'
        >
          {position.currentQty}
        </span>
      </Table.Cell>
      <Table.Cell>{position.avgEntryPrice}</Table.Cell>
      <Table.Cell>{position.liquidationPrice}</Table.Cell>
      <Table.Cell>{position.markPrice}</Table.Cell>
      <Table.Cell>{unrealisedPnl}</Table.Cell>
      <Table.Cell>{realisedPnl}</Table.Cell>
    </Table.Row>
  );
};

export default SinglePositionAdministration;
