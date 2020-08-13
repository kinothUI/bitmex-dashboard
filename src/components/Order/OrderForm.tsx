import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "semantic-ui-react";

import { PLACE_ORDER } from "redux/actions/order";
import { action } from "redux/actions";
// import { StoreState } from "types";

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
  symbol: "XBTUSD",
};

function OrderForm() {
  const [order, setOrder] = React.useState(InitialState);
  const dispatch = useDispatch();
  // const state = useSelector((state: StoreState) => state);

  const handleOnChange = (event: React.BaseSyntheticEvent) => {
    setOrder({ ...order, [event.target.name]: event.target.value } as OrderState);
  };

  const handleBuy = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(action(PLACE_ORDER, { order: { ...order, side: "Buy" } }));
  };

  const handleSell = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(action(PLACE_ORDER, { order: { ...order, side: "Sell" } }));
  };

  return (
    <React.Fragment>
      <Form autoComplete='off'>
        {/* <Form.Select
          label='Instrument'
          name='symbol'
          loading={state.instrument.isLoading}
          options={[{ text: "text", value: "value" }]}
          onChange={handleOnChange}
        /> */}
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
        <Button color='green' onClick={handleBuy} content='Buy' />
        <Button color='red' onClick={handleSell} content='Sell' />
      </Form>
    </React.Fragment>
  );
}

export default OrderForm;
