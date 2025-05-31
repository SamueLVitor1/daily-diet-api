## ✅ Requisitos Funcionais

- [x] O sistema deve permitir o cadastro de um novo usuário.  
- [x] O sistema deve permitir que o usuário seja identificado em todas as requisições (ex: via token).  
- [x] O sistema deve permitir o cadastro de uma nova refeição para o usuário logado.  
- [x] O sistema deve permitir a edição de uma refeição existente do usuário logado.  
- [x] O sistema deve permitir a exclusão de uma refeição do usuário logado.  
- [x] O sistema deve permitir a listagem de todas as refeições do usuário logado.  
- [x] O sistema deve permitir a visualização dos detalhes de uma refeição específica.  
- [ ] O sistema deve disponibilizar métricas ao usuário, como:
  - [ ] Total de refeições cadastradas  - :fazer a controller
  - [ ] Total de refeições dentro da dieta  
  - [ ] Total de refeições fora da dieta  
  - [ ] Melhor sequência de refeições dentro da dieta  

---

## 📏 Regras de Negócio

- [ ] O usuário só pode visualizar, editar ou excluir suas próprias refeições.  
- [x] Cada refeição deve obrigatoriamente indicar se está ou não dentro da dieta.  
- [ ] A métrica de "melhor sequência de refeições dentro da dieta" deve considerar dias ou registros consecutivos com refeições marcadas como "dentro da dieta".  
- [x] A identificação do usuário deve ser obrigatória para acessar rotas protegidas.  
- [x] Não deve ser permitido criar refeições com datas futuras.  

---

## 🖥 Requisitos Não-Funcionais

- [x] A API deve ser desenvolvida utilizando **Node.js**, com o framework **Fastify** e **TypeScript**.  
- [x] O banco de dados utilizado deve ser o **PostgreSQL**.  
- [x] As senhas dos usuários devem ser armazenadas de forma segura (ex: usando hash com bcrypt).  
- [x] A API deve seguir os princípios RESTful.  
- [x] Deve haver validação dos dados de entrada (ex: usando `zod` ou outra lib).  
- [ ] O sistema deve garantir que os dados estejam disponíveis apenas ao usuário autenticado (autorização por token).  
- [ ] Os endpoints devem retornar mensagens claras em caso de erro (ex: 404, 401, 400). 