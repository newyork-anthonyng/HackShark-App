import prisma from "../../lib/prisma";
import Signup from "./Signup";

export const revalidate = 60;

async function getData() {
  const topics = await prisma.topic.findMany();

  return topics;
}

export default async function Home() {
  const topics = await getData();
  
  return <Signup topics={topics}/>;
}

