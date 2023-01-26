import { NavLink } from "react-router-dom";

type Link = {
  label: string;
  path: string;
};

type NavbarProps = {
  links: Link[];
};

export default function Navbar({ links }: NavbarProps) {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
