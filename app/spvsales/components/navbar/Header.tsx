
interface HeaderProps {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex items-center justify-between py-4 md:py-4">
      {children}
    </header>
  );
}

export default Header;