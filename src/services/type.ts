export interface Root {
  meta: Meta
  results: Drug[]
}

export interface Meta {
  disclaimer: string
  terms: string
  license: string
  last_updated: string
  results: Results
}

export interface Results {
  skip: number
  limit: number
  total: number
}

export interface Drug {
  effective_time: string
  inactive_ingredient: string[]
  purpose: string[]
  keep_out_of_reach_of_children: string[]
  warnings: string[]
  questions: string[]
  spl_product_data_elements: string[]
  openfda: Openfda
  version: string
  dosage_and_administration: string[]
  pregnancy_or_breast_feeding: string[]
  stop_use: string[]
  storage_and_handling: string[]
  do_not_use: string[]
  package_label_principal_display_panel: string[]
  indications_and_usage: string[]
  set_id: string
  id: string
  active_ingredient: string[]
}

export interface Openfda {
  brand_name: string[]
  generic_name: string[]
  manufacturer_name: string[]
  product_ndc: string[]
  product_type: string[]
  route: string[]
  substance_name: string[]
  spl_id: string[]
  spl_set_id: string[]
  package_ndc: string[]
  is_original_packager: boolean[]
  upc: string[]
  unii: string[]
}
