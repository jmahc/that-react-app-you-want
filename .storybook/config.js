import React from 'react'
import { withOptions } from '@storybook/addon-options'
import { addDecorator, configure } from '@storybook/react'

import Root from './containers/Root'

addDecorator(
  withOptions({
    name: '`that-react-app-you-want` Storybook',
    url: process.env.STORYBOOK_URL ? process.env.STORYBOOK_URL : '#',
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    sortStoriesByKind: true,
    addonPanelInRight: true,
    hierarchySeparator: null,
    hierarchyRootSeparator: null,
    sidebarAnimations: true,
  }),
)

// Use our app background by default for all stories.
addDecorator(story => <Root story={story} />)

// Load stories from the `src` directory only.
function loadStories() {
  require(`glob-loader!./stories.pattern`)
}

// Run the configuration.
configure(loadStories, module)

// Found here:
// https://github.com/storybooks/storybook/issues/1417#issuecomment-343328104
if (module.hot) {
  module.hot.accept(() => configure(loadStories, module))
}
