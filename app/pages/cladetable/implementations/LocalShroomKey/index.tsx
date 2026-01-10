import React, { useCallback, useId, useMemo, useState } from 'react';
import FromNewickAndCsv from '../../components/CladeTable/components/FromNewickAndCsv';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ActionArea from '../../components/CladeTable/components/ActionArea';
import { styled } from '@linaria/react';
import type { CladeTableData } from '../../components/CladeTable/types';
import {
  generateMycomorphboxViz,
  getNeabyMonthsForINaturalist,
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

const iNatWebsiteLink = (lat: number, lng: number, radius = 12) => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    months: getNeabyMonthsForINaturalist().join(','),
    radius: radius.toString(),
    taxon_id: '47170',
    view: 'species',
  });

  return `https://www.inaturalist.org/observations?${params}`;
};

const LocalShroomKey = () => {
  const [csv, setCsv] = useState('');
  const [newick, setNewick] = useState('');
  const [tallies, setTallies] =
    useState<Awaited<ReturnType<typeof generateMycomorphboxViz>>['tallies']>();

  const [latitude, setLatitude] = useState(defaultOfTheDay[0]);
  const [longitude, setLongitude] = useState(defaultOfTheDay[1]);

  const handleFindMy = useCallback(() => {
    if (!('geolocation' in navigator)) return console.warn('Geolocation is not supported');

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLatitude(prettyCoord(latitude));
      setLongitude(prettyCoord(longitude));
    });
  }, []);

  const handleSubmit = useCallback(async () => {
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

  const predefinedColumns: CladeTableData['columns'] = useMemo(() => {
    return (['name', ...MORPHOLOGY_CATEGORIES] as const).map(key =>
      makePredefinedColumn(key, tallies)
    );
  }, [tallies]);

  const vizId = useId();

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
      {!!newick && (
        <ActionArea cladeTableId={vizId}>
          {!!newick.length && (
            <a href={iNatWebsiteLink(latitude, longitude)} target="_blank">
              See on iNaturalist &rarr;
            </a>
          )}
        </ActionArea>
      )}
    </>
  );
};

export default React.memo(LocalShroomKey);
