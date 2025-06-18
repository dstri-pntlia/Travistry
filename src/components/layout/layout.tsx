// components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from './footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;