import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
const SocialFilter = ({ text, active, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-8 h-6 md:m-2 md:w-12 md:h-8 border-1 rounded-md flex items-center justify-center cursor-pointer ${
          active
            ? "bg-indigo-600 border-indigo-700 text-gray-100"
            : "border-indigo-300 text-indigo-300"
        } transition duration-200 hover:bg-indigo-600 hover:text-gray-100 hover:border-indigo-700`}
      >
        {text === "reddit" ? <RedditIcon /> : <TwitterIcon />}
      </button>
      <p className="w-12 m-2 h-4 flex items-center justify-center invisible md:visible">
        {text}
      </p>
    </div>
  );
};

export default SocialFilter;
