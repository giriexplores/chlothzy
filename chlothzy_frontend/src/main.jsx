import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from '@/lib/redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer stacked limit={3} position='bottom-right' />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
