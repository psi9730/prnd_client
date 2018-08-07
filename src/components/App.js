import React ,{PropTypes} from 'react';
import { injectGlobal, ThemeProvider } from 'styled-components'
import routes from '../routes';
import theme from './themes/default'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

injectGlobal`
  body {
    margin: 0;
  }
`

const App = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
        {routes}
    </ThemeProvider>
  )
}

App.propTypes = {
  children: PropTypes.any,
}

export default App
