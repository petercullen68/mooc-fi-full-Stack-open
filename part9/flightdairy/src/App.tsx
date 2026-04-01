import { useState, useEffect } from "react";
import type { DiaryEntry, DiaryEntrySensitive, Visibility, Weather } from "./types";

import diariesEntriesService from "./services/diaryEntries";
import Notification from "./components/Notification";
import DiaryEntries from "./components/DiaryEntries";
import DiaryForm from "./components/DiaryForm";
import axios from "axios";

type NotificationPayload = {
  message: string | null;
  type: "success" | "error";
};

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntrySensitive[]>([]);
  const [diaryDate, setDiaryDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState<NotificationPayload | null>(
    null,
  );

  const handleDiaryDateChange = (value: string) => {
    setDiaryDate(value);
  };

  const handleVisibilityChange = (value: string) => {
    setVisibility(value as Visibility);
  };

  const handleWeatherChange = (value: string) => {
    setWeather(value as Weather);
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const addEntry = async (event: React.SubmitEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const entry: DiaryEntry = {
        id: 1,
        date: diaryDate,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment: comment,
      };
      const newEntry = await diariesEntriesService.create(entry);
      setDiaryEntries(diaryEntries.concat(newEntry));
      setDiaryDate("");
      setVisibility("")
      setWeather("")
      setComment("")
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {          
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          displayNotification(message, "error");
        } else {
          displayNotification(e.message, "error");
        }
      } else {
        displayNotification("An unknown error occurred", "error");
      }
    }
  };

  const displayNotification = (
    message: string,
    type: NotificationPayload["type"],
  ): void => {
    const newNotification: NotificationPayload = {
      message,
      type,
    };
    setNotification(newNotification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    const fetchDiaryEntriesList = async () => {
      const diaryEntries = await diariesEntriesService.getAll();
      setDiaryEntries(diaryEntries);
    };
    void fetchDiaryEntriesList();
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      <DiaryForm
        addEntry={addEntry}
        handleDateChange={handleDiaryDateChange}
        handleVisibilityChange={handleVisibilityChange}
        handleWeatherChange={handleWeatherChange}
        handleCommentChange={handleCommentChange}
        diaryDate={diaryDate}
        visibility={visibility}
        weather={weather}
        comment={comment}
      />
      <DiaryEntries diaryEntries={diaryEntries}></DiaryEntries>
    </div>
  );
};

export default App;
