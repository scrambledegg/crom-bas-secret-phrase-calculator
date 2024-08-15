import { useState, useMemo } from 'react';
import {
  Flex,
  Grid,
  Heading,
  Provider,
  View,
  defaultTheme,
} from '@adobe/react-spectrum';
import {
  KeywordSelector,
  NumberInput,
  Operator,
  OperatorInput,
  AppFooter,
} from './components';
import { CopyableOutput } from './components/forms/CopyableOutput';

const KEYWORDS = [
  'インボリック',
  'サーオィン',
  'バス',
  'ベルテン',
  'ルーナサ',
] as const;

type Keyword = (typeof KEYWORDS)[number];

function isNumberArray(
  maybeNumber: (number | undefined)[],
): maybeNumber is number[] {
  return !maybeNumber.includes(undefined);
}

function applyOperator(operator: Operator, operands: (number | undefined)[]) {
  if (!isNumberArray(operands)) {
    return undefined;
  }
  return operands.reduce(
    (accum, curr) => {
      switch (operator) {
        case '+':
          return accum + curr;
        case '-':
          return accum - curr;
        case '*':
          return accum * curr;
        default:
          operator satisfies never;
          throw new Error('無効なOperator');
      }
    },
    ['+', '-'].includes(operator) ? 0 : 1,
  );
}

export function App() {
  const [numbers, setNumbers] = useState<
    [number | undefined, number | undefined, number | undefined]
  >([undefined, undefined, undefined]);
  const [operators, setOperators] = useState<[Operator, Operator]>(['+', '+']);
  const [keyword, setKeyword] = useState<Keyword>('インボリック');

  const answer = useMemo(() => {
    let calculatedResult: number | undefined;
    if (['*'].includes(operators[1])) {
      calculatedResult = applyOperator(operators[0], [
        numbers[0],
        applyOperator(operators[1], numbers.slice(1)),
      ]);
    } else {
      calculatedResult = applyOperator(operators[1], [
        applyOperator(operators[0], numbers.slice(0, 2)),
        numbers[2],
      ]);
    }

    if (calculatedResult === undefined) {
      return undefined;
    }

    return `${calculatedResult}${keyword}`;
  }, [numbers, keyword, operators]);

  return (
    <Provider
      theme={defaultTheme}
      breakpoints={{
        S: 640,
        M: 768,
        L: 862,
      }}
    >
      <Grid rows={['1fr']} minHeight="100dvh">
        <View padding="size-400">
          <Grid rows={['auto', '1fr', 'auto']} height="100%">
            <Heading level={1}>クロムバスの秘密のフレーズ計算機</Heading>
            <Flex
              direction="column"
              gap={{
                base: 'size-200',
                L: 'size-400',
              }}
              maxWidth={{
                base: 'size-3600',
                L: 'initial',
              }}
            >
              <Flex
                direction={{
                  base: 'column',
                  L: 'row',
                }}
                gap="size-200"
              >
                <View
                  width={{
                    base: 'auto',
                    L: 'size-3000',
                  }}
                  order={{
                    base: 1,
                    L: 1,
                  }}
                >
                  <NumberInput
                    label="Num 1"
                    value={numbers[0]}
                    onChange={(value) =>
                      setNumbers([value, numbers[1], numbers[2]])
                    }
                  />
                </View>
                <View
                  width={{
                    base: 'auto',
                    L: 'size-3000',
                  }}
                  order={{
                    base: 2,
                    L: 3,
                  }}
                >
                  <NumberInput
                    label="Num 2"
                    value={numbers[1]}
                    onChange={(value) =>
                      setNumbers([numbers[0], value, numbers[2]])
                    }
                  />
                </View>
                <View
                  width={{
                    base: 'auto',
                    L: 'size-3000',
                  }}
                  order={{
                    base: 3,
                    L: 5,
                  }}
                >
                  <NumberInput
                    label="Num 3"
                    value={numbers[2]}
                    onChange={(value) =>
                      setNumbers([numbers[0], numbers[1], value])
                    }
                  />
                </View>
                <View
                  order={{
                    base: 4,
                    L: 2,
                  }}
                >
                  <OperatorInput
                    label="Op 1"
                    value={operators[0]}
                    orientation={{ base: 'horizontal', L: 'vertical' }}
                    onSelectionChange={(value) =>
                      setOperators([value, operators[1]])
                    }
                  />
                </View>
                <View
                  order={{
                    base: 5,
                    L: 4,
                  }}
                >
                  <OperatorInput
                    label="Op 2"
                    value={operators[1]}
                    orientation={{ base: 'horizontal', L: 'vertical' }}
                    onSelectionChange={(value) =>
                      setOperators([operators[0], value])
                    }
                  />
                </View>
              </Flex>

              <KeywordSelector
                label="Keyword"
                value={keyword}
                onSelectionChange={setKeyword}
                keywords={KEYWORDS}
              />

              <View>
                <Heading level={2}>解答</Heading>
                <CopyableOutput
                  value={answer}
                  inputMaxWidth={'size-3000'}
                  isTextHidden={{
                    base: true,
                    L: false,
                  }}
                  ariaLabel="answer"
                />
              </View>
            </Flex>

            <View marginTop="size-1200">
              <AppFooter />
            </View>
          </Grid>
        </View>
      </Grid>
    </Provider>
  );
}
