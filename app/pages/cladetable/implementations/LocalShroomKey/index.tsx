import React from 'react';
import FromNewickAndCsv from '../../components/CladeTable/components/FromNewickAndCsv';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ActionArea from '../../components/CladeTable/components/ActionArea';
import { styled } from '@linaria/react';
import type { CladeTableData } from '../../components/CladeTable/types';
import {
  generateMycomorphboxViz,
  makePredefinedColumn,
  MORPHOLOGY_CATEGORIES,
  prettyCoord,
} from './utils';
import { withInMemoryCache } from '~/utils/cache';

const CoordinateActions = styled.form`
  display: flex;
   align-items: center;
   flex-wrap: wrap;
   gap: 1rem;
  margin: 1rem 0;
`;

const DEFAULT_CITIES = [
  [0.0, 0.0], // Null Island
  [19.4333, -99.1333], // Mexico City
  [41.9658, -74.9061], // Agloe, NY
  [42.0303, -87.9123], // 100 Gecs Tree
  [42.3787, -71.3452], // Gerald
  [53.543, -2.912], // Argleton Village
] as Array<[number, number]>;
const defaultOfTheDay = DEFAULT_CITIES[new Date().getDay() % DEFAULT_CITIES.length];

const LocalShroomKey = () => {
  const [csv, setCsv] = React.useState('');
  const [newick, setNewick] = React.useState('');
  const [tallies, setTallies] =
    React.useState<Awaited<ReturnType<typeof generateMycomorphboxViz>>['tallies']>();

  const [latitude, setLatitude] = React.useState(defaultOfTheDay[0]);
  const [longitude, setLongitude] = React.useState(defaultOfTheDay[1]);

  const handleFindMy = React.useCallback(() => {
    if (!('geolocation' in navigator)) return console.warn('Geolocation is not supported');

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLatitude(prettyCoord(latitude));
      setLongitude(prettyCoord(longitude));
    });
  }, []);

  const handleSubmit = React.useCallback(async () => {
    const { csv, newick, tallies } = await withInMemoryCache(
      generateMycomorphboxViz,
      latitude,
      longitude
    );

    console.log(tallies);
    setCsv(csv);
    setNewick(newick);
    setTallies(tallies);
  }, [latitude, longitude]);

  const predefinedColumns: CladeTableData['columns'] = React.useMemo(() => {
    return (['name', ...MORPHOLOGY_CATEGORIES] as const).map(key =>
      makePredefinedColumn(key, tallies)
    );
  }, [tallies]);

  const vizId = React.useId();

  return (
    <>
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
