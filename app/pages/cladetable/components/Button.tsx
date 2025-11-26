import { styled } from '@linaria/react';

const StyledButton = styled.button`
  --clr-bg: #38d9a9;
  --clr-border: var(--clr-line);
  --clr-txt: var(--color-offblack);

  background-color: var(--clr-bg);
  border: 1px solid var(--clr-border);
   border-radius: var(--msr-radius);
  color: var(--clr-txt);
  font-weight: 500;
  padding: 0 0.5rem;

  &:hover:not(:disabled) {
    background-color: var(--clr-bg-hover);
    color: unset;
  }

  &:focus {
    outline: 2px dashed var(--clr-focus);
    border-color: #0000;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

type Props = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  const {
    className,
    children,
    ...buttonAttrs
  } = props;

  return (
    <StyledButton className={className} {...buttonAttrs}>
      {children}
    </StyledButton>
  );
};

Button.Styled = StyledButton;
export default Button;
