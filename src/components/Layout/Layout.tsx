import React, { useState, createContext } from "react";
import { Container, Grid } from "semantic-ui-react";

import DefaultNavbar from "components/Layout/DefaultNavbar";
import DefaultHeader from "components/Layout/DefaultHeader";
import DefaultMain from "components/Layout/DefaultMain";
import DefaultFooter from "components/Layout/DefaultFooter";

interface PositionStateContext {
  symbol: string;
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
  symbolCC: number;
  setSymbolClickCount: React.Dispatch<React.SetStateAction<number>>;
  positionSize: number;
  setPositionSize: React.Dispatch<React.SetStateAction<number>>;
  positionSizeClickCount: number;
  setPositionSizeClickCount: React.Dispatch<React.SetStateAction<number>>;
}

export const PositionContext = createContext<PositionStateContext>(undefined!);

const Layout = () => {
  const [symbol, setSymbol] = useState("");
  const [symbolCC, setSymbolClickCount] = useState(0);
  const [positionSize, setPositionSize] = useState(0);
  const [positionSizeClickCount, setPositionSizeClickCount] = useState(0);

  return (
    <PositionContext.Provider
      value={{
        symbol,
        setSymbol,
        symbolCC,
        setSymbolClickCount,
        positionSize,
        setPositionSize,
        positionSizeClickCount,
        setPositionSizeClickCount,
      }}
    >
      <div>
        <DefaultNavbar />
        <div className='pre-main-min-height'>
          <Container as='header'>
            <DefaultHeader />
          </Container>
        </div>

        <div className='main-content'>
          <Container as='main' textAlign='center'>
            <Grid columns='1' padded='vertically'>
              <Grid.Column>
                <DefaultMain />
              </Grid.Column>
            </Grid>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </PositionContext.Provider>
  );
};

export default Layout;
