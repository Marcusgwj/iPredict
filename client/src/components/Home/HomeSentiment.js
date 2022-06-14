import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { CheckIcon } from "@heroicons/react/outline";

const HomeSentiment = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      name="sentiment"
      className={` w-full py-32 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-zinc-200"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-2">
        <h2 className="text-5xl font-bold text-center">Sentiment Analysis</h2>
        <p className="text-2xl py-8 text-gray-500 text-center">
          Gain an insight into the latest insider and social media sentiment
        </p>

        <div className="grid sm:grid-cols-1 px-8 lg:grid-cols-2 gap-4 pt-4 ">
          <div className="flex ">
            <div>
              <CheckIcon className="w-7 mr-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Insider sentiment</h3>
              <p className="text-lg pt-2 pb-4">
                Find out what insiders are doing and thinking about their
                company!
              </p>
            </div>
          </div>
          <div className="flex">
            <div>
              <CheckIcon className="w-7 mr-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Social media sentiment</h3>
              <p className="text-lg pt-2 pb-4">
                Find out if people are posting positive or negative things about
                the companies you invest in on social media !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSentiment;
