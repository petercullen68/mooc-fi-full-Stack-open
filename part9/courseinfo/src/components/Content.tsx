import type { JSX } from "react";
import type { CoursePart } from "../types";
import Part from "./Part";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => (
  <ul>
    {courseParts.map((course) => (
      <li key={course.name}>
        <Part coursePart={course} />
      </li>
    ))}
  </ul>
);

export default Content;
