import type { JSX } from "react";
import type { CoursePart } from "../types";
import { assertNever } from "../utils";

type Props = {
  coursePart: CoursePart;
};

const Part = ({ coursePart }: Props): JSX.Element => {
  const renderDetails = () => {
    switch (coursePart.kind) {
      case "basic":
        return (
          <p>
            <em>{coursePart.description}</em>
          </p>
        );

      case "group":
        return <p>project exercises {coursePart.groupProjectCount}</p>;

      case "background":
        return (
          <>
            <p>
              <em>{coursePart.description}</em>
            </p>
            <p>
              submit to{" "}
              <a href={coursePart.backgroundMaterial}>
                {coursePart.backgroundMaterial}
              </a>
            </p>
          </>
        );

      case "special":
        return (
          <>
            <p>
              <em>{coursePart.description}</em>
            </p>
            <p>required skills: {coursePart.requirements.join(", ")}</p>
          </>
        );

      default:
        return assertNever(coursePart);
    }
  };

  return (
    <section>
      <h3>
        {coursePart.name} {coursePart.exerciseCount}
      </h3>
      {renderDetails()}
    </section>
  );
};

export default Part;
