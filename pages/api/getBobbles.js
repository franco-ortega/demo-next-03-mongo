import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db('demo-next-03-mongo');

  const raw = await db.collection('bobbles').find({}).toArray();

  const data = await JSON.parse(JSON.stringify(raw));
  console.log('GET BOBBLE method: ', req.method);

  res.json(data);
}
