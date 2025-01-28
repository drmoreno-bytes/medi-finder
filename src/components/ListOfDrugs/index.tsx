import { Typography } from "@mui/material";
import { ShowList } from "./ShowList";
import { Drug } from "./type";

type ListOfDrugsProps = {
  results?: Drug[];
};

const NoResults = () => <Typography variant="h6">No results found</Typography>;

export const ListOfDrugs = ({ results = [] }: ListOfDrugsProps) => {
  return results.length > 0 ? <ShowList results={results} /> : <NoResults />;
};