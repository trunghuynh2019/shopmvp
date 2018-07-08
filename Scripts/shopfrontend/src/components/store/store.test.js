import React from 'react';
import { expect } from 'chai';
import { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

import Store from "./store"

describe('<Store mock test render nav />', () => {
    
    beforeEach(() => {
        fetch.resetMocks()
    });

    it('renders one `.nav`s', () => {
        const wrapper = render(<Store />);
        expect(wrapper.find('.nav').length).to.equal(1);
    });

    it('renders one `table`s', () => {
        fetch.mockResponseOnce(JSON.stringify({ id: 25, name: "Shop25" }))
        const wrapper = render(<Store />, { disableLifecycleMethods: true });
        expect(wrapper.find('table').length).to.equal(1);
    });

});