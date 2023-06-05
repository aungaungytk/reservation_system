import React from "react";

import { RoomData, UserReservationData } from "./RoomReservation";

interface DataTableProps {
  rooms: RoomData[];
  reservationData: UserReservationData[];
}

const ReservationsDataTable: React.FC<DataTableProps> = ({
  rooms,
  reservationData,
}) => {
  const generateTableData = () => {
    const tableData: JSX.Element[] = [];

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i].id;
      const room_name = rooms[i].name;
      const data = reservationData.filter((data) => data.room_id === room);
      const cells = [];

      for (let j = 9; j <= 16; j++) {
        const cell = data.find(
          (data) => data.start_time <= j && data.end_time > j
        );

        const isCellInRange = cell && cell.start_time <= j && cell.end_time > j;

        if (isCellInRange) {
          const span = cell.end_time - cell.start_time;

          cells.push(
            <td key={j} colSpan={span} className="tooltip">
              <span>{cell.user.team.name}</span>
              <div className="tooltiptext">
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <span>Reserve By :</span>
                    {cell.user.name}
                  </li>
                  <li>
                    <span>Team :</span>
                    {cell.user.team.name}
                  </li>
                  <li>
                    <span>Title :</span> {cell.title}
                  </li>
                  <li>
                    <span>Agenda :</span>
                    {cell.description}
                  </li>
                </ul>
              </div>
            </td>
          );

          for (let k = 1; k < span; k++) {
            // Skip cells that are part of the current reservation span
            cells.push(<td key={`${j + k}`} style={{ display: "none" }} />);
          }

          j += span - 1;
        } else {
          cells.push(<td key={j}/>);
        }
      }

      tableData.push(
        <tr key={room}>
          <td className="room">{room_name}</td>
          {cells}
        </tr>
      );
    }

    return tableData;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>9 AM - 10 AM</th>
            <th>10 AM - 11 AM</th>
            <th>11 AM - 12 PM</th>
            <th>12 PM - 1 PM</th>
            <th>1 PM - 2 PM</th>
            <th>2 PM - 3 PM</th>
            <th>3 PM - 4 PM</th>
            <th>4 PM - 5 PM</th>
          </tr>
        </thead>
        <tbody>{generateTableData()}</tbody>
      </table>
    </div>
  );
};

export default ReservationsDataTable;
