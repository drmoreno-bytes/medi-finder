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
      {results.map((drug) => (
        <DrugListItem
          key={drug.id}
          drug={drug}
          onClick={() => navigate(`/drug/${drug.id}`, { state: { drug } })}
        />
      ))}
    </List>
  );
};
