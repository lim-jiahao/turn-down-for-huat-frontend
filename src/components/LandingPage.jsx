import React, { useState } from 'react';

const LandingPage = () => {
  const [name, setName] = useState('test');

  return (
    <>
      <div>LandingPage</div>
      {name}
    </>
  );
};

export default LandingPage;
