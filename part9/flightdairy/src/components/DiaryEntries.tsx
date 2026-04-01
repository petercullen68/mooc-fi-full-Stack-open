import type { JSX } from "react";
import type { DiaryEntrySensitive } from "../types";
import DiaryEntry from "./DiaryEntry";

const DiaryEntries = ({
  diaryEntries,
}: {
  diaryEntries: DiaryEntrySensitive[];
}): JSX.Element => (
  <>
    <h3>Diary Entries</h3>
    <ul>
      {diaryEntries.map((diaryEntry) => (
        <li key={diaryEntry.id}>
          <DiaryEntry diaryEntry={diaryEntry} />
        </li>
      ))}
    </ul>
  </>
);

export default DiaryEntries;
