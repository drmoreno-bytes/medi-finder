import { ListItem, Typography } from "@mui/material";
import { Drug } from "./type";

type Props = {
  drug: Drug;
  onClick: () => void;
};

export const DrugListItem = ({ drug, onClick }: Props) => (
  <ListItem
    component="li"
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '10px',
      borderBottom: '1px solid #ccc',
    }}
  >
    <Typography variant="h6">{drug.brandName}</Typography>
    <Typography variant="body2">
      <strong>Generic Name:</strong> {drug.genericName}
    </Typography>
    <Typography variant="body2">
      <strong>Product Type:</strong> {drug.productType}
    </Typography>
    <Typography variant="body2">
      <strong>Route:</strong> {drug.route}
    </Typography>
    <Typography variant="body2">
      <strong>Substance Name:</strong> {drug.substanceName}
    </Typography>
  </ListItem>
);