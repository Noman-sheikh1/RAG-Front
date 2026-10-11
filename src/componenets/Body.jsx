import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

const Body = () => {
  const location = useLocation();
  const isChatbotPage = location.pathname === "/chatbot";

  return (
    <div
      className={`relative w-full flex flex-col ${
        isChatbotPage ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 animate-gradient"></div>

      {/* Foreground */}
      <div
        className={`relative z-10 flex w-full flex-col ${
          isChatbotPage ? "h-full min-h-0" : "min-h-screen flex-grow"
        }`}
      >
        <Navbar />

        <main
          className={`relative flex w-full ${
            isChatbotPage
              ? "min-h-0 flex-1 pt-16"
              : "flex-grow items-center justify-center px-3 pb-3 pt-20"
          }`}
        >
          {!isChatbotPage && (
            <div className="absolute inset-0 z-0 mx-auto min-h-[calc(100%-1.5rem)] max-w-6xl rounded-3xl bg-[#f7f3e9] shadow-lg backdrop-blur-sm"></div>
          )}
          <div
            className={`relative z-10 w-full ${
              isChatbotPage ? "h-full min-h-0 max-w-none" : "max-w-6xl"
            }`}
          >
            <Outlet />
          </div>
        </main>

        {!isChatbotPage && <Footer />}
      </div>
    </div>
  );
};

export default Body;
