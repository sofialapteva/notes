import { NavLink } from 'react-router-dom';
import SearchForNotes from './SearchForNotes'
import { useSelector } from 'react-redux'
const Menu = () => {
  const login = useSelector(({ auth }) => auth.login)

  const styles = {
    nav: 'bg-gray-900 fixed h-screen lg:w-56 md:w-48 w-32 text-white flex flex-col py-10',
    link: 'h-8 p-1 text-center m-1 hover:bg-gray-700'
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.link + ' active'}>{login}
      </div>

      <SearchForNotes />

      <NavLink exact to={{ pathname: '/new' }} className={styles.link + ' bg-green-500 rounded-full hover:bg-green-600'}>
        + New note
      </NavLink>
      <NavLink exact to={{ pathname: '/main' }} className={styles.link}>
        Notebooks
      </NavLink>
      {/* 
      <NavLink exact to={{ pathname: '/all' }} className={styles.link}>
        All notes
      </NavLink> */}

      <NavLink exact to={{ pathname: '/tags' }} className={styles.link}>
        All tags
      </NavLink>



    </nav>
  );
}

export default Menu;
