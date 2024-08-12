import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { NumberInput } from './index.tsx';

describe('NumberInput', () => {
  describe('value rendering', () => {
    it('input should be empty when `value` is undefined', async () => {
      render(<NumberInput label="Num Input" value={undefined} />);

      const input = screen.getByLabelText('Num Input');
      expect(input).toHaveValue('');
    });

    it('input should be 0 when `value` is 10', async () => {
      render(<NumberInput label="Num Input" value={10} />);

      const input = screen.getByLabelText('Num Input');
      expect(input).toHaveValue('10');
    });
  });

  describe('button behavior', () => {
    it.each`
      value        | buttonName | onChangeArg
      ${undefined} | ${'1'}     | ${1}
      ${0}         | ${'0'}     | ${0}
      ${0}         | ${'2'}     | ${2}
      ${1}         | ${'3'}     | ${13}
      ${0}         | ${'C'}     | ${undefined}
      ${1}         | ${'C'}     | ${undefined}
      ${10}        | ${'C'}     | ${undefined}
      ${0}         | ${'←'}     | ${undefined}
      ${1}         | ${'←'}     | ${undefined}
      ${10}        | ${'←'}     | ${1}
    `(
      'onChange should be call with $onChangeArg when `value` is `$value` and button `$buttonName` is clicked',
      async ({ value, buttonName: buttonName, onChangeArg }) => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
          <NumberInput label="Num Input" value={value} onChange={onChange} />,
        );

        await user.click(screen.getByRole('button', { name: buttonName }));
        expect(onChange).toHaveBeenNthCalledWith(1, onChangeArg);
      },
    );

    it.each`
      value        | buttonName
      ${undefined} | ${'C'}
      ${undefined} | ${'←'}
    `(
      'button `$buttonName` should be disabled and onChange should not be called when `value` is `$value` and button `$buttonName` is clicked',
      async ({ value, buttonName }) => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
          <NumberInput label="Num Input" value={value} onChange={onChange} />,
        );

        const button = screen.getByRole('button', { name: buttonName });
        expect(button).toBeDisabled();

        await user.click(button);
        expect(onChange).not.toHaveBeenCalled();
      },
    );
  });
});
