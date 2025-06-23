import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { Routes, Route } from 'react-router';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Collection from '@/pages/Collections';
import NotFound from '@/pages/NotFound';
import Me from '@/pages/Me';
import ProductPage from '@/pages/ProductPage';
import Cart from '@/pages/Cart';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/me" element={<Me />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
