import { Drug, DrugInfoService, DrugsInfo } from "./type";

const mapDrugData = (drug: DrugInfoService): Drug => ({
  id: drug.openfda?.spl_id?.[0] || "",
  brandName: drug.openfda?.brand_name?.[0] || "No Brand Name",
  genericName: drug.openfda?.generic_name?.[0] || "No Generic Name",
  productType: drug.openfda?.product_type?.[0] || "No Product Type",
  substanceName: drug.openfda?.substance_name?.[0] || "No Substance Name",
  route: drug.openfda?.route?.[0] || "No Route",
});

type Props = {
  query: string;
  page: number;
  itemsByPage?: number;
};

export const fetchDrugs = async ({
  query,
  page,
  itemsByPage = 10,
}: Props): Promise<DrugsInfo> => {
  const skip = (page - 1) * itemsByPage;
  const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}&limit=${itemsByPage}&skip=${skip}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        return {
          total: 0,
          drugs: [],
        };
      }
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      total: data.meta.results.total,
      drugs: (data.results || []).map(mapDrugData),
    };
  
  } catch {
    throw new Error("Failed to fetch drugs");
  }
};
