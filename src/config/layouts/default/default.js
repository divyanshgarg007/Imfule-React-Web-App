import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {Container, Menu} from '@mui/material'
import {useLocation, useHistory} from 'react-router-dom'
import {Header} from '../../../components'
import MyDiv from './default.style'

const menuList = []
const AppLayout = (props) => {
  const location = useLocation()
  const history = useHistory()
  const handleMenuClick = (link) => {
    if (link) {
      history.push(link)
    }
  }
  return (
    <MyDiv>
      <CssBaseline />
      <Header />
      <Container maxWidth={false}>
        <div>
          <div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              {menuList.map((menu) => (
                <Menu.Item key={menu.key}>
                  <div
                    className={
                      location.pathname === menu.key ? 'selectedMenu' : ''
                    }
                    onClick={() => handleMenuClick(menu.link)}
                  >
                    {menu.title}
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          </div>
          <div className="site-layout">
            <div style={{overflow: 'initial'}}>
              <div className="site-layout-background" style={{padding: 24}}>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MyDiv>
  )
}

export default AppLayout
