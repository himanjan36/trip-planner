import { useEffect, useState } from "react";
import "./App.css";
import DestinationCard from "./components/DestinationCard";
import RecommendationForm from "./components/RecommendationForm";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const [recommendBudget, setRecommendBudget] =
    useState("");

  const [recommendDays, setRecommendDays] =
    useState("");

  const [recommendInterest, setRecommendInterest] =
    useState("");

  const [recommendations, setRecommendations] =
    useState([]);

  const [recommendationLoading, setRecommendationLoading] =
    useState(false);

  useEffect(() => {
    fetch(`${API_URL}/destinations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch destinations"
          );
        }

        return response.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const tags = [
    "beach",
    "nature",
    "adventure",
    "family",
    "food",
  ];

  const countries = [
    ...new Set(
      destinations.map(
        (destination) => destination.country
      )
    ),
  ];

  const filteredDestinations = destinations.filter(
    (destination) => {
      const matchesSearch =
        destination.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesBudget =
        selectedBudget === "" ||
        destination.budget_level === selectedBudget;

      const matchesCountry =
        selectedCountry === "" ||
        destination.country === selectedCountry;

      const destinationTags =
        destination.tags
          ?.replace("{", "")
          .replace("}", "")
          .split(",") || [];

      const matchesTag =
        selectedTag === "" ||
        destinationTags.includes(selectedTag);

      return (
        matchesSearch &&
        matchesBudget &&
        matchesCountry &&
        matchesTag
      );
    }
  );

  const handleRecommend = async () => {
    if (
      !recommendBudget ||
      !recommendDays ||
      !recommendInterest
    ) {
      alert(
        "Please select Budget, Days and Interest."
      );
      return;
    }

    try {
      setRecommendationLoading(true);

      const response = await fetch(
        `${API_URL}/recommendations?interests=${recommendInterest}&budget=${recommendBudget}&days=${recommendDays}`
      );

      const data = await response.json();

      setRecommendations(data);

      setRecommendationLoading(false);
    } catch (error) {
      console.error(error);
      setRecommendationLoading(false);
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading destinations...
      </h2>
    );
  }

  if (error) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "red",
        }}
      >
        {error}
      </h2>
    );
  }

  return (
    <>
      <h1>🌍 Trip Planner</h1>

      <p className="count-text">
        Showing {filteredDestinations.length} destination(s)
      </p>

      <RecommendationForm
        budget={recommendBudget}
        setBudget={setRecommendBudget}
        days={recommendDays}
        setDays={setRecommendDays}
        interest={recommendInterest}
        setInterest={setRecommendInterest}
        onRecommend={handleRecommend}
      />

      {recommendationLoading && (
        <div className="recommendation-results">
          <h2>
            Finding recommendations...
          </h2>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendation-results">
          <h2>
            ✨ Recommended For You
          </h2>

          {recommendations.map((item) => (
            <div
              key={item.destination_id}
              className="recommendation-card"
            >
              <h3>
                🌍 {item.name}
              </h3>

              <p>
                <strong>Country:</strong>{" "}
                {item.country}
              </p>

              <p>
                <strong>Score:</strong>{" "}
                {item.score}
              </p>

              <p>
                {item.description}
              </p>

              <ul>
                {item.reasons.map(
                  (reason, index) => (
                    <li key={index}>
                      {reason}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={selectedBudget}
          onChange={(e) =>
            setSelectedBudget(e.target.value)
          }
        >
          <option value="">
            All Budgets
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

        <select
          value={selectedCountry}
          onChange={(e) =>
            setSelectedCountry(e.target.value)
          }
        >
          <option value="">
            All Countries
          </option>

          {countries.map((country) => (
            <option
              key={country}
              value={country}
            >
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar">
        <div className="tag-filter">
          <button
            className={
              selectedTag === ""
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedTag("")
            }
          >
            All
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              className={
                selectedTag === tag
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedTag(tag)
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredDestinations.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#6b7280",
          }}
        >
          No destinations found
        </h2>
      ) : (
        <div className="cards-container">
          {filteredDestinations.map(
            (destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            )
          )}
        </div>
      )}
    </>
  );
}

export default App;