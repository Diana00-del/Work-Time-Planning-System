import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './contexts/Auth.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import SnackbarContextProvider from './contexts/Snacks.tsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <App />
          </LocalizationProvider>
        </AuthProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
