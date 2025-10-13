import CurrentCategoriesFilter from "./CurrentCategoriesFilter";
import FormCards from "./FormCards";

export default function FormSelectionFilter() {
    return (
        <div>
            <h1>Forms</h1>
            <CurrentCategoriesFilter />
            <div className="grid grid-cols-3 gap-2">
                <FormCards />
            </div>
        </div>
    );
}
