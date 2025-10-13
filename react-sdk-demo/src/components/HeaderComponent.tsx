import { Link } from "react-router";
import { useAppearance, useAuth, useLocalization, useReset } from "../form-sdk";
import CurrentConfigPriceDisplay from "./CurrentConfigPriceDisplay";
import SaveOrUpdateDraft from "./SaveOrUpdateDraft";

export default function Header() {
    const availableLanguages = useLocalization(
        (state) => state.availableLanguagesData.data
    );
    const setSelectedLanguage = useLocalization(
        (state) => state.setSelectedLanguage
    );
    const selectedLanguage = useLocalization((state) => state.selectedLanguage);

    const availableCountries = useLocalization(
        (state) => state.availableCountriesData.data
    );
    const setSelectedCountry = useLocalization(
        (state) => state.setSelectedCountry
    );
    const selectedCountry = useLocalization((state) => state.selectedCountry);
    const reset = useReset((state) => state.reset);
    const isAuth = useAuth((state) => state.isAuth);
    const user = useAuth((state) => state.user);
    const companyInformation = useAppearance((state) =>
        state.getAppearance("companyInformation")
    );

    return (
        <header className="sticky top-0 left-0 z-10 flex items-center justify-between bg-white py-4">
            <Link to="/" className="text-2xl font-bold">
                React Form SDK
                <img
                    className="max-w-32"
                    src={companyInformation.data?.companyInformationLogo}
                    alt="Logo"
                />
            </Link>
            <div className="flex items-center gap-2">
                <SaveOrUpdateDraft />
                <CurrentConfigPriceDisplay />
                <div>{isAuth ? user?.name : "Not logged in"}</div>
                <button onClick={reset}>Reset</button>
                <select
                    value={selectedLanguage?.slug}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    {availableLanguages?.map((language) => (
                        <option key={language.id} value={language.slug}>
                            {language.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedCountry?.slug}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    {availableCountries?.map((country) => (
                        <option key={country.id} value={country.slug}>
                            {country.name} {country.currency?.code}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}
