import { styled } from '@linaria/react';
import Button from '../../Button';
import React from 'react';
import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';

const Wrapper = styled.div`
  display: flex;
   align-items: center;
   flex-wrap: wrap;
   gap: 1rem;

  & > :last-child {
    margin-left: auto;
  }
`;

const ActionArea = ({
  cladeTableId,
  children,
}: {
  cladeTableId: string;
  children?: React.ReactNode;
}) => {
  const handleClickDownload = React.useCallback(() => {
    const node = document.getElementById(cladeTableId);
    console.log(node);
    if (!node) return;
    htmlToImage.toPng(node).then(async dataUrl => download(dataUrl, 'clade-table.png'));
  }, [cladeTableId]);

  return (
    <Wrapper>
      {children}
      <Button kind="secondary" onClick={handleClickDownload}>
        Download
      </Button>
    </Wrapper>
  );
};

export default React.memo(ActionArea);
