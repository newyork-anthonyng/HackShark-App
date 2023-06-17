import prisma from "../../lib/prisma";
import Signup from "./Signup";

async function getData() {
  const topics = await prisma.topic.findMany();

  return topics;
}

export default async function Home() {
  const topics = await getData();
  
  return <Signup topics={topics}/>;
}

