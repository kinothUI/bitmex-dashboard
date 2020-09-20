import React from "react";

import { Form } from "semantic-ui-react";

export const Dropdown = (props: any) => {
  const { ...rest } = props;

  const handleOnChange = (event: React.SyntheticEvent, data: any) => props.onChange(event, data);

  return <Form.Select {...rest} onChange={handleOnChange} />;
};
