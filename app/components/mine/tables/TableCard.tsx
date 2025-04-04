// components/tables/TableCard.tsx
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { fetchCubeData } from "../../lib/cubejs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const TableCard = ({ card }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    const queries = JSON.parse(card.query);
    // For tables, queries[0] is the single query
    const fetchData = async () => {
      try {
        const queryBody = { query: queries[0], queryType: "multi" };
        const res = await fetchCubeData(queryBody);
        const dataArr = res?.data?.[0] || [];

        // Build columns from datatableProperties
        const { columnOrder, columnsPinned, columnsVisible } = card.datatableProperties;

        // Figure out all columns from data
        // E.g. each item in dataArr might have keys "blinkit_insights_sku.id", ...
        // We'll filter & order them using columnOrder & columnsVisible
        const colDefs = columnOrder
          .filter((colKey) => columnsVisible[colKey] !== false)
          .map((colKey) => {
            return {
              field: colKey,
              headerName: colKey, // You might want to rename this more user-friendly
              pinned: columnsPinned.includes(colKey) ? "left" : undefined,
            };
          });

        setColumnDefs(colDefs);
        setRowData(dataArr);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [card]);

  return (
    <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default TableCard;
