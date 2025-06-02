import { useState } from 'react';

interface Biografia {
  nome: string;
  descricao: string;
  imagem: string;
  nascimento: string;
  localNascimento: string;
}

export function useBuscaBiografia() {
  const [nomeBusca, setNomeBusca] = useState('');
  const [biografia, setBiografia] = useState<Biografia | null>(null);

  async function buscarBiografia() {
    try {
      const nomeFormatado = nomeBusca.trim().replace(/\s+/g, '_');
      const url = `https://dbpedia.org/data/${nomeFormatado}.json`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar dados da DBpedia');

      const data = await response.json();
      const info = data[`http://dbpedia.org/resource/${nomeFormatado}`];

      if (!info) throw new Error('Informações não encontradas');

      const getValue = (prop: string) => info[prop]?.[0]?.value || '';
      const getDescricaoPT = () => {
        const abstracts = info['http://dbpedia.org/ontology/abstract'];
        if (!abstracts) return '';
        const pt = abstracts.find((a: any) => a.lang === 'pt');
        return pt ? pt.value : '';
      };
      const formatURI = (uri: string) =>
        uri ? decodeURIComponent(uri.split('/').pop()?.replace(/_/g, ' ') || '') : '';

      setBiografia({
        nome: getValue('http://xmlns.com/foaf/0.1/name'),
        descricao: getDescricaoPT() || 'Descrição não disponível em português.',
        imagem: getValue('http://xmlns.com/foaf/0.1/depiction'),
        nascimento: getValue('http://dbpedia.org/ontology/birthDate'),
        localNascimento: formatURI(getValue('http://dbpedia.org/ontology/birthPlace')),
      });

    } catch (error) {
      console.error('Erro ao buscar biografia:', error);
      setBiografia(null);
    }
  }

  return {
    nomeBusca,
    setNomeBusca,
    biografia,
    buscarBiografia,
  };
}
