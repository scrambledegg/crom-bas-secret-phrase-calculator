import {
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from '@adobe/react-spectrum';

export function AppFooter() {
  return (
    <Flex
      justifyContent="center"
      UNSAFE_style={{
        fontSize: 'var(--spectrum-global-dimension-static-font-size-50)',
      }}
    >
      <DialogTrigger type="modal" isDismissable>
        <Link variant="secondary" rel="pricacy-policy" isQuiet>
          Privacy
        </Link>
        <Dialog size="L">
          <Heading>Privacy Policy</Heading>
          <Divider />
          <Content>
            <Text>
              本サイトでは、コンテンツの分析・改善を目的としてアクセス解析ツールである
              Google Analytics を利用しています。Google Analytics
              は解析用のデータ収集のために Cookie
              を利用しており、収集されるデータには IP
              アドレスや本サイトで閲覧したページなどが含まれますが、本サイト利用者個人を特定するためのものではありません。
            </Text>
          </Content>
        </Dialog>
      </DialogTrigger>
    </Flex>
  );
}
