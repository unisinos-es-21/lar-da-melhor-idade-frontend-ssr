import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  Header,
  Title,
  Color,
  Table,
} from '@lar_melhor_idade/design-system';

import { getMedicalRecordList } from '@base/api/institutionalized';
import { MedicalRecordListResponse } from '@base/api/interface/institutionalized';

const columns = [
  { column: 'medicalAppointmentDate', description: 'Data consulta' },
  { column: 'responsible', description: 'Médico' },
];

function TableActions({
  id,
  idMedicalRecord,
}: {
  id: string;
  idMedicalRecord: number;
}) {
  const { push } = useRouter();

  return (
    <div className="flex flex-col md:flex-row space-x-4">
      <Button
        color={Color.BLACK}
        onClick={async () =>
          await push(
            `/institutionalized/medical-record/${id}/view/${idMedicalRecord}`
          )
        }
      >
        Ver
      </Button>
    </div>
  );
}

export function Institutionalized() {
  const [cpf, setCpf] = useState(null);
  const [listProps, setListProps] = useState<MedicalRecordListResponse>({
    content: [],
    first: true,
    last: true,
    number: 0,
    totalPages: 0,
  });

  const columnsHeader = useMemo(
    () => columns.map((column) => column.description),
    []
  );

  const dataBody = useMemo(() => {
    return listProps?.content.map(({ medicalAppointmentDate, responsible }) => {
      const values = [medicalAppointmentDate, responsible];

      return { values };
    });
  }, [cpf, listProps]);

  const handleFilter = useCallback(async (value) => {
    setCpf(value);

    const { data } = await getMedicalRecordList({
      page: 0,
      cpf: value,
    });

    setListProps(data);
  }, []);

  const handleNextOrPrevPage = useCallback(async (value) => {
    setCpf(value);

    const { data } = await getMedicalRecordList({
      page: value,
      cpf: value,
    });

    setListProps(data);
  }, []);

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen bg-white space-y-8 md:p-0">
      <Header className="px-4 md:px-0">
        <Title type="h1">
          <span>ILPI Melhor Idade</span>
          {' > '}
          <span>Pesquisar</span>
          {' > '}
          Consultas
        </Title>
      </Header>
      <div className="container grid grid-cols-1 px-4 space-y-4 md:px-0">
        <Table
          title="Consultas"
          inputName="search"
          inputPlaceholder="Digite o CPF"
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
