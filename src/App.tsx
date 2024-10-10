
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Articles from './pages/layout'
import ArticlesLists from './composants/articleslists'
import ArticleItem from './composants/articleitem'
import SearchProduit from './pages/searchProduit'
import Payment from './pages/payment'
import CartPage from './composants/cart'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Articles />}>
          <Route index element={<ArticlesLists />}/>
          <Route path="/articles/:id_product" element={<ArticleItem />}/>
          <Route path='/card' element={<CartPage />} />
        </Route>
        <Route path='/search' element={<SearchProduit />}/>
        <Route path='/payment' element={<Payment />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
