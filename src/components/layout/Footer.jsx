import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Best Microjob & Freelance Site to Make Money Online
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="link link-hover">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="link link-hover">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="link link-hover">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="link link-hover">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/refund" className="link link-hover">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="link link-hover">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="link link-hover">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="link link-hover">
                  Live Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        <div className="text-center text-sm">
          <p>© 2025 Click Job. All rights reserved.</p>
          <p className="mt-2 text-base-content/70">
            71-75 Shelton Street, Covent Garden, London, United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

