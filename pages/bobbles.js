import { useState } from 'react';

const Bobbles = () => {
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');

  const onBobbleSubmit = async (e) => {
    e.preventDefault();
    console.log('bobble added!!');

    const data = await fetch(
      `https://demo-next-03-mongo.vercel.app/api/bobbles?shape=${shape}&color=${color}`
    );

    // const response = await data.json();
    // console.log(response);
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
      </main>
    </div>
  );
};

export default Bobbles;
