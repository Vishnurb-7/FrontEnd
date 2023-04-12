import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {Appl as App} from './App'
import { persistor, store } from './app/store'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
      <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)