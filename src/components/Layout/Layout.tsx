import React from "react";
import { Container, Grid } from "semantic-ui-react";

import DefaultNavbar from "components/Layout/DefaultNavbar";
import DefaultHeader from "components/Layout/DefaultHeader";
import DefaultMain from "components/Layout/DefaultMain";
import DefaultFooter from "components/Layout/DefaultFooter";

const Layout = () => {
  return (
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
  );
};

export default Layout;
