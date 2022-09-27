# create-next-app

22.09.26  
next.js typescript 프로젝트 생성

```
> npx create-next-app <폴더명> --typescript
```

# tailwind CSS 적용

1. tailwindCSS설치  
   -[tailwind CSS 설치 링크](https://tailwindcss.com/docs/installation/framework-guides)

2. 프로젝트 생성 이후
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. 이후 이하 링크의 3. 부터 적용(next.js 프레임 워크 기준)  
   -[tailwind in next.js](https://tailwindcss.com/docs/guides/nextjs)

# Prisma

## DB ORM 이다.

## 설치 방법.

1. VSCODE `prisma` 확장 프로그램 설치. (확장프로그램 설정은 알림창에서 확인가능(prettier와 겹친다.))

2. `prisma` 패키지 설치

```
> npm i prisma -D
> npx prisma init
```

3. `prisma` 폴더와 함께 .env 파일 생성됨 (`.gitignore`에 `.env` 추가하여 커밋 무시하자..)

```
# .env for prisma
.env
```

4. `.env` 파일에 `DATABASE_URL`변수에 DB의 주소를 넣도록 한다.

```
DATABASE_URL="DB_URL"
```

5. `prisma` 폴더에 있는 `schema.prisma`파일 `provider`변수에 사용할 DB 종류를 넣는다.

- 사용 가능한 DB = `postgresql`, `mysql`, `sqlite`, `sqlserver`, `mongodb` or `cockroachdb`

```
datasource db {
   provider = "mongodb"
   url      = env("DATABASE_URL")
}
```

6. model에 스키마를 설계한다. model `collectionName`

```
model User {
   id       String   @id @default(auto()) @map("_id") @db.ObjectId      // id 지정형식은 고정이다.
   name     String
   age      Int
   addr     String
   favfood  String?  @default("없음")
   createAt DateTime @default(now())      // 현재시각
   updateAt DateTime @updatedAt           // 업데이트 시각
}
```

7. 데이터베이스 서버에 업로드 시킬 때는 아래 명령어 사용한다.(cmd 명령어)

```
>npx prisma db push
```

- prisma에서 제공하는 Web Client 실행 방법. (실행 중에만 접속이 가능하다.)

```
>npx prisma studio
```

- `prisma` Client 설정 방법.

```
> npx prisma generate
```

### petch 활용 방식

```
fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => console.log(json));
```

### typescript를 한줄 우회하는 방법(급하지 않다면 사용하지 말 것.)

```
// @ts-ignore
```

### prisma CRUD

[prisma CRUD Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

1. `prisma` Client Create Example

```
// DB to Create
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "홍길순", age: 25, addr: "아산시" },
    });
    res.status(200).json({ name: "OKOK" });
  } catch (err) {
    res.status(200).json({ name: "NGNGNG" });
    console.log(err);
  }
}
```

2. `prisma` Client Read Example

```
interface resDataType {
  name: String;
  users: User[];
}

// DB to Read All
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resDataType>
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "OKOK", users });
  } catch (err) {
    console.log(err);
  }
}
```

3. `prisma` Client Delete Example

```
// DB to Delete in new [id].ts file
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.id);

    const deleteUser = await client.user.delete({
      where: {
        id: req.query.id?.toString(),
      },
    });

    console.log(deleteUser);

    res.status(200).json({ ok: true, deletedId: deleteUser.id });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
    console.log(err);
  }
}
```

4. `prisma` Client Update Example

```
// DB to Update in new [id].ts file
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, err: "지원하지 않는 메서드 입니다." });
  }
  try {
    console.log(req.body.name);

    const obj = JSON.parse(req.body);

    if (!obj.name) {
      return res.status(200).json({ ok: false, err: "이름을 입력하세요.." });
    }

    const updateUser = await client.user.update({
      where: {
        id: req.query.id?.toString(),
      },
      data: {
        name: obj.name,
      },
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
    console.log(err);
  }
}
```
