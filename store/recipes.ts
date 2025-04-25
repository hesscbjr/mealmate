import { SpoonacularRecipe } from "@/services/spoonacular"; // Use existing type
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecipeStore {
  starred: SpoonacularRecipe[];
  toggleStar: (recipe: SpoonacularRecipe) => void;
  isStarred: (id: number) => boolean;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      starred: [],
      toggleStar: (recipe) => {
        const currentStarred = get().starred;
        const isCurrentlyStarred = currentStarred.some((r) => r.id === recipe.id);

        let updatedStarred: SpoonacularRecipe[];
        if (isCurrentlyStarred) {
          // Remove the recipe
          updatedStarred = currentStarred.filter((r) => r.id !== recipe.id);
        } else {
          // Add the recipe (ensure no duplicates, though some() check helps)
          // Add to the beginning for most recent stars first, or end as preferred
          updatedStarred = [recipe, ...currentStarred.filter(r => r.id !== recipe.id)];
        }
        set({ starred: updatedStarred });
      },
      isStarred: (id) => {
        return get().starred.some((r) => r.id === id);
      },
    }),
    {
      name: "mealmate:starred-recipes", // Unique AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
    }
  )
); 