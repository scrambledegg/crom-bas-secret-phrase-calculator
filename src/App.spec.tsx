import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { KEYWORDS } from './constants';
import { App } from './App.tsx';

describe('App', () => {
  describe('calculation', () => {
    it.each`
      numbers              | operators
      ${[undefined, 0, 0]} | ${['+', '+']}
      ${[0, undefined, 0]} | ${['+', '+']}
      ${[0, 0, undefined]} | ${['+', '+']}
    `(
      'when a expr is `$numbers.0 $operators.0 $numbers.1 $operators.1 $numbers.2`, phrase candidates should be an dummy phrase',
      async ({ numbers, operators }) => {
        const user = userEvent.setup();
        render(<App />);

        for (const [i, num] of numbers.entries()) {
          const input = screen.getByRole('textbox', { name: `Num ${i + 1}` });
          if (num === undefined) {
            await user.clear(input);
            continue;
          }
          await user.type(input, `${num}`);
        }

        for (const [i, op] of operators.entries()) {
          await user.click(
            within(
              screen.getByRole('radiogroup', { name: `Op ${i + 1}` }),
            ).getByRole('radio', { name: op }),
          );
        }

        for (const keyword of KEYWORDS) {
          expect(
            screen.getByRole('textbox', {
              name: `phrase-candidate-${keyword}`,
            }),
          ).toHaveValue(`計算結果 + ${keyword}`);
        }
      },
    );

    it.each`
      numbers      | operators     | calcResult
      ${[0, 1, 2]} | ${['+', '+']} | ${'3'}
      ${[0, 1, 2]} | ${['+', '-']} | ${'-1'}
      ${[0, 1, 2]} | ${['+', '*']} | ${'2'}
      ${[0, 1, 2]} | ${['-', '+']} | ${'1'}
      ${[0, 1, 2]} | ${['-', '-']} | ${'-3'}
      ${[0, 1, 2]} | ${['-', '*']} | ${'-2'}
      ${[0, 1, 2]} | ${['*', '+']} | ${'2'}
      ${[0, 1, 2]} | ${['*', '-']} | ${'-2'}
    `(
      'when a expr is `$numbers.0 $operators.0 $numbers.1 $operators.1 $numbers.2`, phrase candidates should be has `$calcResult` as a prefix',
      async ({ numbers, operators, calcResult }) => {
        const user = userEvent.setup();
        render(<App />);

        for (const [i, num] of numbers.entries()) {
          const input = screen.getByRole('textbox', { name: `Num ${i + 1}` });
          if (num === undefined) {
            await user.clear(input);
            continue;
          }
          await user.type(input, `${num}`);
        }

        for (const [i, op] of operators.entries()) {
          await user.click(
            within(
              screen.getByRole('radiogroup', { name: `Op ${i + 1}` }),
            ).getByRole('radio', { name: op }),
          );
        }

        for (const keyword of KEYWORDS) {
          expect(
            screen.getByRole('textbox', {
              name: `phrase-candidate-${keyword}`,
            }),
          ).toHaveValue(`${calcResult}${keyword}`);
        }
      },
    );
  });
});
