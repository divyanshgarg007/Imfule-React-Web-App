import React, {useEffect} from 'react'
import './App.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {withRouter} from 'react-router-dom'
import {ActionCreators} from '../../redux/actions'
import Routes from './Routes'
const App = (props) => {
  useEffect(() => {
    props.actions.getSettingList()
  }, [])
  return (
    <div className="App">
      <Routes />
    </div>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(App)
