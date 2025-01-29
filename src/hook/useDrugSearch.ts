import { Drug } from '../services/type';
import { useState, useCallback, useRef } from 'react';
import { fetchDrugs } from '../services/searchDrugs';
import debounce from 'just-debounce-it';

type Props = {
    itemsByPage?: number;
};

type ApiStatus = 'idle' | 'loading' | 'error' | 'success';

export const useDrugSearch = ({ itemsByPage = 10 }: Props) => {
    const [query, setQuery] = useState('');
    const [drugsResults, setDrugsResults] = useState<Drug[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
    });
    const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');
    const previousSearch = useRef({
        query: '',
        page: 1,
    });

    const isQueryInvalid = (query: string) => {
        return query.length < 2 || query.match(/^\d+$/);
    };

    const getDrugs = useCallback(
        async ({
            newPage = 1,
            query,
        }: {
            newPage?: number;
            query?: string;
        }) => {
            if (!query) {
                setDrugsResults([]);
                setPagination({ page: 1, total: 0 });
                return;
            }

            if (isQueryInvalid(query)) {
                return;
            }

            try {
                setApiStatus('loading');
                previousSearch.current = { query, page: newPage };
                const data = await fetchDrugs({
                    query,
                    page: newPage,
                    itemsByPage,
                });
                const { drugs, total } = data;
                setDrugsResults(drugs);
                setPagination({ page: newPage, total });
            } catch {
                setApiStatus('error');
            } finally {
                setApiStatus('success');
            }
        },
        [itemsByPage]
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getDrugs({});
    };

    const debouncedGetDrugs = useCallback(
        (query: string) => {
            debounce(() => {
                getDrugs({ newPage: pagination.page, query });
            }, 700)();
        },
        [getDrugs, pagination.page]
    );
    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value;
        setQuery(newSearch);
        debouncedGetDrugs(newSearch);
    };

    const handlePageChange = (
        _: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        getDrugs({ newPage, query });
    };

    return {
        query,
        drugsResults,
        pagination,
        getDrugs,
        status: apiStatus,
        handleSubmit,
        handleQueryChange,
        handlePageChange,
    };
};
