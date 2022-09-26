import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title={"에러"}>
      <h1 className="w-full h-full flex flex-col justify-center items-center">
        <h2 className="text-2xl text-red-500 dark:text-red-800">
          페이지를 찾을 수 없습니다
        </h2>
        <span className="mt-2">
          경로를 확인 해주세요{" "}
          <span className="underline font-bold">{router.asPath}</span>
        </span>
      </h1>
    </Layout>
  );
};

export default Home;
