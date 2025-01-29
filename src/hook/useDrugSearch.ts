import { Drug } from '../services/type';
import { useState, ChangeEvent, useCallback, useRef } from "react";
import { fetchDrugs } from "../services/searchDrugs";

type Props = {
  itemsByPage?: number;
};

export const useDrugSearch = ({
  itemsByPage = 10,
}: Props) => {
  const [query, setQuery] = useState("");
  const [drugsResults, setDrugsResults] = useState<Drug[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const previousSearch = useRef(query)

  const getDrugs = useCallback(async (newPage = 1) => {
    if (query === previousSearch.current) return;

    if (!query) {
      setDrugsResults([]);
      setTotal(0);
      return;
    }

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = query
      const data = await fetchDrugs({ query, page: newPage, itemsByPage });
      const { drugs, total } = data;
      setDrugsResults(drugs);
     setPage(newPage);
      setTotal(total);
    } catch {
      setError("Failed to fetch drugs")
    } finally {
      setLoading(false)
    }
  }, [itemsByPage, query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getDrugs();
  }


  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    previousSearch.current = ''
    getDrugs(newPage);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return {
    query,
    drugsResults,
    page,
    total,
    error,
    loading,
    handleSubmit,
    handlePageChange,
    handleQueryChange,
  };
};
