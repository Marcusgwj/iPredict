import ThemeIcon from "../../components/Header/ThemeIcon";
import Navbar from "../../components/Navbar/Navbar";
import Front from "../../components/Home/Front";
import HomePrice from "../../components/Home/HomePrice";
import HomeNews from "../../components/Home/HomeNews";
import HomeSentiment from "../../components/Home/HomeSentiment";
import HomePrediction from "../../components/Home/HomePrediction";

function Home() {
  return (
    <>
      <Navbar />
      <ThemeIcon />
      <Front />
      <HomePrice />
      <HomePrediction />
      <HomeNews />
      <HomeSentiment />
    </>
  );
}

export default Home;
