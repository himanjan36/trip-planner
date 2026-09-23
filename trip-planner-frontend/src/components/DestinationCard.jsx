function DestinationCard({ destination }) {
  const getTagIcon = (tag) => {
    const cleanTag = tag
      .replace("{", "")
      .replace("}", "")
      .trim()
      .toLowerCase();

    const icons = {
      beach: "🏖️",
      nature: "🌿",
      adventure: "⛰️",
      culture: "🏛️",
      food: "🍜",
      shopping: "🛍️",
      history: "📜",
      nightlife: "🌃",
      luxury: "💎",
      honeymoon: "💕",
      family: "👨‍👩‍👧",
      solo: "🎒",
      budget: "💰",
    };

    return icons[cleanTag] || "";
  };

  const tags =
    destination.tags
      ?.replace("{", "")
      .replace("}", "")
      .split(",") || [];

  return (
    <div className="destination-card">
      <div className="card-content">
        <h2>🌍 {destination.name}</h2>

        <p>
          <strong>Country:</strong>{" "}
          {destination.country}
        </p>

        <p
          className={`budget ${destination.budget_level}`}
        >
          {destination.budget_level?.toUpperCase()}
        </p>

        <p>
          <strong>Ideal Days:</strong>{" "}
          {destination.ideal_trip_days}
        </p>

        <p>
          <strong>Region:</strong>{" "}
          {destination.region}
        </p>

        <p>
          <strong>Best Time:</strong>{" "}
          {destination.best_time_to_visit}
        </p>

        {destination.popularity_score && (
          <p>
            <strong>Popularity:</strong> ⭐{" "}
            {destination.popularity_score}
          </p>
        )}

        {destination.safety_score && (
          <p>
            <strong>Safety:</strong> 🛡️{" "}
            {destination.safety_score}
          </p>
        )}

        <p>{destination.description}</p>

        <div className="tags-container">
          {tags.map((tag) => {
            const cleanTag = tag.trim();

            /* Hide luxury tag if luxury is already the budget */
            if (
              cleanTag.toLowerCase() === "luxury" &&
              destination.budget_level === "luxury"
            ) {
              return null;
            }

            return (
              <span
                key={cleanTag}
                className="tag"
              >
                {getTagIcon(cleanTag)} {cleanTag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;