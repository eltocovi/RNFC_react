import { Suspense } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Tournament from './pages/Tournament'
import { Route, Routes } from 'react-router'
import Club from './pages/Club'

function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Cargando...</div>}>
        <Routes>
          <Route path="/tournament" element={ <Tournament /> } />
          <Route path="/club" element={ <Club /> } />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
