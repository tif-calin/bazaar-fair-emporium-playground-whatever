import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { styled } from '@linaria/react';
import useLocalStorage from '~/utils/useLocalStorage';
import { orchestrateInducedTree } from './utils/orchestrateInducedTree';

const FormContainer = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const RelatedAndWellKnownSpeciesForm = ({
  setNewickTree,
}: {
  setNewickTree: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const formId = React.useId();

  const [isLoading, setIsLoading] = React.useState(false);
  const [oneZoomApiKey] = useLocalStorage('oneZoomApiKey', '');

  const [savedLatinName, setSavedLatinName] = useLocalStorage('savedLatinName', '');
  const [inputtedLatinName, setInputtedLatinName] = React.useState(savedLatinName);
  // TODO: get species from url query param

  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputtedLatinName(e.target.value),
    [setInputtedLatinName]
  );

  const handleFormAction = React.useCallback(
    async (formData: FormData) => {
      console.count('handleFormAction');
      const latinName = formData.get('latinName');
      if (typeof latinName !== 'string') return;

      setIsLoading(true);
      setSavedLatinName(latinName || '');
      const { newick } = await orchestrateInducedTree(savedLatinName, {
        oneZoomApiKey,
        oneZoomMaxQuery: oneZoomApiKey === '0' ? 100 : 3270,
      });
      setNewickTree(newick);
      setIsLoading(false);
    },
    [oneZoomApiKey, savedLatinName, setNewickTree, setSavedLatinName]
  );

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
