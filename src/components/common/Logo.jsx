import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
        <span className="text-2xl font-bold text-primary-content">CJ</span>
      </div>
      <span className="text-xl font-bold text-base-content hidden md:inline">Click Job</span>
    </Link>
  );
};

export default Logo;

