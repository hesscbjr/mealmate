# MealMate 🍳📸

<p align="center">
  <img src="assets/images/home.png" width="200"/> 
  <img src="assets/images/preview.png" width="200"/>
  <img src="assets/images/recipe.png" width="200"/>
</p>

MealMate is a smart recipe planner built with React Native and Expo. It allows users to take a photo of ingredients and receive recipe suggestions.

## Overview

Hi Arman and Alex! Thank you for the opportunity to interview for Tenex. This project was quite fun and I hope you enjoy the result as much as I do.

For the engineering project, I chose the smart recipe planner and built an app called Meal Mate. Meal Mate uses GPT-4o vision to detect ingredients in the photos uploaded by the user and then uses the [Spoonacular API](https://spoonacular.com/food-api) to search for matching recipes.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hesscbjr/mealmate.git
    cd mealmate
    ```
2.  **Install dependencies:**
    ```bash
    npx expo install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add any necessary environment variables (e.g., API keys for Supabase or recipe service).
    ```dotenv
    # .env
    EXPO_PUBLIC_OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
    EXPO_PUBLIC_SPOONACULAR_API_KEY=<YOUR_SPOONACULAR_API_KEY>
    ```
4.  **Run the app:**

    ```bash
    # Start the development server
    npx expo start -c

    # Run on iOS simulator (requires Xcode)
    npx expo run:ios

    # Run on Android emulator/device (requires Android Studio setup)
    npx expo run:android
    ```
