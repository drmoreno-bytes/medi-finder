import { Drug } from '../services/type';
import { useState, ChangeEvent } from "react";
import { fetchDrugs } from "../services/searchDrugs";

type Props = {
  itemsByPage?: number;
};

export const useDrugSearch = ({
  itemsByPage = 10,
}: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Drug[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSearch = async (newPage = 1) => {
    if (!query) return;

    const data = await fetchDrugs({ query, page: newPage, itemsByPage });
    if (!data) return;
    const { drugs, total } = data;

    setResults(drugs);
    setPage(newPage);
    setTotal(total);
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
