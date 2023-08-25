import React from "react";

var CM: React.FC = () => {
  return (
    <div className="label label-camel-milk">
      <header>
        <h1 className="bold">Nutrition Facts</h1>
        <h3 className="bold">(Aadvik Camel Milk Powder)</h3>
        <div className="divider devider-camel-milk"></div>
        <p>10 servings per pack</p>
        <p className="bold">
          Serving size <span>20g</span>
        </p>
      </header>
      <div className="divider devider-camel-milk large"></div>
      <div className="calories-info">
        <div className="left-container">
          <h2 className="bold small-text">Amount per serving</h2>
          <p>Calories</p>
        </div>
        <span>105</span>
      </div>
      <div className="divider devider-camel-milk medium"></div>
      <div className="wen-xin-ti-xing">
        <p className="bold">
          溫馨提醒: <span>耳機音量不要超過50%</span>
        </p>
      </div>
      <div className="divider devider-camel-milk medium"></div>
      <div className="daily-value small-text">
        <p className="bold right no-divider">% Daily Value *</p>
        <div className="divider devider-camel-milk"></div>
        <p>
          <span>
            <span className="bold">Total Fat</span> 6.6g
          </span>
          <span className="bold">8.5%</span>
        </p>
        <p className="indent no-divider">
          Saturated Fat 4.9g <span className="bold">24.2%</span>
        </p>
        <div className="divider devider-camel-milk"></div>
        <p className="indent no-divider">
          <span>Trans Fat 0.0g</span>
        </p>
        <div className="divider devider-camel-milk"></div>
        <p>
          <span>
            <span className="bold">Total Carbohydrates</span> 7.2g
          </span>
          <span className="bold">2.6%</span>
        </p>
        <p className="indent no-divider">
          <span>Dietary Fiber 2g</span>
          <span>8%</span>
        </p>
        <div className="divider devider-camel-milk"></div>
        <p className="indent no-divider">Sugars 3.8g</p>
        <p className="indent no-divider">Added Sugars 0.0g</p>
        <p>
          <span>
            <span className="bold">Cholesterol</span> 21mg
          </span>
          <span className="bold">7%</span>
        </p>
        <p>
          <span>
            <span className="bold">Sodium</span> 110mg
          </span>
          <span className="bold">4.8%</span>
        </p>

        <p className="no-divider">
          <span>
            <span className="bold">Protein</span>
            4.2g
          </span>
          <span className="bold">8.4%</span>
        </p>
        <div className="divider devider-camel-milk medium"></div>
        <p className="note no-divider">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </p>
      </div>
    </div>
  );
};

export default CM;
