import { Typography, Container, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDrugDetail } from "../hook/useDrugDetail";

export const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { drugDetail, loading, error } = useDrugDetail(id);

  if (!drugDetail || loading) {
    return <p className="text-blue-500 font-semibold">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 font-bold">
        An error occurred while loading the drug details.
      </p>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {drugDetail.brandName || "No Brand Name"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {drugDetail.genericName || "No Description Available"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {drugDetail.productType || "No Product Type"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {drugDetail.substanceName || "No Substance Name"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {drugDetail.route || "No Route"}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Container>
  );
};
