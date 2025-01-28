import { Container, Typography, TextField, Pagination } from "@mui/material";
import { ListOfDrugs } from "../components/ListOfDrugs";
import { useDrugSearch } from "../hook/useDrugSearch";

export const SearchPage = () => {
  const {
    query,
    results,
    page,
    total,
    handleSearch,
    handlePageChange,
    handleQueryChange,
  } = useDrugSearch();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Drugs
      </Typography>
      <TextField
        fullWidth
        label="Search for a drug"
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <ListOfDrugs results={results} />
      {total > 10 && (
        <Pagination
          count={Math.ceil(total / 10)}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </Container>
  );
};
