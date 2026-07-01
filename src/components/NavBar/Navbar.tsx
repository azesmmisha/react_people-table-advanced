import { NavLink } from 'react-router-dom';

const navClass = ({ isActive }: { isActive: boolean }) =>
  ['navbar-item', isActive && 'has-background-grey-lighter']
    .filter(Boolean)
    .join(' ');

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={navClass} to="/">
            Home
          </NavLink>
          <NavLink className={navClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
