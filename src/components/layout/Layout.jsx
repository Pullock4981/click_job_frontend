import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Layout = ({ children, showFooter = true }) => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      {isAuthenticated ? (
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content Area */}
          <div className="flex-1 lg:ml-64 transition-all duration-300 min-h-screen flex flex-col">
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="flex-1 p-2 xs:p-3 md:p-8 overflow-x-hidden">
              {children}
            </main>
            {showFooter && <Footer />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          {showFooter && <Footer />}
        </div>
      )}
    </div>
  );
};

export default Layout;
