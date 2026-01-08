import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { styled } from '@linaria/react';
import useLocalStorage from '~/utils/useLocalStorage';
import { orchestrateInducedTree } from './orchestrateInducedTree';
import { useSearchParams } from 'react-router';

const FormContainer = styled.form`
  display: flex;
   flex-wrap: wrap;
   gap: 0 0.5rem;
  margin: 1rem 0;

  & > .message {
    font-size: 0.75rem;
    width: 100%;
    text-align: right;
  }
`;

const RelatedAndWellKnownSpeciesForm = ({
  setCsv,
  setNewick,
}: {
  setCsv: React.Dispatch<React.SetStateAction<string>>;
  setNewick: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const formId = React.useId();

  const [isLoading, setIsLoading] = React.useState(false);
  // const [actionMessage, setActionMessage] = React.useState('');
  const [oneZoomApiKey] = useLocalStorage('oneZoomApiKey', '');
  const [searchParams, setSearchParams] = useSearchParams();

  const [savedLatinName, setSavedLatinName] = useLocalStorage('savedLatinName', '');
  const [inputtedLatinName, setInputtedLatinName] = React.useState(savedLatinName);
  const urlLatinName = searchParams.get('latinName');

  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputtedLatinName(e.target.value),
    [setInputtedLatinName]
  );

  const handleFormAction = React.useCallback(
    async (formData: FormData) => {
      const latinName = formData.get('latinName');
      if (typeof latinName !== 'string') return;

      setIsLoading(true);
      setSavedLatinName(latinName || '');
      setSearchParams({ ...searchParams, latinName });
      const { newick, csv } = await orchestrateInducedTree(latinName, {
        oneZoomApiKey,
        oneZoomMaxQuery: oneZoomApiKey === '0' ? 100 : 3_270,
      });
      setNewick(newick);
      setCsv(csv);
      setIsLoading(false);
    },
    [oneZoomApiKey, searchParams, setCsv, setNewick, setSavedLatinName, setSearchParams]
  );

  return (
    <FormContainer id={formId} action={handleFormAction}>
      <Input
        defaultValue={urlLatinName || savedLatinName}
        kind="text"
        label="Latin name"
        name="latinName"
        onChange={handleOnChange}
        type="text"
      />
      <Button disabled={isLoading || !inputtedLatinName.length}>Go</Button>
      {/* {actionMessage && <span className="message">{actionMessage}</span>} */}
    </FormContainer>
  );
};

export default React.memo(RelatedAndWellKnownSpeciesForm);
