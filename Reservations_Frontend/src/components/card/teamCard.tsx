
interface CardProps {
  teamName: string;
  count: number;
}

export const TeamCard:React.FC<CardProps>= ({teamName, count}) => {
  return(
    <>
      <div className="teamCard">
        <div className="teamCardTitle">
          <h1>{teamName} : {count}</h1>
        </div>
      </div>
    </>
  )
}