import React from "react";
import { Table } from "semantic-ui-react";

import PositionFull from "entities/PositionFull";
import { useInstrument } from "components/Order/OrderForm";

interface OwnProps {
  position: PositionFull;
}

type Props = OwnProps;

const SinglePositionAdministration = (props: Props) => {
  const { position } = props;
  const { setSelectedInstrument } = useInstrument();

  const unrealisedPnl = position.unrealisedGrossPnl / 100000000;
  const realisedPnl = position.realisedGrossPnl / 100000000;

  return (
    <Table.Row>
      <Table.Cell className={position.currentQty < 0 ? "negative-value" : "positive-value"}>
        <div
          className='position-instrument-symbol'
          onClick={() => setSelectedInstrument(position.symbol)}
        >
          {position.symbol}
        </div>
      </Table.Cell>
      <Table.Cell>{position.currentQty}</Table.Cell>
      <Table.Cell>{position.avgEntryPrice}</Table.Cell>
      <Table.Cell>{position.liquidationPrice}</Table.Cell>
      <Table.Cell>{position.markPrice}</Table.Cell>
      <Table.Cell>{unrealisedPnl}</Table.Cell>
      <Table.Cell>{realisedPnl}</Table.Cell>
    </Table.Row>
  );
};

export default SinglePositionAdministration;
