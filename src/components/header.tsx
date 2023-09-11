import { useLocation } from 'react-router-dom';
import Dropdown from '../components/dropdown'

const Header: React.FC = () => {
  const location = useLocation();
  const title = location.pathname.length > 1 ? (location.pathname.slice(1)[0].toUpperCase() + location.pathname.slice(2)) : 'Home';
  
  return (
    <header className='text-4xl font-bold mb-8 bg-gray-800 text-white py-8'>
      <span className='pl-10'>{ title }</span>
      <Dropdown />
    </header>
  );
};

export default Header;
