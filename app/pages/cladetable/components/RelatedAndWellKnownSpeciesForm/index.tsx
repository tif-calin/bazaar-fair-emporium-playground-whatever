import React from "react";
import Input from "../Input";
import Button from "../Button";
import { styled } from "@linaria/react";
import useLocalStorage from "~/utils/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { orchestrateInducedTree } from "./utils/orchestrateInducedTree";

const FormContainer = styled.form`
  display: flex;
  gap: 0.5rem;
`;

/**
 * 1. Fetch WikiData ID.
 * 2. Use that to get OTT ID.
 * 3. Use OTT ID to find other closely related taxa.
 * 4. Get popularity rankings for each of those taxa and only keep the most popular.
 */
const RelatedAndWellKnownSpeciesForm = () => {
  const formId = React.useId();

  const [oneZoomApiKey] = useLocalStorage("oneZoomApiKey", "");

  const [savedLatinName, setSavedLatinName] = useLocalStorage("savedLatinName", "");
  const [inputtedLatinName, setInputtedLatinName] = React.useState(savedLatinName);
  // TODO: get species from url query param

  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputtedLatinName(e.target.value),
    [setInputtedLatinName]
  );

  const handleFormAction = React.useCallback(
    (formData: FormData) => {
      const latinName = formData.get("latinName");
      if (typeof latinName == "string") setSavedLatinName(latinName || "");
    },
    [setSavedLatinName]
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["wikidata", savedLatinName],
    queryFn: () => orchestrateInducedTree(savedLatinName, oneZoomApiKey),
    staleTime: 1_000 * 60, // 1 minute
    enabled: !!inputtedLatinName,
  });

  console.log({ inputtedLatinName, savedLatinName, isLoading, error, data });

  return (
    <FormContainer id={formId} action={handleFormAction}>
      <Input
        defaultValue={savedLatinName}
        kind="text"
        label="Latin name"
        name="latinName"
        onChange={handleOnChange}
        type="text"
      />
      <Button disabled={isLoading || !inputtedLatinName.length}>Go</Button>
    </FormContainer>
  );
};

export default React.memo(RelatedAndWellKnownSpeciesForm);
