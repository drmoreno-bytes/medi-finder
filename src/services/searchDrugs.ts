import { Drug } from "./type";

type Props = {
  query: string;
  page: number;
};

export type DrugInfo = {
  id: string;
  brandName: string;
  genericName: string;
  productType: string;
  substanceName: string;
  route: string;
};

export const fetchDrugs = async ({
  query,
  page,
}: Props): Promise<DrugInfo[]> => {
  const limit = 20;
  const skip = (page - 1) * limit;
  const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}&limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
    }

    const data = await response.json();

    return data.results?.map((drug: Drug) => ({
      id: drug.openfda?.spl_id[0] || "",
      brandName: drug.openfda?.brand_name[0] || "No Brand Name",
      genericName: drug.openfda?.generic_name[0] || "No Generic Name",
      productType: drug.openfda?.product_type[0] || "No Product Type",
      substanceName: drug.openfda?.substance_name[0] || "No Substance Name",
      route: drug.openfda?.route[0] || "No Route",
    }));
  } catch {
    throw new Error("Failed to fetch drugs");
  }
};
