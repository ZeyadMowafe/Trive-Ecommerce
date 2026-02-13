import TopHeader from './TopHeader';
import BottomHeader from './BottomHeader';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <TopHeader />
      <BottomHeader />
    </header>
  );
};

export default Header;