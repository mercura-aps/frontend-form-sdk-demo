import type { TCategoriesTree } from "@mercura-aps/frontend-form-sdk";
import { useFormCategories } from "../form-sdk";

export default function CurrentCategoriesFilter() {
    const setCurrentCategory = useFormCategories(
        (state) =>
            state.strategies.filter({ allText: "All" }).setCurrentCategory
    );
    const categoriesPath: TCategoriesTree[] = useFormCategories(
        (state) => state.strategies.filter({ allText: "All" }).categoriesPath
    );
    const isSelectedCategory = useFormCategories(
        (state) =>
            state.strategies.filter({ allText: "All" }).isSelectedCategory
    );

    return (
        <div className="flex flex-col gap-2">
            {categoriesPath.map((category) => {
                return (
                    <div key={category.id} className="flex gap-2">
                        {category.subcategories?.map((subcategory) => (
                            <button
                                key={subcategory.id}
                                className={
                                    isSelectedCategory(subcategory)
                                        ? "bg-blue-500 text-white"
                                        : ""
                                }
                                onClick={() => {
                                    setCurrentCategory(subcategory);
                                }}
                            >
                                {subcategory.name}
                            </button>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
