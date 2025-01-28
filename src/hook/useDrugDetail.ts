import { useState, useEffect } from "react";

interface DrugDetail {
  id: string;
  brandName: string;
  genericName: string;
  productType: string[];
  substanceName: string[];
  route: string;
}

export const useDrugDetail = (drugId?: string) => {
  const [drugDetail, setDrugDetail] = useState<DrugDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrugDetail = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.spl_id:${drugId}`
      );

      if (!response.ok) {
        setError("Failed to fetch drugs");
        throw new Error("Failed to fetch drugs");
      }

      const data = await response.json();
      const drug = data.results[0];
      setLoading(false);
      setDrugDetail({
        id: drug.openfda?.spl_id[0] || "",
        brandName: drug.openfda?.brand_name[0] || "No Brand Name",
        genericName: drug.openfda?.generic_name[0] || "No Generic Name",
        productType: drug.openfda?.product_type[0] || "No Product Type",
        substanceName: drug.openfda?.substance_name[0] || "No Substance Name",
        route: drug.openfda?.route[0] || "No Route",
      });
    };

    if (!drugId) {
      return;
    }

    fetchDrugDetail();
  }, [drugId]);

  return { drugDetail, loading, error };
};
