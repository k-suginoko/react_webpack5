// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../store'
// // reducers
// import { setCountUp } from '../reducers/commonReducer'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import './App.css'
// import '../globals.scss'
// pages
// import Login from 'pages/Login/'
// import Auth from './Auth'

// const selector = (state: RootState) => ({ common: state.common })

const Test: React.FC = () => (<div>testfdsfsd</div>)
const GlobalContainer: React.FC = (props) => (<div>{ props.children }</div>)

const GlobalLeftContainer: React.FC = () => (<div>GlobalLeftContainer</div>)
const GlobalRightContainer: React.FC = (props) => (<div>{ props.children }</div>)

const App: React.FC = () => {
  // const [count, setCount] = useState<number>(0)
  // const dispatch = useDispatch<AppDispatch>()
  // const { common } = useSelector(selector)

  console.log('count')

  // const onClick = () => {
  //   console.log('common', common, import.meta.env.VITE_API, import.meta.env, import.meta)
  //   dispatch(setCountUp(common.count + 1))
  // }

  return (
    <Router>
      <GlobalContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={ Test }  />
            {/* <Route exact path="/404" component={ NotfoundRoute } /> */}
            {/* <Route exact path="/maintenance" component={ MaintenanceRoute } /> */}
          </Switch>
        </Router>
      </GlobalContainer>
    </Router>
  )
}

export default App
