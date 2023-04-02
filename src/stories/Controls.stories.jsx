import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/Controls',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.Controls>
			{title}
		</Components.strings.Controls>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'Controls',
};
