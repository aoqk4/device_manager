import { useState } from "react";

interface CounterProps {
  title: String | Number | Number[];
}

const Counter = (props: CounterProps) => {
  const { title } = props;
  const [cnt, setCnt] = useState(0);
  return (
    <div className="bg-slate-300">
      <h2>{title.toString()}</h2>
      <h2>카운터 {cnt}</h2>
      <button
        onClick={() => {
          setCnt(cnt + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCnt(cnt - 1);
        }}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
