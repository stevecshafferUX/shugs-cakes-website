import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/Toaster';
import Home from './pages/Home';
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
import { isMissingCredentials } from './lib/supabase';

function App() {
  // Show setup instructions if Supabase is not configured
  if (isMissingCredentials) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Configuration Required</h1>
          <p className="text-gray-700 mb-4">
            Supabase credentials are missing. Please create a <code className="bg-gray-100 px-1 rounded">.env</code> file in the project root with:
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto mb-4">
{`VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
VITE_ADMIN_EMAILS=admin@example.com`}
          </pre>
          <p className="text-gray-600 text-sm">
            Get these values from your Supabase project dashboard under Settings → API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
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
          <Route path="gallery/:category" element={<Gallery />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="flavors" element={<Flavors />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order" element={<OrderForm />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
