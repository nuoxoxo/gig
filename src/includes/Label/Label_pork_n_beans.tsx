import React from "react";

const PB: React.FC = () => {
  return (
    <div className="label label-pork-n-beans">
      <header>
        <h1 className="bold">Nutrition Facts</h1>
        <h3 className="bold">(Campbell's Pork and Beans)</h3>
        <div className="divider "></div>
        <p>About 4.5 servings per container</p>
        <p className="bold">
          Serving size <span>1/2 cup (130g)</span>
        </p>
      </header>
      <div className="divider large"></div>
      <div className="calories-info">
        <div className="left-container">
          <h2 className="bold small-text">Amount per serving</h2>
          <p>Calories</p>
        </div>
        <span>130</span>
      </div>
      <div className="divider medium"></div>
      <div className="wen-xin-ti-xing">
        <p className="bold">
          陽光檸檬茶 : <span>乜咁啱嘅？邊度都有陽光</span>
        </p>
      </div>
      <div className="divider medium"></div>
      <div className="daily-value small-text">
        <p className="bold right no-divider">% Daily Value *</p>
        <div className="divider "></div>
        <p>
          <span>
            <span className="bold">Total Fat</span> 0.5g
          </span>
          <span className="bold">1%</span>
        </p>
        <p className="indent no-divider">
          Saturated Fat 0g <span className="bold">0%</span>
        </p>
        <div className="divider "></div>
        <p className="indent no-divider">
          <span>
            <i>Trans</i> Fat 0g
          </span>
        </p>
        <div className="divider "></div>
        <p>
          <span>
            <span className="bold">Cholesterol</span> 0mg
          </span>
          <span className="bold">0%</span>
        </p>
        <p>
          <span>
            <span className="bold">Sodium</span> 480mg
          </span>
          <span className="bold">21%</span>
        </p>
        <p>
          <span>
            <span className="bold">Total Carbohydrates</span> 27g
          </span>
          <span className="bold">10%</span>
        </p>
        <p className="indent no-divider">
          <span>Dietary Fiber 6g</span>
          <span>21%</span>
        </p>
        <div className="divider "></div>
        <p className="indent no-divider">Total Sugars 9g</p>
        <div className="divider double-indent"></div>
        <p className="double-indent no-divider">
          Incl. 7g Added Sugars<span className="bold">14%</span>
          </p>
          <div className="divider "></div>
        {/* </p> */}
        <p className="no-divider">
          <span className="bold">Protein</span>
          5g
        </p>
        <div className="divider large"></div>
        <p>
          Vitamin D 0mg <span>0%</span>
        </p>
        <p>
          Calcium 40mg <span>4%</span>
        </p>
        <p>
          Iron 1.9mg <span>10%</span>
        </p>
        <p className="no-divider">
          Potassium 270mg <span>6%</span>
        </p>
        {/* </p> */}
        <div className="divider medium"></div>
        <p className="note no-divider">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </p>
      </div>
    </div>
  );
};

export default PB;
