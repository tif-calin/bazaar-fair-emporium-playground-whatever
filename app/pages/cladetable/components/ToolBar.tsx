import React, { type ChangeEventHandler } from 'react';
import { styled } from '@linaria/react';
import Input from './Input';
import Button from './Button';
import useLocalStorage from '~/utils/useLocalStorage';

const Container = styled.div`
  position: relative;

  & > button {
    float: right;
  }

  & > dialog {
    position: absolute;
     top: 30%;
     left: 50%;
    transform: translate(-50%, -50%);

    & .settings-panel {
      background: var(--clr-bg);
      border-radius: var(--msr-radius);
      border: 1px solid var(--clr-line);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;

      & button {
        float: right;
        margin-top: 1rem;
      }
    }
  }
`;

const preventDefault: React.FormEventHandler<HTMLFormElement> = event => event.preventDefault();

const ToolBar = () => {
  const dialogId = React.useId();

  const [oneZoomApiKey, setOneZoomApiKey] = useLocalStorage('oneZoomApiKey', '0');

  const handleUpdateOneZoomApiKey = React.useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => setOneZoomApiKey(event.target.value),
    [setOneZoomApiKey]
  );

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    event => {
      event.preventDefault();
      event.stopPropagation();
      const dialog = document.querySelector<HTMLDialogElement>(`#${dialogId}`);
      dialog?.showModal();
    },
    [dialogId]
  );

  return (
    <Container>
      <Button onClick={handleClick}>Settings</Button>
      <dialog id={dialogId}>
        <div className="settings-panel">
          <form onSubmit={preventDefault}>
            <Input
              kind="text"
              label="OneZoom API Key"
              name="oneZoomApiKey"
              onChange={handleUpdateOneZoomApiKey}
              type="text"
              value={oneZoomApiKey}
            />
          </form>

          <form method="dialog">
            <Button>OK</Button>
          </form>
        </div>
      </dialog>
    </Container>
  );
};

export default React.memo(ToolBar);
