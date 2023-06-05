import React from 'react';
import { roomReservationData } from '../../page/dashboard/admin-dashboard';


interface CardProps {
  title: string;
  count: number;
}

export const Card: React.FC<CardProps> = ({ title, count }) => {
  return(
    <>
    <div className="dashboard-card">
      <div className="cardTitle">
        <span className='title'>{title} : </span>
        <span className='count'>{count}</span> 
      </div>
    </div>
    </>
  )
}