// components/Card.tsx
import React from "react";
import { ICard } from "../types"; // Define an interface for the card if you want

import LineChartCard from "./charts/LineChart";
import SemiPieChartCard from "./charts/SemiPieChart";
import TableCard from "./tables/TableCard";

interface CardProps {
  card: ICard; // or just use 'any' if you prefer
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { visualizationType, title, logo, description } = card;

  // Decide which UI to render
  let content;
  switch (visualizationType) {
    case "linechart":
      content = <LineChartCard card={card} />;
      break;
    case "semipiechart":
      content = <SemiPieChartCard card={card} />;
      break;
    case "table":
      content = <TableCard card={card} />;
      break;
    default:
      content = <div>Unsupported visualization: {visualizationType}</div>;
  }

  return (
    <div style={{ border: "1px solid #eee", padding: 16, width: 350 }}>
      {/* Title, logo, etc. as per your Figma design */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        {logo && <img src={logo} alt="logo" style={{ height: 24, marginRight: 8 }} />}
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      {description && <p>{description}</p>}
      {content}
    </div>
  );
};

export default Card;
