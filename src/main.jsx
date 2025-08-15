import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js'
import UserProvider from './utils/UserProvider.jsx'
import './styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react'
import Toast from './components/Toast.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Toast />
                    <UserProvider>
                        <App />
                    </UserProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
