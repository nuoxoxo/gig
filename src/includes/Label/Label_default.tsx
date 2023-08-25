import React from "react";

var DF: React.FC = () => {
  return (
    <div className="label">
      <header>
        <h1 className="bold">Nutrition Facts</h1>
        <div className="divider"></div>
        <p>8 servings per container</p>
        <p className="bold">
          Serving size <span>2/3 cup (55g)</span>
        </p>
      </header>
      <div className="divider large"></div>
      <div className="calories-info">
        <div className="left-container">
          <h2 className="bold small-text">Amount per serving</h2>
          <p>Calories</p>
        </div>
        <span>230</span>
      </div>
      <div className="divider medium"></div>
      <div className="wen-xin-ti-xing">
        <p className="bold">
          溫馨提醒: <span>耳機音量不要超過50%</span>
        </p>
      </div>
      <div className="divider medium"></div>
      <div className="daily-value small-text">
        <p className="bold right no-divider">% Daily Value *</p>
        <div className="divider"></div>
        <p>
          <span>
            <span className="bold">Total Fat</span> 8g
          </span>
          <span className="bold">10%</span>
        </p>
        <p className="indent no-divider">
          Saturated Fat 1g <span className="bold">5%</span>
        </p>
        <div className="divider"></div>
        <p className="indent no-divider">
          <span>
            <i>Trans</i> Fat 0g
          </span>
        </p>
        <div className="divider"></div>
        <p>
          <span>
            <span className="bold">Cholesterol</span> 0mg
          </span>
          <span className="bold">0%</span>
        </p>
        <p>
          <span>
            <span className="bold">Sodium</span> 160mg
          </span>
          <span className="bold">7%</span>
        </p>
        <p>
          <span>
            <span className="bold">Total Carbohydrate</span> 37g
          </span>
          <span className="bold">13%</span>
        </p>
        <p className="indent no-divider">Dietary Fiber 4g</p>
        <div className="divider"></div>
        <p className="indent no-divider">Total Sugars 12g</p>
        <div className="divider double-indent"></div>
        <p className="double-indent no-divider">
          Includes 10g Added Sugars <span className="bold">20%</span>
          <div className="divider"></div>
          <p className="no-divider">
            <span className="bold">Protein</span> 3g
          </p>
          <div className="divider large"></div>
          <p>
            Vitamin D 2mg <span>10%</span>
          </p>
          <p>
            Calcium 260mg <span>20%</span>
          </p>
          <p>
            Iron 8mg <span>45%</span>
          </p>
          <p className="no-divider">
            Potassium 235mg <span>6%</span>
          </p>
        </p>
        <div className="divider medium"></div>
        <p className="note">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </p>
      </div>
    </div>
  );
};

export default DF;
