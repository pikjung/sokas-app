
import Navbar from "../../components/navbar/Navbar"
import BottomNavigation from "../../components/navbar/BottomNavigation"

interface HomeLayoutProps {
  children: React.ReactNode
}


const HomeLayout: React.FC<HomeLayoutProps> = ({
  children
}) => {
  return (
    <section>
      {children}
    </section>
  );
}

export default HomeLayout;