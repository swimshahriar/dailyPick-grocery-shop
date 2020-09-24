import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';

// importing orderList component
import OrderList from './OrderListStyles';

configure({ adapter: new Adapter() });

describe('<OrderList/>', () => {
  let wrapper;
  beforeEach(() => {
    // @ts-ignore
    wrapper = shallow(<OrderList />);
  });

  it('should show no orders yet message, if loadedOrder length === 0', () => {
    wrapper.setProps({ loadedOrders: [], isAdmin: true });
    wrapper.contains(
      <Typography variant="h4" align="center">
        No Orders Yet!
      </Typography>
    );
  });

  it('should show order list, if loadedOrder length !== 0', () => {
    wrapper.setProps({ loadedOrders: [1, 2], isAdmin: true });
    expect(
      wrapper.contains(
        <Grid>
          <Card>
            <CardContent></CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      )
    );
  });
});
