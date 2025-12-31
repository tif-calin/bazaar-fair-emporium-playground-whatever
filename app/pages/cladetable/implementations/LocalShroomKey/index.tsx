import React from 'react';
import FromNewickAndCsv from '../../components/CladeTable/components/FromNewickAndCsv';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ActionArea from '../../components/CladeTable/components/ActionArea';
import { styled } from '@linaria/react';
import type { CladeTableData } from '../../components/CladeTable/types';
import { generateMycomorphboxViz, makePredefinedColumn, prettyCoord } from './utils';

const CoordinateActions = styled.form`
  display: flex;
   align-items: center;
   flex-wrap: wrap;
   gap: 1rem;
`;

const LocalShroomKey = () => {
  const [csv, setCsv] = React.useState('');
  const [newick, setNewick] = React.useState('');

  const [latitude, setLatitude] = React.useState(19.4333);
  const [longitude, setLongitude] = React.useState(-99.1333);

  const handleFindMy = React.useCallback(() => {
    if (!('geolocation' in navigator)) return console.warn('Geolocation is not supported');

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLatitude(prettyCoord(latitude));
      setLongitude(prettyCoord(longitude));
    });
  }, []);

  const handleSubmit = React.useCallback(async () => {
    const newData = await generateMycomorphboxViz(latitude, longitude);
    setCsv(newData.csv);
    setNewick(newData.newick);
  }, [latitude, longitude]);

  const predefinedColumns: CladeTableData['columns'] = React.useMemo(() => {
    return (
      [
        'name',
        'capShape',
        'ecologicalType',
        'howEdible',
        'hymeniumType',
        'stipeCharacter',
        'whichGills',
        'sporePrintColor',
      ] as const
    ).map(key => makePredefinedColumn(key));
  }, []);

  const vizId = React.useId();

  return (
    <>
      <p>
        Input some coordinates below and to generate a key for mushrooms that grow nearby in this
        time of year. This data is sourced from iNaturalist observations. The characteristics are
        sourced from Wikipedia.
      </p>
      <CoordinateActions onSubmit={handleSubmit} action={console.log}>
        <Input
          kind="number"
          label="Latitude"
          name="latitude"
          step="any"
          type="number"
          value={latitude}
          onChange={e => setLatitude(Number(e.target.value) || 0)}
        />
        <Input
          kind="number"
          label="Longitude"
          name="longitude"
          step="any"
          type="number"
          value={longitude}
          onChange={e => setLongitude(Number(e.target.value) || 0)}
        />
        <Button kind="secondary" onClick={handleFindMy} type="button">
          Find My Location
        </Button>
        <Button>Submit</Button>
      </CoordinateActions>
      <FromNewickAndCsv
        csv={csv}
        newick={newick}
        predefinedColumns={predefinedColumns}
        vizId={vizId}
      />
      {!!newick && <ActionArea cladeTableId={vizId} />}
    </>
  );
};

export default React.memo(LocalShroomKey);
