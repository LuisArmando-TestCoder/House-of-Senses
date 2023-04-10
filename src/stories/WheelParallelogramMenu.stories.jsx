import React from 'react';

import * as Components from '../components';

export default {
	title: 'strings/WheelParallelogramMenu',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.strings.WheelParallelogramMenu>
			{title}
		</Components.strings.WheelParallelogramMenu>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'WheelParallelogramMenu',
};
