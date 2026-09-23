function RecommendationForm({
  budget,
  setBudget,
  days,
  setDays,
  interest,
  setInterest,
  onRecommend,
}) {
  return (
    <div className="recommendation-form">
      <h2>✨ Get Travel Recommendations</h2>

      <div className="recommendation-fields">
        <select
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        >
          <option value="">
            Select Budget
          </option>
          <option value="budget">
            Budget
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="luxury">
            Luxury
          </option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Trip Days"
          value={days}
          onChange={(e) =>
            setDays(e.target.value)
          }
        />

        <select
          value={interest}
          onChange={(e) =>
            setInterest(e.target.value)
          }
        >
          <option value="">
            Select Interest
          </option>

          <option value="beach">
            Beach
          </option>

          <option value="nature">
            Nature
          </option>

          <option value="adventure">
            Adventure
          </option>

          <option value="family">
            Family
          </option>

          <option value="food">
            Food
          </option>
        </select>

        <button onClick={onRecommend}>
          Get Recommendations
        </button>
      </div>
    </div>
  );
}

export default RecommendationForm;