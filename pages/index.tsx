import type { NextPage } from "next";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Counter title={[1, 2, 3, 4, 5, parseInt("123")]} />
    </div>
  );
};

export default Home;
