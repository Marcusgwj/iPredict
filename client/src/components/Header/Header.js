import Search from "../Search/Search";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name }) => {
  return (
    <>
      <div className="xl:px-32 flex flex-col items-center justify-center">
        <h1 className="text-5xl">{name}</h1>
        <Search />
      </div>
      <ThemeIcon />
    </>
  );
};

export default Header;
