const Bobbles = () => {
  const onBobbleSubmit = async () => {
    console.log('bobble added!!');

    const data = await fetch(
      'http://localhost:3000/api/bobbles?shape=round&color=red'
    );

    const response = await data.json();
    console.log(response);
  };

  return (
    <div>
      <h1>Bobbles</h1>
      <button onClick={onBobbleSubmit}>Add Bobble</button>
    </div>
  );
};

export default Bobbles;
