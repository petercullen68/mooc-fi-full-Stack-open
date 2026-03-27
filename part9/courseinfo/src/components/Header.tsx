import type { JSX } from "react";

const Header = ({ courseName }: { courseName: string }): JSX.Element => (
  <h1>Hello, {courseName}</h1>
);

export default Header