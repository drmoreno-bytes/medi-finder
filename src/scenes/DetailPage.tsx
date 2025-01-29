import { Typography, Container, Button, Box, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDrugDetail } from "../hook/useDrugDetail";
import './detail.css';

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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Drug Detail
        </Typography>
        <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom className="brand-name">
            <strong>Brand Name:</strong> <span>{drugDetail.brandName || "No Brand Name"}</span>
          </Typography>
          <Typography variant="body1" gutterBottom className="brand-name">
          <strong>Generic Name:</strong> {drugDetail.genericName || "No Description Available"}
          </Typography>
          <Typography variant="body1" gutterBottom className="brand-name">
          <strong>Product Type:</strong> {drugDetail.productType || "No Product Type"}
          </Typography>
          <Typography variant="body1" gutterBottom className="brand-name">
          <strong> Substance Name:</strong> {drugDetail.substanceName || "No Substance Name"}
          </Typography>
          <Typography variant="body1" gutterBottom className="brand-name">
          <strong>Route</strong>: {drugDetail.route || "No Route"}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Paper>
    </Container>
  );
};
