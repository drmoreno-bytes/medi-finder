import { useState, ChangeEvent } from "react";
import { DrugInfo, fetchDrugs } from "../services/searchDrugs";

export const useDrugSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DrugInfo[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSearch = async (newPage = 1) => {
    if (!query) return;

    const data = await fetchDrugs({ query, page: newPage });
    if (!data) return;

    setResults(data);
    setPage(newPage);
    setTotal(data.length);
  };

  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    handleSearch(newPage);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return {
    query,
    results,
    page,
    total,
    handleSearch,
    handlePageChange,
    handleQueryChange,
  };
};
