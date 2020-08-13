import React from "react";
import { useDispatch } from "react-redux";
import { Table, Button } from "semantic-ui-react";
import moment from "moment-timezone";

import OrderFull from "entities/OrderFull";
import { CANCEL_ORDER, CLEAR_CANCELED_ORDER } from "redux/actions/order";
import { action } from "redux/actions";

interface OwnProps {
  order: OrderFull;
}

type Props = OwnProps;

function SingleOrderAdministration(props: Props) {
  const { order } = props;
  const dispatch = useDispatch();

  const buySide = order.side === "Buy";
  const orderCanceled = order.ordStatus === "Canceled";
  const orderRejected = order.ordStatus === "Rejected";

  const filled = buySide
    ? `${order.orderQty - order.leavesQty}`
    : `-${order.orderQty - order.leavesQty}`;
  const timestamp = moment(order.transactTime).format("L LTS");

  const handleCancelOrder = () => dispatch(action(CANCEL_ORDER, { order }));
  const handleClearCanceledOrder = () => dispatch(action(CLEAR_CANCELED_ORDER, { order }));

  return (
    <Table.Row>
      <Table.Cell className={buySide ? "positive-value" : "negative-value"}>
        {order.symbol}
      </Table.Cell>
      <Table.Cell>{order.orderQty}</Table.Cell>
      <Table.Cell>{order.price}</Table.Cell>
      <Table.Cell>{filled}</Table.Cell>
      <Table.Cell>{order.leavesQty}</Table.Cell>
      <Table.Cell>{order.ordType}</Table.Cell>
      <Table.Cell>{order.ordStatus}</Table.Cell>
      <Table.Cell>{timestamp}</Table.Cell>
      <Table.Cell>
        <Button
          icon={orderRejected ? "check" : orderCanceled ? "check" : "cancel"}
          color={orderRejected ? "green" : orderCanceled ? "green" : "red"}
          onClick={
            orderRejected
              ? handleClearCanceledOrder
              : orderCanceled
              ? handleClearCanceledOrder
              : handleCancelOrder
          }
          inverted
          size='tiny'
        />
      </Table.Cell>
    </Table.Row>
  );
}

export default SingleOrderAdministration;
