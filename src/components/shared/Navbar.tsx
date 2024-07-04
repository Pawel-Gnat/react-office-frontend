import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <nav className="flex gap-4">
      <NavLink text="Home" src="/" />
      <NavLink text="Clients" src="/clients" />
      <NavLink text="Users" src="/users" />
    </nav>
  );
};

export default Navbar;
