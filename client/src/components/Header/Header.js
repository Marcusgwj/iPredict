import Search from "../Search/Search";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name }) => {
  return (
    <>
      <div className="xl:px-32 flex flex-col items-start md:items-center md: justify-center">
        <h1 className="text-3xl md:text-5xl">{name}</h1>
        <Search />
      </div>
      <ThemeIcon />
    </>
  );
};

export default Header;
