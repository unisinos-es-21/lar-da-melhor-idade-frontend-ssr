import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  Header,
  Title,
  Color,
  Table,
} from '@lar_melhor_idade/design-system';

import { getList } from '@base/api/institutionalized';
import { InstitutionalizedListResponse } from '@base/api/interface/institutionalized';

enum Gender {
  MASCULINE = 'Masculino',
  FEMININE = 'Feminino',
  OTHER = 'Outro',
}

const columns = [
  { column: 'name', description: 'Nome' },
  { column: 'cpf', description: 'CPF' },
  { column: 'phone', description: 'Telefone' },
  { column: 'birthDay', description: 'Data de Nascimento' },
  { column: 'gender', description: 'Sexo' },
  { column: 'actions', description: 'Ações' },
];

function TableActions({ id }: { id: number }) {
  const { push } = useRouter();

  return (
    <div>
      <Button
        color={Color.BLACK}
        onClick={async () =>
          await push(`/institutionalized/medical-record/${id}/list`)
        }
      >
        Prontuário
      </Button>
    </div>
  );
}

export function Institutionalized() {
  const { push } = useRouter();

  const [listProps, setListProps] = useState<InstitutionalizedListResponse>({
    content: [],
    first: true,
    last: true,
    number: 0,
    totalPages: 0,
  });

  useEffect(() => {
    async function fetchList() {
      const { data } = await getList();

      setListProps(data);
    }

    fetchList();
  }, []);

  const columnsHeader = useMemo(
    () => columns.map((column) => column.description),
    []
  );

  const dataBody = useMemo(() => {
    return listProps?.content.map(
      ({ name, cpf, phone, birthDay, gender, id }) => {
        const parseGender = gender as keyof typeof Gender;
        const formatGender = Gender[parseGender];
        const values = [
          name,
          cpf,
          phone,
          birthDay,
          formatGender,
          <TableActions id={id} />,
        ];

        return { values };
      }
    );
  }, [listProps]);

  const handleFilter = useCallback(async (value) => {
    const { data } = await getList({ name: value });

    setListProps(data);
  }, []);

  const handleNextOrPrevPage = useCallback(async (value) => {
    const { data } = await getList({ page: value });

    setListProps(data);
  }, []);

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen bg-white space-y-8 md:p-0">
      <Header className="px-4 md:px-0">
        <Title type="h1">
          <span
            className="cursor-pointer"
            onClick={async () => await push(`/home`)}
          >
            ILPI Melhor Idade
          </span>
          {' > '} Institucionalizado
        </Title>
      </Header>
      <div className="container grid grid-cols-1 px-4 space-y-4 md:px-0">
        <div>
          <Button
            className="w-auto"
            type="button"
            color={Color.BLACK}
            icon="plus"
            onClick={async () => await push('/institutionalized/register')}
          >
            Cadastrar
          </Button>
        </div>
        <Table
          title="Institucionalizados"
          inputName="search"
          inputPlaceholder="Pesquisar"
          data={dataBody}
          columns={columnsHeader}
          totalPages={listProps.totalPages}
          page={listProps.number}
          isFirst={listProps.first}
          isLast={listProps.last}
          filter={handleFilter}
          nextPage={() => handleNextOrPrevPage(listProps.number + 1)}
          previousPage={() => handleNextOrPrevPage(listProps.number - 1)}
        />
      </div>
    </section>
  );
}
