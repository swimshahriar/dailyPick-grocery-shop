import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DialogComp, { SimpleDialog } from './DialogComp';
import BackdropLoader from '../BackdropLoader/BackdropLoader';

configure({ adapter: new Adapter() });

describe('<DialogComp/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <DialogComp
        open={true}
        setOpen={false}
        product={{
          _id: 1,
          title: 'product',
        }}
      />
    );
  });

  it('should render <SimpleDialog/> component', () => {
    expect(wrapper.find(SimpleDialog)).toHaveLength(1);
  });

  it('should not render <BackdropLoader /> component', () => {
    expect(wrapper.find(BackdropLoader)).toHaveLength(0);
  });
});
