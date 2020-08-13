import React from "react";
import { useSelector } from "react-redux";
import { Dimmer, Loader, Label } from "semantic-ui-react";

import { StoreState } from "types";

export default function FetchingLoader() {
  const state = useSelector((state: StoreState) => state);

  console.log("%c margin isLoading", "color: yellow;", state.margin.isLoading);

  return (
    <Dimmer.Inner active={state.margin.isLoading}>
      <Loader size='large'>
        <Label circular basic color='grey'>
          Loading...
        </Label>
      </Loader>
    </Dimmer.Inner>
  );
}
