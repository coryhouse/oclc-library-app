import { NavLink } from "react-router-dom";

type Link = {
  /** Link label */
  label: string;
  path: string;
};

type NavbarProps = {
  /** Array of links rendered using the react-router Link component
   *
   * Why use this?
   * - It's nice.
   * - It's here.
   *
   * More info [here](https://www.google.com)
   *
   */
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
