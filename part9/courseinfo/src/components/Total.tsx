import type { JSX } from "react";

const Total = ({ totalExercises }: { totalExercises: number }): JSX.Element => (
    <p>Number of exercises {totalExercises}</p>
);

export default Total