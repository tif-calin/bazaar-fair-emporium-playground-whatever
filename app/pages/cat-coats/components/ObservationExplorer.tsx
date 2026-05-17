import React from 'react';
// import { getAllObservations } from '../utils/inaturalist';

// const cats = await getAllObservations();

/**
 * https://api.inaturalist.org/v2/observations?project_id=cat-coat-genes-project&fields=
 */
const ObservationExplorer = () => {
  return (
    <section>
      <h2>Observation Explorer</h2>
      <div></div>
      {/* <p>{cats.total} total cats have been annotated.</p> */}
    </section>
  );
};

export default React.memo(ObservationExplorer);
