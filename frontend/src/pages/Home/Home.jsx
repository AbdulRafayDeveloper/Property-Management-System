import React from 'react';
import Carasoul from './components/Carasoul';
import Audience from './components/Audience';
import Offer from './components/Offer';
import Testimonials from './components/Testimonials';
import BrandStatement from './components/BrandStatement';
import CtaImages from './components/CtaImages';

function Home() {
  return (
    <main className='landing__pages'>
      <Carasoul />
      <Audience />
      <Offer />
      <Testimonials />
      {/* <BrandStatement /> */}
      {/* <CtaImages /> */}
    </main>
  );
}

export default Home;
