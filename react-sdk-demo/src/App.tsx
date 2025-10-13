import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/HeaderComponent";
import CheckoutComponent from "./pages/CheckoutComponent";
import ConfigComponent from "./pages/ConfigComponent";
import CreateConfigs from "./pages/CreateConfigs";
import DraftComponent from "./pages/DraftComponent";
import RequestCopy from "./pages/RequestCopy";

export const Demo = () => {
    return (
        <main className="relative min-h-screen px-4 pb-4">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<CreateConfigs />} />
                    <Route
                        path="/config/:configId"
                        element={<ConfigComponent />}
                    />
                    <Route path="/checkout" element={<CheckoutComponent />} />
                    <Route
                        path="/draft/:draftId"
                        element={<DraftComponent />}
                    />
                    <Route
                        path="/request-copy/:requestCopyId"
                        element={<RequestCopy />}
                    />
                </Routes>
            </BrowserRouter>
        </main>
    );
};
