import { styled } from '@linaria/react';
import { memo, useId, type InputHTMLAttributes } from 'react';

type HtmlInputAttributes<
  InputType extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  RequiredFields extends keyof InputType,
> = InputHTMLAttributes<InputType> & Pick<Required<InputType>, RequiredFields>;

const InputStyled = styled.div<{ gridSpan: number }>`
  --clr-bg: #fff;
  --clr-border: var(--clr-line);
  --clr-label: #99a;
  --clr-text: var(--color-offblack);
  --clr-success: #3a5;
  --clr-error: #c44;

  background-color: var(--clr-bg);
  border: 1px solid var(--clr-border);
   border-radius: var(--msr-radius);
  color: var(--clr-text);
  display: flex;
   flex-grow: 1;
  grid-column: span ${props => props.gridSpan};
  padding: 0;
  position: relative;

  &:focus-within {
    border-color: #0000;
    outline: 2px dashed var(--clr-focus);

    & > .label {
      outline: 1px solid var(--clr-focus);
    }
  }

  & > .label {
    border-radius: var(--msr-radius);
    pointer-events: none;
    position: absolute;
     top: 0.3rem;
     left: 0.5rem;
    transition: all 0.15s ease-in-out;
     transition-property: top, left, color;
    z-index: 1;
  }

  &.success > :where(input, textarea):valid:not(:placeholder-shown) + .label {
    color: var(--clr-success);
  }

  & > :where(input, textarea) {
    background: none;
    border: none;
     border-radius: var(--msr-radius);
    flex-grow: 1;
    line-height: 1.25;
    outline: none;
    padding: 0.25rem 0.5rem;
    z-index: 1;

    &:focus + .label,
    &:not(:placeholder-shown) + .label {
      background: var(--clr-bg);
      font-size: 0.8em;
      left: 4px;
      padding: 0 4px;
      top: -12px;
    }
    &:valid:not(:placeholder-shown) + .label { color: var(--clr-label); }
    &:invalid + .label { color: var(--clr-error); }
  }

  &:has(> :where(input, select)) {
    height: calc(var(--msr-input-height) - 2px);
  }

  & > :where(textarea) {
    resize: vertical;
  }
`;

type Props = {
  /** Label for the input field */
  label: string;
  /**
   * How many columns (out of 12) the input should span.
   * @default 12
   */
  gridSpan?: number;
  /** Success state turns label text green. */
  status?: 'disabled' | 'error' | 'success';
} & (
  | ({ kind: 'number' | 'text' } & HtmlInputAttributes<HTMLInputElement, 'name' | 'type'>)
  | ({ kind: 'select'; options: Array<{ value: string; label: string }> } & HtmlInputAttributes<
      HTMLSelectElement,
      'name'
    >)
  | ({ kind: 'textarea' } & HtmlInputAttributes<HTMLTextAreaElement, 'name'>)
);

const Input = (props: Props) => {
  const { label, gridSpan = 12, status, ...inputProps } = props;

  const id = useId();

  return (
    <InputStyled gridSpan={gridSpan} className={status}>
      {inputProps.kind === 'number' && <input id={id} placeholder="&nbsp;" {...inputProps} />}
      {inputProps.kind === 'select' && (
        <select id={id} {...inputProps}>
          {inputProps.options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {inputProps.kind === 'text' && <input id={id} placeholder="&nbsp;" {...inputProps} />}
      {inputProps.kind === 'textarea' && <textarea id={id} placeholder="&nbsp;" {...inputProps} />}
      <label className="label" htmlFor={id}>
        {label || inputProps.placeholder || inputProps.name}
      </label>
    </InputStyled>
  );
};

export default memo(Input);
