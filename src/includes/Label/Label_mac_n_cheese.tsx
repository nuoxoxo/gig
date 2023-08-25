import React from "react";

var MC: React.FC = () => {
  return (
    <div className="label label-mac-n-cheese">
      <header>
        <h1 className="bold">Nutrition Facts</h1>
        <h3 className="bold">(Kraft Mac 'n' Cheese)</h3>
        <div className="divider devider-mac-n-cheese"></div>
        <p>About 3 servings per container</p>
        <p className="bold">
          Serving size{" "}
          <span>
            2.5 oz
            <br />
            (70g/ about 1/3 box)
          </span>
        </p>
        <p className="bold">
          &#8203;<span>(Makes about 1 cup)</span>
        </p>
      </header>
      <div className="divider devider-mac-n-cheese large"></div>
      <div className="calories-info">
        <div className="left-container">
          <h2 className="bold small-text">Amount per 1 cup prepared</h2>
          <p>Calories</p>
        </div>
        <span>350</span>
      </div>
      <div className="divider devider-mac-n-cheese medium"></div>
      <div className="wen-xin-ti-xing">
        <p className="bold">
          百佳免運費: <span>精選貨品買滿$800 - 92折</span>
        </p>
      </div>
      <div className="divider devider-mac-n-cheese medium"></div>
      <div className="daily-value small-text">
        <p className="bold right no-divider">% Daily Value *</p>
        <div className="divider devider-mac-n-cheese"></div>
        <p>
          <span>
            <span className="bold">Total Fat</span> 11g
          </span>
          <span className="bold">15%</span>
        </p>
        <p className="indent no-divider">
          Saturated Fat 4g <span className="bold">19%</span>
        </p>
        <div className="divider devider-mac-n-cheese"></div>
        <p className="indent no-divider">
          <span>
            <i>Trans</i> Fat 0g
          </span>
        </p>
        <div className="divider devider-mac-n-cheese"></div>
        <p>
          <span>
            <span className="bold">Cholesterol</span>
            10mg
          </span>
          <span className="bold">3%</span>
        </p>
        <p>
          <span>
            <span className="bold">Sodium</span> 710mg
          </span>
          <span className="bold">31%</span>
        </p>
        <p>
          <span>
            <span className="bold">Total Carb.</span> 50g
          </span>
          <span className="bold">18%</span>
        </p>
        <p className="indent no-divider">
          <span>Dietary Fiber 2g</span>
          <span>8%</span>
        </p>
        <div className="divider devider-mac-n-cheese"></div>
        <p className="indent no-divider">Total Sugars 10g</p>
        <div className="divider devider-mac-n-cheese double-indent"></div>
        <p className="double-indent no-divider">
          Incl. Added Sugars 0g<span className="bold">0%</span>
          </p>
          <div className="divider devider-mac-n-cheese"></div>
        {/* </p> */}
        <p className="no-divider">
          <span className="bold">Protein</span>
          10g</p>
          <div className="divider devider-mac-n-cheese large"></div>
          <p>
            Vitamin D 0mg <span>0%</span>
          </p>
          <p>
            Calcium 130mg <span>10%</span>
          </p>
          <p>
            Iron 2.5mg <span>15%</span>
          </p>
          <p className="no-divider">
            Potassium 370mg <span>8%</span>
          </p>
        {/* </p> */}
        <div className="divider devider-mac-n-cheese medium"></div>
        <p className="note no-divider">
          * As prepared using margarine with 0g trans fat and 2% reduced fat
          milk.
        </p>
        <p className="note no-divider">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </p>
      </div>
    </div>
  );
};

export default MC;
