import React from 'react';

import * as Components from '../components';

export default {
	title: 'atoms/InteractiveArtCanvas',
	component: Components.strings.GlobalWrapper,
	argTypes: {
		title: { control: 'text' },
	},
};

const Template = ({title}) => (
	<Components.strings.GlobalWrapper title={title}>
		<Components.atoms.InteractiveArtCanvas>
			{title}
		</Components.atoms.InteractiveArtCanvas>
	</Components.strings.GlobalWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
	title: 'InteractiveArtCanvas',
};
