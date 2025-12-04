import Papa from 'papaparse';

export const parseCsv = (csv: string) => {
  return Papa.parse<string[]>(csv).data;
};

export const unparseCsv = (json: string[][]) => {
  return Papa.unparse(json);
};
