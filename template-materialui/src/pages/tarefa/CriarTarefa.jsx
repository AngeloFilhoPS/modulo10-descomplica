// CriarTarefa.js
import React, { useState, useEffect } from 'react';
import { 
  FormControl, InputLabel, Input, FormHelperText, MenuItem, Select, 
  Grid, Card, CardHeader, CardContent, CardActions, Button 
} from '@mui/material';

const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  const [prioridadeTarefa, setPrioridadeTarefa] = useState('Média'); // Novo Estado para Prioridade

  useEffect(() => {
    // Definir o próximo ID da tarefa
    let proximoId = tarefas.length > 0 ? Math.max(...tarefas.map(tarefa => tarefa.idTarefa)) + 1 : 1;
    setIdTarefa(proximoId);
  }, [tarefas]);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handlePrioridade = (event) => {
    setPrioridadeTarefa(event.target.value);
  };

  const handleSalvar = () => {
    // Validação simples: Verificar se o título está preenchido
    if (!tituloTarefa.trim()) {
      alert('O título da tarefa é obrigatório.');
      return;
    }

    // Adicionar a nova tarefa ao estado
    setTarefas([...tarefas, {
      idTarefa,
      tituloTarefa,
      descricaoTarefa,
      inicioTarefa,
      fimTarefa,
      recursoTarefa,
      statusTarefa,
      prioridadeTarefa, // Adicionar Prioridade
    }]);

    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader
          title="Tarefas"
          subheader="Cadastro de Tarefas"
        />
        <CardContent sx={{ width: '95%', maxWidth: '100%' }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tarefa_titulo">Título</InputLabel>
              <Input 
                id="tarefa_titulo" 
                aria-describedby="tarefa_titulo_helper_text" 
                value={tituloTarefa} 
                onChange={e => setTituloTarefa(e.target.value)} 
              />
              <FormHelperText id="tarefa_titulo_helper_text">Título da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tarefa_descricao">Descrição</InputLabel>
              <Input 
                id="tarefa_descricao" 
                aria-describedby="tarefa_descricao_helper_text" 
                value={descricaoTarefa} 
                onChange={e => setDescricaoTarefa(e.target.value)} 
              />
              <FormHelperText id="tarefa_descricao_helper_text">Descrição da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_prioridade">Prioridade</InputLabel>
                <Select
                  id="tarefa_prioridade"
                  value={prioridadeTarefa}
                  label="Prioridade"
                  onChange={handlePrioridade}
                  size="small"
                >
                  <MenuItem value={'Alta'}>Alta</MenuItem>
                  <MenuItem value={'Média'}>Média</MenuItem>
                  <MenuItem value={'Baixa'}>Baixa</MenuItem>
                </Select>
                <FormHelperText id="tarefa_prioridade_helper_text">Prioridade da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <InputLabel htmlFor="tarefa_inicio">Início</InputLabel>
                <Input 
                  id="tarefa_inicio" 
                  type="date" 
                  aria-describedby="tarefa_inicio_helper_text" 
                  value={inicioTarefa} 
                  onChange={e => setInicioTarefa(e.target.value)}
                  sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400, paddingLeft: '13px' }} 
                />
                <FormHelperText id="tarefa_inicio_helper_text">Início da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <InputLabel htmlFor="tarefa_fim">Fim</InputLabel>
                <Input 
                  id="tarefa_fim" 
                  type="date" 
                  aria-describedby="tarefa_fim_helper_text" 
                  value={fimTarefa} 
                  onChange={e => setFimTarefa(e.target.value)} 
                  sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400, paddingLeft: '13px' }} 
                />
                <FormHelperText id="tarefa_fim_helper_text">Fim da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                <Select
                  id="tarefa_recurso"
                  value={recursoTarefa}
                  label="Recurso"
                  onChange={handleRecurso}
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }} 
                >
                  <MenuItem value={'Recurso 1'}>Recurso 1</MenuItem>
                  <MenuItem value={'Recurso 2'}>Recurso 2</MenuItem>
                  <MenuItem value={'Recurso 3'}>Recurso 3</MenuItem>
                </Select>
                <FormHelperText id="tarefa_recurso_helper_text">Recurso da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_status">Status</InputLabel>
                <Select
                  id="tarefa_status"
                  value={statusTarefa}
                  label="Status"
                  onChange={handleStatus}
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }} 
                >
                  <MenuItem value={'Aguardando'}>Aguardando</MenuItem>
                  <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                  <MenuItem value={'Concluída'}>Concluída</MenuItem>
                </Select>
                <FormHelperText id="tarefa_status_helper_text">Status da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1}>
                <Button size="small" variant="contained" onClick={handleSalvar}>Salvar</Button>
              </Grid>  
              <Grid item xs={1}>  
                <Button size="small" variant="outlined" onClick={handleClose}>Cancelar</Button>  
              </Grid>
            </Grid>  
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default CriarTarefa;
