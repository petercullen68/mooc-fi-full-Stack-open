import type { JSX } from "react";
import type { DiaryEntrySensitive } from "../types";

const DiaryEntry = ({
  diaryEntry,
}: {
  diaryEntry: DiaryEntrySensitive;
}): JSX.Element => (
  <article>
    <h3>{diaryEntry.date}</h3>
    <p>visibility: {diaryEntry.visibility}</p>
    <p>weather: {diaryEntry.weather}</p>
  </article>
);

export default DiaryEntry;
