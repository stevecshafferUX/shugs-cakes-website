import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/Toaster';
import Home from './pages/Home';
import GalleryIndex from './pages/GalleryIndex';
import Gallery from './pages/Gallery';
import Pricing from './pages/Pricing';
import Flavors from './pages/Flavors';
import Contact from './pages/Contact';
import OrderForm from './components/OrderForm';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrderDetail from './pages/AdminOrderDetail';
import FontPreview from './pages/FontPreview';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster />
      <Routes>
        {/* Admin Routes (no header/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/order/:orderId" element={<AdminOrderDetail />} />

        {/* Public Routes with Layout */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col bg-muted/20">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        }>
          <Route index element={<Home />} />
          <Route path="gallery" element={<GalleryIndex />} />
          <Route path="gallery/:category" element={<Gallery />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="flavors" element={<Flavors />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order" element={<OrderForm />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="account" element={<Account />} />
          <Route path="font-preview" element={<FontPreview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
