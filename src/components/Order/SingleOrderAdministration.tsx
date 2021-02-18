import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Table, Button } from "semantic-ui-react";
import moment from "moment-timezone";

import OrderFull from "entities/OrderFull";
import { CANCEL_ORDER, CLEAR_CANCELED_ORDER } from "redux/actions/order";
import { action } from "redux/actions";
import { PositionContext } from "components/Layout/Layout";

interface OwnProps {
  order: OrderFull;
}

type Props = OwnProps;

function SingleOrderAdministration(props: Props) {
  const { order } = props;
  const dispatch = useDispatch();
  const {
    setSymbol,
    setSymbolClickCount,
    setPositionSize,
    setPositionSizeClickCount,
  } = React.useContext(PositionContext);

  const buySide = order.side === "Buy";
  const orderFilled = order.ordStatus === "Filled";
  const orderCanceled = order.ordStatus === "Canceled";
  const orderRejected = order.ordStatus === "Rejected";
  const orderFilledOrCanceledOrRejected = orderFilled || orderCanceled || orderRejected;

  const filled = buySide
    ? `${order.orderQty - order.leavesQty}`
    : `-${order.orderQty - order.leavesQty}`;
  const timestamp = moment(order.transactTime).format("L LTS");

  const handleCancelOrder = () => dispatch(action(CANCEL_ORDER, { order }));
  const handleClearCanceledOrder = () => dispatch(action(CLEAR_CANCELED_ORDER, { order }));

  return (
    <Table.Row>
      <Table.Cell className={buySide ? "positive-value" : "negative-value"}>
        <span
          onClick={() => {
            setSymbol(order.symbol);
            setSymbolClickCount((old) => old + 1);
          }}
          className='underline-text'
        >
          {order.symbol}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span
          onClick={() => {
            setPositionSize(order.orderQty);
            setPositionSizeClickCount((old) => old + 1);
          }}
          className='underline-text'
        >
          {order.orderQty}
        </span>
      </Table.Cell>
      <Table.Cell>{order.price}</Table.Cell>
      <Table.Cell>{filled}</Table.Cell>
      <Table.Cell>{order.leavesQty}</Table.Cell>
      <Table.Cell>{order.ordType}</Table.Cell>
      <Table.Cell>{order.ordStatus}</Table.Cell>
      <Table.Cell>{timestamp}</Table.Cell>
      <Table.Cell>
        <Button
          icon={orderFilledOrCanceledOrRejected ? "check" : "cancel"}
          color={orderFilledOrCanceledOrRejected ? "green" : "red"}
          onClick={orderFilledOrCanceledOrRejected ? handleClearCanceledOrder : handleCancelOrder}
          inverted
          size='tiny'
        />
      </Table.Cell>
    </Table.Row>
  );
}

export default SingleOrderAdministration;
