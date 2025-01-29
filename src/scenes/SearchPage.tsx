import { Pagination } from '@mui/material';
import { ListOfDrugs } from '../components/ListOfDrugs';
import { useDrugSearch } from '../hook/useDrugSearch';
import { useRef } from 'react';

export const SearchPage = () => {
    const firstSearch = useRef(false);
    const itemsByPage = 5;
    const {
        query,
        drugsResults,
        pagination: { page, total },
        status,
        handleSubmit,
        handleQueryChange,
        handlePageChange,
    } = useDrugSearch({ itemsByPage });

    return (
        <div className="page">
            <header>
                <form
                    className="form"
                    onSubmit={(event) => {
                        firstSearch.current = true;
                        handleSubmit(event);
                    }}
                >
                    <input
                        type="search"
                        onChange={handleQueryChange}
                        value={query}
                        name="query"
                        placeholder="Search for a drug"
                    />
                    <button type="submit">Search</button>
                </form>
            </header>
            <main>
                {status === 'idle' && <p>Search for a drug</p>}
                {status === 'loading' && <p>loading...</p>}
                {status === 'success' && (
                    <div className="$flex $flex-col">
                        <ListOfDrugs results={drugsResults} />
                        {total > itemsByPage && (
                            <Pagination
                                count={Math.ceil(total / itemsByPage)}
                                page={page}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
