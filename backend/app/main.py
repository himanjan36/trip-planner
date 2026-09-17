from fastapi import FastAPI
from app.database import supabase

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Trip Planner API Running"
    }


@app.get("/destinations")
def get_destinations():

    response = (
        supabase
        .table("destinations")
        .select("*")
        .execute()
    )

    return response.data


@app.get("/destinations/{destination_id}")
def get_destination(destination_id: str):

    destination = (
        supabase
        .table("destinations")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    attractions = (
        supabase
        .table("attractions")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    activities = (
        supabase
        .table("activities")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    accommodations = (
        supabase
        .table("accommodations")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    transportation = (
        supabase
        .table("transportation")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    weather_profiles = (
        supabase
        .table("weather_profiles")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    travel_requirements = (
        supabase
        .table("travel_requirements")
        .select("*")
        .eq("destination_id", destination_id)
        .execute()
    )

    return {
        "destination": destination.data,
        "attractions": attractions.data,
        "activities": activities.data,
        "accommodations": accommodations.data,
        "transportation": transportation.data,
        "weather_profiles": weather_profiles.data,
        "travel_requirements": travel_requirements.data
    }