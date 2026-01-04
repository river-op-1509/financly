# Financly 

> **Controle financeiro pessoal focado em UX, Acessibilidade e Performance.**

## Sobre o Projeto

O Financly é uma aplicação de gestão financeira desenvolvida para solucionar problemas comuns de interfaces amadoras. O foco do desenvolvimento não foi apenas a lógica de registro, mas a implementação de um Design System consistente e acessível.

A aplicação segue rigorosos padrões de hierarquia visual, feedback de interface e tratamento de dados no front-end.

![Status](https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge)


## Interface

<div align="center">
  <img src="assets/print-desktop.png" alt="Dashboard Financly" width="100%">
</div>

## Tecnologias

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="40" alt="tailwindcss logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" height="40" alt="vitejs logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" height="40" alt="eslint logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" height="40" alt="vercel logo" />
</div>

## Funcionalidades e Detalhes Técnicos

Abaixo, a lista de implementações que diferenciam este projeto:

### Core (Lógica e Dados)
* **CRUD Completo:** Permite criar, ler, deletar e **editar** transações existentes.
* **Máscaras de Input:** Formatação automática de moeda (BRL) em tempo real (evita input manual de pontos e vírgulas).
* **Formatação de Data:** Exibição no padrão local (DD/MM/AAAA) e não o padrão de banco de dados.
* **Título Dinâmico:** A aba do navegador altera o título conforme a navegação (ex: "Dashboard | Minhas Finanças").

### UI/UX (Interface e Experiência)
* **Estilização Atômica:** Uso de Tailwind CSS para consistência de espaçamentos, cores e tipografia.
* **Feedback Visual:** Toasts de notificação e validação de formulários.
* **Estados de Carregamento:** Loading Skeletons implementados para evitar layout shift durante o load.
* **Empty States:** Telas de incentivo quando não há dados cadastrados.
* **Acessibilidade:** Foco visível (outline), contraste adequado e HTML semântico.

### Acessibilidade
* **Navegação via Teclado:** Feedback visual de *Foco* (outline) ao navegar com a tecla Tab.
* **Contraste:** Combinações de cores de texto e fundo aprovadas nos testes WCAG.

## Instalação e Execução

Pré-requisitos: Node.js (versão 18 ou superior) instalado.

```bash
# 1. Clone o repositório
git clone [https://github.com/river-op-1509/financly.git](https://github.com/river-op-1509/financly.git)

# 2. Acesse o diretório
cd financly

# 3. Instale as dependências
npm install

# 4. Execute o projeto em modo de desenvolvimento
npm run dev

```
---

Estrutura de Pastas

```
financly/
│
├── public/          # Assets estáticos (imagens, favicons)
├── src/             # Código fonte da aplicação
│   ├── components/  # Componentes reutilizáveis
│   ├── styles/      # Arquivos CSS globais (Tailwind directives)
│   └── main.js      # Ponto de entrada do JavaScript
├── index.html       # Entry point do Vite
├── tailwind.config.js # Configuração do Tailwind CSS
├── vite.config.js   # Configuração do Bundler Vite
└── package.json     # Dependências e scripts
```
---


### Conceitos Aplicados

Durante o desenvolvimento, foquei em resolver problemas comuns de interfaces amadoras:

* **Hierarquia Visual:** Diferenciação clara entre títulos (H1/H2) e corpo de texto usando peso e escala, não apenas negrito.

* **Micro-interações:** Estados de Hover em todos os elementos clicáveis para dar certeza da ação ao usuário.

8 **Clean Code:** Estrutura semântica e organizada, facilitando a manutenção futura.

### Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para contribuir!

Desenvolvido por **River-Op-1509**

