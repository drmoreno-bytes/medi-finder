import { Typography, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDrugDetail } from "../hook/useDrugDetail";

export const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { drugDetail, loading, error } = useDrugDetail(id);

  if (!drugDetail || loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
      <button onClick={() => navigate(-1)}>Volver Atrás</button>
    </Container>
  );
};
