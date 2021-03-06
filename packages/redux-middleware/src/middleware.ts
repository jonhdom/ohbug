import { getHub } from '@ohbug/core'
import { getGlobal, error } from '@ohbug/utils'
import type { Middleware, Action, MiddlewareAPI } from 'redux'

const identity = (action: Action, _: MiddlewareAPI) => action

type CreateOhbugMiddlewareOption = (action: Action, store: MiddlewareAPI) => Action | false
const createOhbugMiddleware = (before: CreateOhbugMiddlewareOption = identity): Middleware => (
  store
) => (next) => (action) => {
  const data = before(action, store)

  if (data) {
    const global = getGlobal<Window>()
    error(Boolean(global.__OHBUG__), '`Ohbug.init` is not running yet!')

    const hub = getHub<Window>()

    const timestamp = new Date().toISOString()
    hub.addAction({
      type: 'redux-action',
      timestamp,
      data,
    })
  }

  return next(action)
}

export default createOhbugMiddleware
