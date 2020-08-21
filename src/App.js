import React, { useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'Challenge React',
      url: 'https://github.com/VitorLK/gostack-challenge03',
      techs: 'ReactJS',
      likes: 0,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    // await api.delete(`repositories/${id}`);

    // const repository = repositories.findIndex(repository => repository.id === id);

    // repositories.splice(repository, 1);

    // setRepositories(repositories)

    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button> 
            </li>)
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
