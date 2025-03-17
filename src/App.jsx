import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import ScrollToTop from './components/ScrollToTop';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/payment/:productId"
          element={
            <Layout>
              <PaymentPage />
            </Layout>
          }
        />
        <Route
          path="/success"
          element={
            <Layout>
              <PaymentSuccessPage />
            </Layout>
          }
        />
        <Route
          path="/cancel"
          element={
            <Layout>
              <PaymentCancelPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App; 