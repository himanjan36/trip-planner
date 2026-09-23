from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import supabase
from app.services.recommendation_service import get_recommendations

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
@app.get("/recommendations")
def recommendations(
    interests: str,
    budget: str,
    days: int
):

    interest_list = interests.split(",")

    return get_recommendations(
        interest_list,
        budget,
        days
    )