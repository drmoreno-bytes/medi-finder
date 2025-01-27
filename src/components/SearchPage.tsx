import { Container, Typography, TextField,  Pagination } from "@mui/material";
import { useState } from "react";
import { DrugInfo, fetchDrugs } from "../services/searchDrugs";
import { ListOfDrugs } from "./DrugList";

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DrugInfo[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);


  const handleSearch = async (newPage = 1) => {
    if (query) {
      const data = await fetchDrugs({query: query, page: newPage});
      if (!data) {
        return;
      }
      setResults(data);
      setPage(newPage);
      setTotal(data.length);
    }
  };

  const handlePageChange = (value: number) => {
    handleSearch(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Search Drugs</Typography>
      <TextField
        fullWidth
        label="Search for a drug"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <ListOfDrugs results={results} />
      {total > 10 && (
        <Pagination
          count={Math.ceil(total / 10)}
          page={page}
          onChange={(_, newPage) => handlePageChange(newPage)}
        />
      )}
    </Container>
  );
};