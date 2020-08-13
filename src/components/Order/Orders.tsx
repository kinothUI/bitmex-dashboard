import React from "react";
import { useSelector } from "react-redux";
import { Segment, Header, Table } from "semantic-ui-react";

import { StoreState, DataTableColumn } from "types";
import SingleOrderAdministration from "components/Order/SingleOrderAdministration";
import OrderFull from "entities/OrderFull";

function Orders() {
  const orders = useSelector((state: StoreState) => state.order);

  const cols: DataTableColumn[] = [
    { text: "Symbol" },
    { text: "Quantity" },
    { text: "Order Price" },
    { text: "Filled" },
    { text: "Remaining" },
    { text: "Type" },
    { text: "Status" },
    { text: "Time" },
    { text: "Action" },
  ];

  return (
    <Segment basic loading={orders.isLoading}>
      <Header as='h1' content='Orders' textAlign='left' />
      <Table
        unstackable
        singleLine
        compact='very'
        headerRow={renderHeaderRow(cols)}
        tableData={orders.content}
        renderBodyRow={(order: OrderFull, index: number) => (
          <SingleOrderAdministration key={index} order={order} />
        )}
      ></Table>
    </Segment>
  );
}

const renderHeaderRow = (cols: DataTableColumn[]) =>
  cols.map((col: DataTableColumn, index: number) => (
    <Table.HeaderCell key={index} className={index === 0 ? "border-left" : ""}>
      {col.text}
    </Table.HeaderCell>
  ));

export default Orders;
