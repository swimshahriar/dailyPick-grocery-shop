import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TableContainer, Typography } from '@material-ui/core';

import CartTable from './CartTable';

configure({ adapter: new Adapter() });

describe('<CartTable/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CartTable />);
  });

  it('should show Empty Cart, if cart length is <= 0', () => {
    expect(wrapper.contains(<Typography variant="h6">Empty Cart!</Typography>));
  });

  it('should render TableContainer, if cart is not empty', () => {
    expect(wrapper.contains(<TableContainer></TableContainer>));
  });
});
