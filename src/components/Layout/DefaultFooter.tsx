import React from "react";
import { Segment, Grid, Icon, SemanticICONS, Button } from "semantic-ui-react";

const DefaultFooter = () => {
  const brandIcons = ["twitter", "github"];

  return (
    <React.Fragment>
      <Segment inverted attached>
        <Grid container padded='vertically' stackable columns='equal'>
          <Grid.Row verticalAlign='middle'>
            <span>developed by kinothUI</span>
          </Grid.Row>
          <Grid.Row>
            {brandIcons.map((name) => (
              <Button
                key={name}
                as='a'
                href={`https://${name}.com/kinothUI`}
                target='_blank'
                icon
                circular
                color='olive'
              >
                <Icon name={name as SemanticICONS} color='black' />
              </Button>
            ))}
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
};

export default DefaultFooter;
