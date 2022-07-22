import Card from "../Card/Card";
const About = ({ model }) => {
  return (
    <Card>
      <div className="flex flex-col justify-center items-center">
        <p className="underline">About</p>
        {model === "LR" ? (
          <p>
            This uses the Linear Regression model to predict the next 30 day
            prices. This is a machine learning algorithm based on supervised
            learning. It assumes the linear relationship between the dependent
            and independent variables. Regression then models a target
            prediction value based on independent variables.
          </p>
        ) : model === "SVR" ? (
          <p>
            This uses the Support Vector Regression (SVR) model to predict the
            next 30 day prices. Support Vector Machine is a supervised learning
            algorithm used for classification of data. SVR uses the same
            principle as SVM, but for regression problems. It acknowledges the
            presence of non-linearity in the data.
          </p>
        ) : (
          <p>
            This uses the Long Short-Term Memory (LSTM) model to predict the
            next 30 day prices. This is a type of recurrent neural network
            inspired by the neurons in our brains. What makes LSTM unique is
            that it is capable of forgetting irrelevant adjustments that were
            made before, and only keeping the relevant and more recent ones.
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
