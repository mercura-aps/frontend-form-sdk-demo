import { useFormCategories } from "../form-sdk";
import CategoriesBreadcrumb from "./CategoriesBreadcrumb";
import CurrentCategories from "./CurrentCategories";
import FormCards from "./FormCards";

export default function FormSelectionBreadcrumb() {
    const currentCategory = useFormCategories(
        (state) =>
            state.strategies.breadcrumbs({ homeText: "Home" }).currentCategory
    );
    const shouldShowForms = useFormCategories(
        (state) =>
            state.strategies.breadcrumbs({ homeText: "Home" }).shouldShowForms
    );

    return (
        <div>
            <h1>Forms</h1>
            <CategoriesBreadcrumb />
            <div className="grid grid-cols-3 gap-2">
                {shouldShowForms ? (
                    <FormCards />
                ) : (
                    <CurrentCategories category={currentCategory} />
                )}
            </div>
        </div>
    );
}
