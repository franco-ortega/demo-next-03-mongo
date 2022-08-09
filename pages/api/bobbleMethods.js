import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db('demo-next-03-mongo');

  console.log('BOBBLE method: ', req.method);

  if (req.method === 'GET') {
    console.log('GET');
    const raw = await db.collection('bobbles').find({}).toArray();

    const data = await JSON.parse(JSON.stringify(raw));

    res.json(data);
  }

  if (req.method === 'POST') {
    console.log('POST');

    const response = await db.collection('bobbles').insertOne(req.body);

    res.json(response);
  }
}
