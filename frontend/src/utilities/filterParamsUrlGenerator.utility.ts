import { FiltersInterface } from "@/models";

export function filterParamsUrlGenerator(filters: FiltersInterface) {
    const queryParams = new URLSearchParams();
  
    if (filters.category && filters.category.length > 0) {
      queryParams.append('category', filters.category.join('|'));
    }
  
    if (filters.color && filters.color.length > 0) {
      queryParams.append('color', filters.color.join('|'));
    }
  
    if (filters.size && filters.size.length > 0) {
      queryParams.append('size', filters.size.join('|'));
    }
  
    if (filters.priceMin) {
      queryParams.append('priceMin', filters.priceMin);
    }
  
    if (filters.priceMax) {
      queryParams.append('priceMax', filters.priceMax);
    }

    if (filters.q) {
      queryParams.append('q', filters.q);
    }
  
    return queryParams.toString();
}