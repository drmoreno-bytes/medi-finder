import { Pagination } from '@mui/material';
import { ListOfDrugs } from '../components/ListOfDrugs';
import { useDrugSearch } from '../hook/useDrugSearch';
import { useRef } from 'react';
import MedicationIcon from '@mui/icons-material/Medication';
import './searchPage.css';

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
                <h1 className="title">
                    <MedicationIcon
                        sx={{ fontSize: 40 }}
                        style={{ color: 'blue' }}
                    />{' '}
                    Drug Search
                </h1>
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
                    <button type="submit" className="hide-on-mobile">
                        Search
                    </button>
                </form>
            </header>
            <main>
                {status === 'idle' && (
                    <p className="label">Search for a drug</p>
                )}
                {status === 'loading' && <p className="label">loading...</p>}
                {status === 'success' && (
                    <div className="results">
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
