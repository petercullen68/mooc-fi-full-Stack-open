import axios from "axios";

import { apiBaseUrl } from "../constants";
import type { DiaryEntry, DiaryEntrySensitive } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntrySensitive[]>(
    `${apiBaseUrl}/diaries`,
  );
  return data;
};

const create = async (object: DiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object,
  );
  return data;
};

export default {
  getAll,
  create,
};
