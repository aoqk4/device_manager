import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import { User } from "@prisma/client";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = () => {
    fetch("api/adduser");
    console.log("Clicked");
    // client.user.create({ data: { name: "홍길동2", age: 20, addr: "아산시" } }); // error! 클라이언트에서 DB접근 불가능
  };

  useEffect(() => {
    // 사용자 목록 가져와서 state 변수에 저장한다.
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
      <Counter title={[1, 2, 3, 4, 5, parseInt("123")]} />
      <button className="bg-gray-300 p-2 rounded m-2" onClick={addUser}>
        사용자 추가
      </button>

      <div className="flex flex-wrap text-xl font-bold">
        {users.map((user) => {
          {
            return (
              <div key={user.id} className="border-2">
                <span>{user.name}</span> <span>{user.age}</span>
                <div>{user.addr}</div>
                <div>{user.favfood}</div>
                <div className="text-slate-300">{user.createAt.toString()}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
