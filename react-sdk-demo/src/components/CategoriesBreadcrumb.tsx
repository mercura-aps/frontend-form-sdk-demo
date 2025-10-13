import { useFormCategories } from "../form-sdk";

export default function CategoriesBreadcrumb() {
    const categoriesPath = useFormCategories(
        (state) =>
            state.strategies.breadcrumbs({ homeText: "Home" }).categoriesPath
    );
    const setCurrentCategory = useFormCategories(
        (state) =>
            state.strategies.breadcrumbs({ homeText: "Home" })
                .setCurrentCategory
    );
    const currentCategory = useFormCategories(
        (state) =>
            state.strategies.breadcrumbs({ homeText: "Home" }).currentCategory
    );

    return (
        <div className="flex gap-2 pb-4">
            {categoriesPath.map((category) => (
                <button
                    key={category.id + "-" + category.level}
                    className={`rounded-md p-2 ${
                        currentCategory?.id === category.id
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                    onClick={() => setCurrentCategory(category)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
