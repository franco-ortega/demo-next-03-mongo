import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db('demo-next-03-mongo');

  const data = await db.collection('bobbles').find({}).toArray();

  res.json(data);
}
