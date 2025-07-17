Teste Técnico - Frontend
Developer

O desafio consiste em desenvolver uma aplicação web utilizando Next.js que
funcione como um portal de lançamentos da SpaceX.
Descrição do Desafio

Deverá construir uma aplicação com as seguintes características:
1. Funcionalidade Principal
Criar um portal que consuma a API pública da SpaceX (GraphQL – Apollo
Studio) para exibir os lançamentos espaciais.
2. Páginas obrigatórias (mínimo 3):
Página inicial: Apresentação básica do portal.
Catálogo de lançamentos:
Listagem dos lançamentos com informações relevantes (nome da
missão, data, status etc.)
Implementar paginação invisível com carregamento progressivo
(infinite scroll) à medida que o usuário rola a página
Página de detalhes: Exibir detalhes completos do lançamento
selecionado, como:
Nome da missão
Descrição
Foguete utilizado
Imagens e vídeos (se disponíveis)
Links adicionais (Wikipedia, YouTube etc.)

3. Requisitos técnicos obrigatórios:
Utilizar Next.js com App Router

Teste Técnico - Frontend Developer 1

Integração com a API GraphQL da SpaceX (permitido utilizar
@apollo/client )
Aplicar Tailwind CSS v4 para estilização
Utilizar componentes do shadcn/ui
A aplicação deve ser responsiva
Utilizar duas estratégias diferentes de renderização:
SSR (Server-side rendering)
CSR (Client-side rendering)
Implementar pelo menos:
1 teste unitário (ex: com jest ou vitest )
1 teste end-to-end (E2E) (ex: com Cypress )

Critérios de Aceitação:
Organização e clareza do código
Uso adequado do App Router e convenções do Next.js
Boa separação de responsabilidades entre componentes e lógica de dados
Uso coerente do Tailwind CSS e dos componentes shadcn/ui
Implementação funcional do infinite scroll (paginação invisível) no catálogo
Responsividade e boa usabilidade
Consumo correto da API GraphQL
Testes implementados e funcionais (unitário e E2E)
Demonstração clara de uso de SSR e CSR

A entrega do teste deverá ser realizada via link de GitHub.