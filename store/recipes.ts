import { SpoonacularRecipe } from "@/services/spoonacular";
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
          updatedStarred = currentStarred.filter((r) => r.id !== recipe.id);
        } else {
          updatedStarred = [recipe, ...currentStarred.filter(r => r.id !== recipe.id)];
        }
        set({ starred: updatedStarred });
      },
      isStarred: (id) => {
        return get().starred.some((r) => r.id === id);
      },
    }),
    {
      name: "mealmate:starred-recipes",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 