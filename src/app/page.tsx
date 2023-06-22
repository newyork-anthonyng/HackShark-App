import Signup from "./Signup";

export const revalidate = 60;

const TOPICS = {
  Data: [
    { id: 1, name: 'Science' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Statistics' },
  ]
}

const BASE_URL = `http://localhost:8000`;
function getTopics() {
  return fetch(`${BASE_URL}/topics`).then((res) => res.json());
  // return TOPICS.Data;
}

async function getData() {
  const topics = await getTopics();
  return topics;
}

export default async function Home() {
  const topics = await getData();
  
  return <Signup topics={topics}/>;
}

