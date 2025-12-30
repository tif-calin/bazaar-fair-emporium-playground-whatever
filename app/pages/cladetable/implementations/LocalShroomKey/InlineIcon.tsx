import { styled } from '@linaria/react';
import { useCallback, useState, type ReactNode } from 'react';

type Props = {
  altText: string;
  className?: string;
  fallback?: ReactNode;
  path: string;
  title?: string;
};

const Wrapper = styled.picture`
  aspect-ratio: 1 / 1;
  display: inline-block;
  height: 1em;
`;

const InlineIcon = ({ altText, className, fallback, path, title }: Props) => {
  const [shouldFallback, setShouldFallback] = useState(false);

  const handleNoImage = useCallback(() => setShouldFallback(true), []);

  return shouldFallback ? (
    fallback
  ) : (
    <Wrapper className={className} title={title}>
      <img alt={altText} onError={handleNoImage} src={path} />
    </Wrapper>
  );
};

export default InlineIcon;
