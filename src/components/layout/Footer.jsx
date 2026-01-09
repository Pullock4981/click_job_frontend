import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-auto">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-[13px] font-bold uppercase tracking-widest text-base-content/40">
                    <p>© 2026 CLICK JOB</p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
