import { useRouter } from 'next/router';

import {
  Button,
  Card,
  Header,
  Icon,
  Title,
  Color,
} from '@lar_melhor_idade/design-system';

export function Home() {
  const { push } = useRouter();

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen bg-white space-y-8 md:p-0">
      <Header className="px-4 md:px-0">
        <Title type="h1">ILPI Melhor Idade</Title>
      </Header>
      <div className="container grid grid-cols-1 px-4 space-y-8 md:grid-cols-4 md:px-0">
        <Card>
          <Card.Header className="flex items-center space-x-4">
            <Icon icon="user" size="2x" />
            <Title color={Color.WHITE}>Institucionalizados</Title>
          </Card.Header>
          <Card.Content>
            <Button
              className="w-full"
              type="button"
              color={Color.BLACK}
              icon="arrow-right"
              onClick={async () => await push('/institutionalized')}
            >
              Acessar
            </Button>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
