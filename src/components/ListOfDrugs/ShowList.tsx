import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";
import { Drug } from "./type";
import { DrugListItem } from "./DrugListItem";

type ShowListProps = {
  results: Drug[];
};

export const ShowList = ({ results }: ShowListProps) => {
  const navigate = useNavigate();

  return (
    <List>
      {results.map((drug, index) => (
        <DrugListItem
          key={`${drug.id}-${index}`}
          drug={drug}
          onClick={() => navigate(`/drug/${drug.id}`, { state: { drug } })}
        />
      ))}
    </List>
  );
};
