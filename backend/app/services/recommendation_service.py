from app.database import supabase


def get_recommendations(interests, budget, days):

    response = (
        supabase
        .table("destinations")
        .select("*")
        .execute()
    )

    destinations = response.data

    recommendations = []

    for destination in destinations:

        score = 0

        reasons = []

        destination_tags = destination.get("tags", [])

        # Match user interests
        for interest in interests:

            if interest.lower() in destination_tags:

                score += 20

                reasons.append(
                    f"Matches {interest} interest"
                )

        # Match budget
        if destination.get("budget_level") == budget:

            score += 30

            reasons.append(
                f"Matches {budget} budget"
            )

        # Match trip duration
        ideal_days = destination.get(
            "ideal_trip_days",
            5
        )

        duration_score = max(
            0,
            20 - abs(days - ideal_days) * 2
        )

        score += duration_score

        if duration_score >= 15:

            reasons.append(
                f"Suitable for {days}-day trips"
            )

        recommendations.append({
            "destination_id": destination["destination_id"],
            "name": destination["name"],
            "country": destination["country"],
            "description": destination["description"],
            "score": score,
            "reasons": reasons
        })

    recommendations.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return recommendations[:10]