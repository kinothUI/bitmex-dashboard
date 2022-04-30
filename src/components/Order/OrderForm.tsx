import _ from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Segment } from "semantic-ui-react";

import { PLACE_ORDER } from "redux/actions/order";
import { action } from "redux/actions";
import { StoreState } from "types";
import { Dropdown } from "components/elements/form-inputs/Dropdown";
import { PositionContext } from "components/Layout/Layout";

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
  const [order, setOrder] = useState(InitialState);
  const dispatch = useDispatch();
  const instrument = useSelector((state: StoreState) => state.instrument);
  const { symbol, symbolCC, positionSize, positionSizeClickCount } = useContext(PositionContext);
  const selectedSymbolIndex = instrument.content.map((item) => item.symbol).indexOf(symbol);

  const handleOnChange = (event: React.BaseSyntheticEvent, data: any) => {
    if (event.target.value)
      setOrder({ ...order, [event.target.name]: event.target.value } as OrderState);
    else setOrder({ ...order, [data.name]: data.value } as OrderState);
  };

  const handleSubmitOrder = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(
      action(PLACE_ORDER, { order: { ...order, side: event.target.name, symbol: order.symbol } })
    );
  };

  useEffect(() => {
    setOrder((old) => ({ ...old, symbol }));
  }, [selectedSymbolIndex, symbolCC, symbol]);

  useEffect(() => {
    setOrder((old) => ({
      ...old,
      orderQty: positionSize < 0 ? positionSize - positionSize * 2 : positionSize,
    }));
  }, [positionSizeClickCount, positionSize]);

  const options = instrument.content.map((item) => ({ text: item.symbol, value: item.symbol })).sort((a, b) => a.text > b.text ? 0 : (a.text === b.text ? 0 : -1));

  return (
    <Segment raised>
      <Form autoComplete='off'>
        <Dropdown
          label='Instrument'
          name='symbol'
          placeholder='--- Select your Instrument ---'
          loading={instrument.isLoading}
          disabled={instrument.isLoading}
          options={options}
          value={order.symbol}
          onChange={handleOnChange}
          selection
        />
        <Form.Input
          type='number'
          label='Quantity'
          placeholder='Order Quantity'
          name='orderQty'
          onChange={handleOnChange}
          value={order.orderQty}
        />
        <Form.Input
          type='number'
          label='Limit Price'
          placeholder='Order Limit Price'
          name='price'
          onChange={handleOnChange}
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
