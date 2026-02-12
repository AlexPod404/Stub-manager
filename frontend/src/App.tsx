import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MocksPage from './pages/MocksPage';
import RoutesPage from './pages/RoutesPage';
import ScenariosPage from './pages/ScenariosPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MocksPage />} />
          <Route path="/mocks" element={<MocksPage />} />
          <Route path="/mocks/:id/routes" element={<RoutesPage />} />
          <Route path="/scenarios" element={<ScenariosPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
