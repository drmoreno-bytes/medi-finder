import { Typography, Container } from "@mui/material";

type Props = {
    drug?: {openfda: {
      brand_name: string;
    };
    description: string;} 
};

export const DrugDetailPage = ({ drug }:Props) => {

  if (!drug) return <Typography variant="h6">Drug details not available</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{drug.openfda?.brand_name || 'No Brand Name'}</Typography>
      <Typography variant="body1" gutterBottom>{drug.description || 'No Description Available'}</Typography>
    </Container>
  );
};
