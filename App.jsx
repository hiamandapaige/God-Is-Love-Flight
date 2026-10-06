import { Toaster } from "./toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import Shop from './Shop';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import ShopLayout from './ShopLayout';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ShopLayout />}>
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product/:productId" element={<ProductDetail />} />
            <Route path="/shop/cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
