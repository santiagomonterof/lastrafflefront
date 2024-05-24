import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from './routes/RouterConfig'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import { store } from './store'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ThemeProvider>
            <RouterProvider router={routerConfig} />
          </ThemeProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
