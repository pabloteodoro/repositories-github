import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorio, setRepositorio] = useState([]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.name,
      };

      setRepositorio([...repositorio, data]);
      setNewRepo('');
    }

    submit();
  }, [newRepo, repositorio]);

  return (
    <Container>
      <h1>
        <FaGithub />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />

        <SubmitButton>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}