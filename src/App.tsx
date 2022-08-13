import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import "./App.css";
import Line from "./Line";
import data1 from "./txt1";
import data2 from "./txt2";
import data3 from "./txt3";

const append = (str: string, n: number): string => {
  const result = str + "あ";
  if (n === 1) {
    return result;
  }
  return append(result, n - 1);
};

const App = () => {
  const [line1, setLine1] = useState(data1[0]);
  const [line2, setLine2] = useState(data2[0]);
  const [line3, setLine3] = useState(data3[0]);
  const [content, setContent] = useState(append("", 333));
  const [height, setHeight] = useState(6000);
  const updateLine = (
    page: number,
    data: string[],
    line: string,
    setLine: (newLine: string) => void
  ) => {
    if (page < data.length) {
      setLine(line + data[page]);
    } else {
      setLine(append(line, 111));
    }
  };
  const loadMore = (page: number) => {
    setContent(append(content, 111));
    updateLine(page, data1, line1, setLine1);
    updateLine(page, data2, line2, setLine2);
    updateLine(page, data3, line3, setLine3);
    setHeight(height + 2000);
  };
  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>夜毎のアクロバット</h1>
        <InfiniteScroll loadMore={loadMore} hasMore={true} loader={loader}>
          <div
            style={{
              writingMode: "vertical-rl",
              height: `${height}px`,
              textAlign: "left",
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "1vw",
            }}
          >
            <Line content={line1} />
            <Line content={line2} />
            <Line content={line3} />
            <Line content={content} />
            <Line content={content} />
            <Line content={content} />
            <Line content={content} />
            <Line content={content} />
          </div>
        </InfiniteScroll>
      </header>
    </div>
  );
};

export default App;
