import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { App } from './App.tsx';

describe('App', () => {
  describe('calculation', () => {
    it.each`
      numbers              | operators     | keyword           | answer
      ${[undefined, 0, 0]} | ${['+', '+']} | ${'インボリック'} | ${''}
      ${[0, undefined, 0]} | ${['+', '+']} | ${'インボリック'} | ${''}
      ${[0, 0, undefined]} | ${['+', '+']} | ${'インボリック'} | ${''}
      ${[0, 1, 2]}         | ${['+', '+']} | ${'サーオィン'}   | ${'3サーオィン'}
      ${[0, 1, 2]}         | ${['*', '-']} | ${'バス'}         | ${'-2バス'}
      ${[0, 1, 2]}         | ${['+', '*']} | ${'ベルテン'}     | ${'2ベルテン'}
      ${[0, 1, 2]}         | ${['-', '*']} | ${'ルーナサ'}     | ${'-2ルーナサ'}
    `(
      '`$numbers.0 $operators.0 $numbers.1 $operators.1 $numbers.2` and $keyword should be `$answer`',
      async ({ numbers, operators, keyword, answer }) => {
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

        await user.click(
          within(screen.getByRole('radiogroup', { name: 'Keyword' })).getByRole(
            'radio',
            { name: keyword },
          ),
        );

        expect(screen.getByRole('textbox', { name: 'answer' })).toHaveValue(
          answer,
        );
      },
    );
  });
});
