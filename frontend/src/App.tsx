import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import MocksPage from './pages/MocksPage'
import ScenariosPage from './pages/ScenariosPage'

const { Header, Content } = Layout

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ color: 'white', fontSize: '20px' }}>
          Stub Manager
        </Header>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<MocksPage />} />
            <Route path="/mocks" element={<MocksPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
