import bnpParibasLogo from "../assets/BNP-Paribas.jpg";

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-emerald-600 bg-white px-4 py-3 text-gray-800 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-2">
            <img
              src={bnpParibasLogo}
              alt="BNP Paribas"
              className="h-10 w-32 rounded bg-white object-cover"
            />
            <span className="text-xs font-medium text-gray-900 sm:text-sm">
              The bank for a changing world
            </span>
          </div>
          <span className="text-xs text-gray-600">
            Ultron — built by BNPians, for BNPians. ❤️
          </span>
          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} Noman Vaseem
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
