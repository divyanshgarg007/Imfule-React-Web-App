import React from 'react'
import AppLayout from './default'

const Layout = (props) => {
  return (
    <React.Fragment>
      <AppLayout>
        {props.children}
      </AppLayout>
    </React.Fragment>
  )
}

export default Layout
