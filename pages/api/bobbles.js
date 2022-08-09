import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db('demo-next-03-mongo');

  if (req.method === 'GET') {
    const raw = await db.collection('bobbles').find({}).toArray();

    const data = await JSON.parse(JSON.stringify(raw));

    res.json(data);
  }

  if (req.method === 'POST') {
    const response = await db.collection('bobbles').insertOne(req.body);

    res.json(response);
  }
}
