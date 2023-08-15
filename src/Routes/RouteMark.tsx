import { useState /*CSSProperties*/ } from "react";
import { GetRandomColor } from "./Helpers";
// import Badge from "react-bootstrap/Badge"
import { marked } from "marked";

var RouteMark = () => {
  const [textColor] = useState(GetRandomColor());
  const [markdown, setMarkdown] = useState("");

  return (
    <>
      <div className="container-row">
        <span style={{ color: textColor }}>Hello</span>
        &nbsp;<span style={{ color: textColor }}>World</span>
      </div>

      <div className="mdp-body">
        <div className="left">
          <textarea
            className="input"
            value={markdown}
            onChange={(e) => {
              setMarkdown(e.target.value);
            }}
            placeholder="👯 Write Your Markdown here 👯"
          ></textarea>
        </div>
        <div className="right">
          <div
            className="output"
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          ></div>
        </div>
      </div>

    </>
  );
}

export default RouteMark;
