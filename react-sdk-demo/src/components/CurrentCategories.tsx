import type { TCategoriesTree } from "@mercura-aps/frontend-form-sdk";
import { useFormCategories } from "../form-sdk";

export default function CurrentCategories({
    category,
}: {
    category: TCategoriesTree;
}) {
    const setCurrentCategory = useFormCategories(
        (state) =>
            state.strategies.breadcrumbs({ homeText: "Home" })
                .setCurrentCategory
    );
    return category.subcategories?.map((category) => (
        <button
            className="rounded-md bg-blue-500 p-2 text-white"
            key={category.id}
            onClick={() => {
                setCurrentCategory(category);
            }}
        >
            {category.name}
        </button>
    ));
}
