import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App'
import { AppProviders } from '../store/AppProviders'

export function renderApp(initialPath = '/') {
  window.history.replaceState(null, '', initialPath)
  const user = userEvent.setup()
  const result = render(
    <AppProviders>
      <App />
    </AppProviders>,
  )
  return { user, ...result }
}
