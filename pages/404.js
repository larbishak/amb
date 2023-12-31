import { NotFoundImage } from "@/src/components/notFound";
import { useRouter } from "next/router";
import Head from "next/head";

const Not_found = () => {
  const router = useRouter();
    setTimeout(() => {
      router.push("/");
    }, 2500);
  return (
    <>
      <Head>
        <title>Not Found Page</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <>
    <NotFoundImage />
    </>
    </>
  );
};

export default Not_found;
