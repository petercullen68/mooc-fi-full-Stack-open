interface Props {
  addEntry: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleDateChange: (value: string) => void;
  handleVisibilityChange: (value: string) => void;
  handleWeatherChange: (value: string) => void;
  handleCommentChange: (value: string) => void;
  diaryDate: string;
  visibility: string;
  weather: string;
  comment: string;
}

const PersonForm = ({
  addEntry,
  handleDateChange,
  handleVisibilityChange,
  handleWeatherChange,
  handleCommentChange,
  diaryDate,
  visibility,
  weather,
  comment,
}: Props) => {
  return (
    <form onSubmit={addEntry}>
      <h3>Add new entry</h3>
      <div>
        date:
        <input
          type="date"
          value={diaryDate}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      <div>
        <fieldset>
          <legend>visibility:</legend>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            checked={visibility === "great"}
            onChange={(e) => handleVisibilityChange(e.target.value)}
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            checked={visibility === "good"}
            onChange={(e) => handleVisibilityChange(e.target.value)}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            checked={visibility === "ok"}
            onChange={(e) => handleVisibilityChange(e.target.value)}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            checked={visibility === "poor"}
            onChange={(e) => handleVisibilityChange(e.target.value)}
          />
          <label htmlFor="poor">poor</label>
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>weather:</legend>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            checked={weather === "sunny"}
            onChange={(e) => handleWeatherChange(e.target.value)}
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            checked={weather === "rainy"}
            onChange={(e) => handleWeatherChange(e.target.value)}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={(e) => handleWeatherChange(e.target.value)}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            checked={weather === "stormy"}
            onChange={(e) => handleWeatherChange(e.target.value)}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            checked={weather === "windy"}
            onChange={(e) => handleWeatherChange(e.target.value)}
          />
          <label htmlFor="windy">windy</label>
        </fieldset>
      </div>
      <div>
        comments:
        <input
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
