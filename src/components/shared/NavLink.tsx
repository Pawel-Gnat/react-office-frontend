import { NavLink as Link } from "react-router-dom";

export default function NavLink({ text, src }: { text: string; src: string }) {
  return (
    <Link
      to={src}
      className={({ isActive }) => (isActive ? "text-blue-500 font-bold" : "")}>
      {text}
    </Link>
  );
}
