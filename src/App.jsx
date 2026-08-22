import { useMemo } from "react";
import { Header } from "./components/Header/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import { Order } from "./pages/Order.jsx";
import { Preview } from "./pages/Preview.jsx";

function getRoute() {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  if (path.startsWith("/preview/")) {
    return { name: "preview", id: path.split("/").filter(Boolean)[1] };
  }

  if (path === "/order") {
    return { name: "order", id: params.get("template") };
  }

  return { name: "home" };
}

export default function App() {
  const route = useMemo(getRoute, []);
  const isStudioPage = route.name !== "home";

  return (
    <>
      {isStudioPage ? null : <Header />}
      <main>
        {route.name === "preview" && <Preview templateId={route.id} />}
        {route.name === "order" && <Order templateId={route.id} />}
        {route.name === "home" && <Home />}
      </main>
      {isStudioPage ? null : <Footer />}
    </>
  );
}
