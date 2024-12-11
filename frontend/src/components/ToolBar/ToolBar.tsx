import { NavLink } from 'react-router-dom';

const NavBarAdmin = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-primary'>
        <div className='container'>
          <NavLink to='/' className='text-decoration-none'><span
            className='navbar-brand mb-0 text-white fs-1'>Hilton Hotel Guest Book</span></NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBarAdmin;