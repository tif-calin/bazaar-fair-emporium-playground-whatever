import { styled } from '@linaria/react';

const StyledButton = styled.button`
  --clr-btn-bg: #38d9a9;
  --clr-border: var(--clr-line);
  --clr-btn-txt: var(--color-offblack);

  &.secondary {
    --clr-btn-bg: var(--clr-btn-bg);
    --clr-btn-txt: var(--clr-txt);

    &:hover:not(:disabled) {
      background-color: var(--clr-btn-txt);
      color: var(--clr-bg);
    }
  }

  background-color: var(--clr-btn-bg);
  border: 1px solid var(--clr-border);
   border-radius: var(--msr-radius);
  color: var(--clr-btn-txt);
  font-weight: 500;
  height: calc(var(--msr-input-height) - 2px);
  padding: 0 0.5rem;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: unset;
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
  kind?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  const { className, children, kind = 'primary', ...buttonAttrs } = props;

  return (
    <StyledButton className={`${kind} ${className}`} {...buttonAttrs}>
      {children}
    </StyledButton>
  );
};

Button.Styled = StyledButton;
export default Button;
