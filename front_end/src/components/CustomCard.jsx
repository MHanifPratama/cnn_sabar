'use client';
import { Card } from 'flowbite-react';

const CustomCard = ({subject, total}) => {

  return (
    <Card style={{ width: 250 }} className="flex">
        <center>
        <h2 className='mb-3 text-l font-bold tracking-tight text-gray-900 dark:text-white'>
            {subject}
        </h2>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {total}
      </h5>
      </center>
    </Card>
  );
}

export default CustomCard
