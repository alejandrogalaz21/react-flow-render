import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ScrollToTop from './../components/ScrollToTop'

export default function Router({ routes }) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        {routes.map((r, i) => (
          <Route key={i} exact {...r} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}
