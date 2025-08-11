import { Outlet } from "react-router";
import { Header } from "../sections/header/header";
import { Footer } from "../sections/footer/footer";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
