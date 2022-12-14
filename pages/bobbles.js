import clientPromise from '../lib/mongodb';
import { useEffect, useState } from 'react';
const { NEXT_PUBLIC_API_URL } = process.env;

const Bobbles = ({ data }) => {
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');
  const [bobbles, setBobbles] = useState([]);

  useEffect(async () => {
    await setBobbles(data);
  }, []);

  const onBobbleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${NEXT_PUBLIC_API_URL}/bobbles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shape, color })
    });

    await fetch(`${NEXT_PUBLIC_API_URL}/bobbles`)
      .then((res) => res.json())
      .then((res) => setBobbles(res));
  };

  return (
    <div>
      <header>
        <h1>Bobbles</h1>
      </header>
      <main>
        <form onSubmit={onBobbleSubmit}>
          <label htmlFor='shape'>
            <input
              type='text'
              id='shape'
              placeholder='shape'
              onChange={(e) => setShape(e.target.value)}
            />
          </label>
          <label htmlFor='color'>
            <input
              type='text'
              id='color'
              placeholder='color'
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <button>Add Bobble</button>
        </form>
        <ul>
          {bobbles &&
            bobbles
              .filter((bobble) => bobble.shape && bobble.color)
              .map((bobble) => (
                <li key={bobble._id}>
                  {bobble.color} {bobble.shape}
                </li>
              ))}
        </ul>
      </main>
    </div>
  );
};

export default Bobbles;

export async function getServerSideProps(context) {
  try {
    // await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const client = await clientPromise;
    const db = client.db('demo-next-03-mongo');
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    const raw = await db.collection('bobbles').find({}).toArray();

    const data = await JSON.parse(JSON.stringify(raw));

    return {
      props: { isConnected: true, data }
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false }
    };
  }
}
