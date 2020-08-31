import React from "react";
import { Header, Segment, Table, Popup } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { StoreState, DataTableColumn } from "types";
import SinglePositionAdministration from "components/Position/SinglePositionAdministration";
import PositionFull from "entities/PositionFull";

interface OwnProps {
  header: string;
}

type Props = OwnProps;

const Positions = (props: Props) => {
  const { header } = props;
  const positions = useSelector((state: StoreState) => state.position);
  const openPositions = positions.content.filter((position) => position.currentQty !== 0);

  const cols: DataTableColumn[] = [
    { text: "Contract" },
    { text: "Current Size" },
    { text: "Entry Price" },
    { text: "Liquidation Price" },
    { text: "Mark Price" },
    {
      text: (
        <Popup trigger={<div>Unrealised PnL</div>} content={`Calculation based on Mark Price`} />
      ),
    },
    { text: "Realised PnL" },
  ];

  const renderHeaderRow = (cols: DataTableColumn[]) =>
    cols.map((col: DataTableColumn, index: number) => (
      <Table.HeaderCell key={index} className={index === 0 ? "border-left" : ""}>
        {col.text}
      </Table.HeaderCell>
    ));

  return (
    <Segment basic loading={positions.isLoading}>
      <Header as='h1' content={header} textAlign='left' />
      <Table
        unstackable
        singleLine
        compact='very'
        headerRow={renderHeaderRow(cols)}
        tableData={openPositions}
        renderBodyRow={(position: PositionFull, index: number) => (
          <SinglePositionAdministration key={index} position={position} />
        )}
        textAlign='left'
      />
    </Segment>
  );
};

export default Positions;
