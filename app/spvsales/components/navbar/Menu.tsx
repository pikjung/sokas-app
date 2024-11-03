
interface MenuProps {
  children: React.ReactNode
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <nav className="hidden gap-12 lg:flex">
      {children}
    </nav>
  );
}

export default Menu;