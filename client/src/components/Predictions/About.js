import Card from "../Card/Card";
const About = ({ model }) => {
  return (
    <Card>
      <div className="flex flex-col justify-center items-center">
        <p className="underline">About</p>
        {model === "LR" ? (
          <p>
            This uses the Linear Regression model to predict the next 30 day
            prices.
          </p>
        ) : model === "SVM" ? (
          <p>
            This uses the Support Vector Machine model to predict the next 30
            day prices.
          </p>
        ) : (
          <p>
            This uses the Long Short-Term Memory (LSTM) model to predict the
            next 30 day prices. This is a type of recurrent neural network
            model, which is a model inspired by the neurons in our brains.
          </p>
        )}
        <p className="underline">Disclaimer</p>
        <p>
          {" "}
          These models will not accurately predict the exact prices. Instead,
          you can use the predicted price trends along with other tools.
        </p>
      </div>
    </Card>
  );
};

export default About;
