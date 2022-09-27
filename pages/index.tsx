import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { env } from "process";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const addUser = () => {
    fetch("api/adduser")
      .then((res) => res.json())
      .then((json) => setUsers([...users, json.user]));

    // router.reload(); // 페이지를 새로고침한다.
    // client.user.create({ data: { name: "홍길동2", age: 20, addr: "아산시" } }); // error! 클라이언트에서 DB접근 불가능
  };

  useEffect(() => {
    // 사용자 목록 가져와서 state 변수에 저장한다.
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  const 사용자삭제 = (targetId: string) => {
    console.log(targetId);
    fetch(`http://localhost:3000/api/user/delete/${targetId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.deletedId);
        setUsers(users.filter((user) => user.id !== json.deletedId));
      });
  };

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
              <div key={user.id} className="border-2 bg-red-200">
                <span>{user.name}</span> <span>{user.age}</span>
                <div>{user.addr}</div>
                <div>{user.favfood}</div>
                <div className="text-slate-300">{user.createAt.toString()}</div>
                <div>{user.id}</div>
                <div>
                  <button
                    className="bg-gray-500 text-red-600 px-1 rounded hover:bg-gray-700"
                    onClick={() => {
                      사용자삭제(user.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* <button
        
        
      >
        삭제
      </button> */}
    </div>
  );
};

export default Home;
