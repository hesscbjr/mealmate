# MealMate 🍳📸

MealMate is a smart recipe planner built with React Native and Expo. It allows users to take a photo of ingredients and receive recipe suggestions.

## Core User Journey

1.  **Capture Ingredients:** Users take a photo of ingredients using the in-app camera or select an image from their library.
2.  **Get Recipes:** The app analyzes the image and suggests 5 recipes based on the detected ingredients.
3.  **Refresh Suggestions:** If the initial suggestions aren't suitable, users can refresh to get 5 new, unique recipes.
4.  **View Recipe:** Users can select a recipe from the list to view the full details on a dedicated screen.

## Tech Stack

- **Framework:** React Native / Expo SDK 52
- **Routing:** Expo Router v4
- **Styling:** NativeWind v4
- **State Management:** Zustand v5
- **Language:** TypeScript
- **Camera/Image:** Expo Camera, Expo Image Picker
- _(Planned) Backend/Auth:_ Supabase

## Project Structure

- `app/`: Contains all screens and routing logic (using Expo Router file-based routing).
- `assets/`: Static assets like fonts and images.
- `components/`: Reusable UI components following Atomic Design (`atoms/`, `molecules/`, `organisms/`).
- `constants/`: Shared constant values (e.g., colors, API keys).
- `hooks/`: Custom React hooks for reusable logic.
- `services/`: Modules for interacting with external APIs or backend services (e.g., image analysis, recipe fetching).
- `store/`: State management logic using Zustand.
- `utils/`: Utility functions.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
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
    # Add other API keys as needed
    ```
4.  **Run the app:**

    ```bash
    # Start the development server
    npx expo start

    # Run on iOS simulator (requires Xcode)
    npx expo run:ios

    # Run on Android emulator/device (requires Android Studio setup)
    npx expo run:android
    ```

## Development Principles

- **Minimal:** Write only the absolute minimum code needed.
- **Self-Documenting:** Use precise naming, SRP components, and clear data flow. Comment only when necessary.
- **Secure:** Implement robust security, especially for data handling (using Supabase Auth).
- **Performant:** Optimize for mobile performance.
- **Separation of Concerns:** Maintain clear boundaries between UI, logic, and backend access.
- **Planning:** Create plans in `/plans` before implementing features.
- **READMEs:** Ensure every directory has a `README.md`.
- **Atomic Design:** Structure components in `atoms/`, `molecules/`, `organisms/`.

_(This project is being developed for Tenex.)_
