import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <nav className="border-b md:border-b-0 md:border-r p-2">
      <ul className="flex md:flex-col gap-1">
        <NavLinks />
      </ul>
    </nav>
  );
}
