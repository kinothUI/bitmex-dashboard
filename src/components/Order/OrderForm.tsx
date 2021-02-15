import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Segment } from "semantic-ui-react";

import { PLACE_ORDER } from "redux/actions/order";
import { action } from "redux/actions";
import { StoreState } from "types";
import { Dropdown } from "components/elements/form-inputs/Dropdown";

export function useInstrument() {
  const [instrument, setInstrument] = React.useState("");

  return { selectedInstrument: instrument, setSelectedInstrument: setInstrument };
}

interface OrderState {
  orderQty: number;
  price: number;
  ordType: string;
  side: string;
  symbol: string;
}

const InitialState: OrderState = {
  orderQty: 0,
  price: 0,
  ordType: "Limit",
  side: "",
  symbol: "",
};

function OrderForm() {
  const [order, setOrder] = React.useState(InitialState);
  const dispatch = useDispatch();
  const state = useSelector((state: StoreState) => state);
  const { instrument } = state;
  const { selectedInstrument } = useInstrument();

  React.useEffect(() => {
    setOrder({ ...order, symbol: selectedInstrument });
  }, [selectedInstrument, order]);

  const handleOnChange = (event: React.BaseSyntheticEvent, data: any) =>
    setOrder({ ...order, [event.target.name]: event.target.value } as OrderState);

  const handleOnChangeDropdown = (event: React.BaseSyntheticEvent, data: any) =>
    setOrder({ ...order, [data.name]: data.value } as OrderState);

  const handleSubmitOrder = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(
      action(PLACE_ORDER, { order: { ...order, side: event.target.name, symbol: order.symbol } })
    );
  };

  const symbols = instrument.content
    .map((instrument) => ({
      text: instrument.symbol,
      value: instrument.symbol,
    }))
    .sort();

  return (
    <Segment raised>
      <Form autoComplete='off'>
        <Dropdown
          label='Instrument'
          name='symbol'
          placeholder='--- Select your Instrument ---'
          loading={instrument.isLoading}
          disabled={instrument.isLoading}
          options={symbols}
          onChange={handleOnChangeDropdown}
          // keine ahnung ob das so funktioniert
          selected={selectedInstrument}
        />
        <Form.Input
          type='number'
          label='Quantity'
          placeholder='Order Quantity'
          name='orderQty'
          onChange={handleOnChange}
          defaultValue={0}
        />
        <Form.Input
          type='number'
          label='Limit Price'
          placeholder='Order Limit Price'
          name='price'
          onChange={handleOnChange}
          defaultValue={0}
        />
        <Button
          color='green'
          onClick={handleSubmitOrder}
          name='Buy'
          content='Buy'
          disabled={_.isEmpty(order.symbol)}
        />
        <Button
          color='red'
          onClick={handleSubmitOrder}
          name='Sell'
          content='Sell'
          disabled={_.isEmpty(order.symbol)}
        />
      </Form>
    </Segment>
  );
}

export default OrderForm;
