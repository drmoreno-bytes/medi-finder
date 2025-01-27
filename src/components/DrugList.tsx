import { useNavigate } from 'react-router-dom';
import { List, ListItem, Typography } from '@mui/material';

type Drug = {
  brandName: string;
  genericName: string;
  productType: string;
  route: string;
  substanceName: string;
}

const NoResults = () => <Typography variant="h6">No results found</Typography>;

type ListOfDrugsProps = {
  results: Drug[];
}



export const ShowList = ({ results }: ListOfDrugsProps) => {
  const navigate = useNavigate();

  return (
    <List>
      {results.map((drug: Drug, index: number) => (
        <ListItem
          component="li"
          key={index}
          onClick={() => navigate(`/drug/${index}`, { state: { drug } })}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px', borderBottom: '1px solid #ccc' }}
        >
          <Typography variant="h6">{drug.brandName}</Typography>
          <Typography variant="body2"><strong>Generic Name:</strong> {drug.genericName}</Typography>
          <Typography variant="body2"><strong>Product Type:</strong> {drug.productType}</Typography>
          <Typography variant="body2"><strong>Route:</strong> {drug.route}</Typography>
          <Typography variant="body2"><strong>Substance Name:</strong> {drug.substanceName}</Typography>
        </ListItem>
      ))}
    </List>
  );
};


type Props = {
    results?: Drug[];
}
  
export const ListOfDrugs = ({ results = [] }:Props ) => {
    const hasDrugs = results.length > 0;
    return (
        hasDrugs
          ? <ShowList results={results} />
          : <NoResults />
      )
}
