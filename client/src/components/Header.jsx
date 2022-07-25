import Navbar from "./Navbar";

function Header() {
  return (
    <div className="border-customLightOrange flex h-3/5 w-full flex-col items-center border-b-2">
      <Navbar />
      <div className="flex  h-full w-full max-w-4xl flex-col items-center justify-center">
        <h1 className="bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text pb-4 text-5xl font-bold text-transparent">
          [SeaCord]
        </h1>
        <p className="text-2xl">
          An end-to-end encrypted communication web app.
        </p>
      </div>
    </div>
  );
}

export default Header;
