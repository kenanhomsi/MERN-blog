import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { store ,persistor} from '../redux/store'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider'
ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate  persistor={persistor}>
      <Provider  store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
      </Provider>
  </PersistGate>
)
