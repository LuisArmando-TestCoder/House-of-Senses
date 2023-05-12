import React from 'react';

import * as Components from '../components';

export default {
	title: 'atoms/Alfred',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.atoms.Alfred>
			{title}
		</Components.atoms.Alfred>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Alfred',
};
