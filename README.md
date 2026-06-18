# Vizinhança Solidária

> Plataforma web simples para conectar vizinhos que têm alimentos sobrando com quem precisa, sem burocracia e sem necessidade de instalar aplicativos.

---

## Contexto do Projeto Original

### Descrição
O **Vizinhança Solidária** foi concebido como um projeto acadêmico para reduzir o desperdício de alimentos e aproximar doadores e receptores em nível local. A proposta inicial era um sistema leve, com duas páginas HTML, para publicar e visualizar doações no próprio navegador.

### Funcionalidades Existentes
- Cadastro de doação com item, descrição, bairro e contato
- Listagem de doações em cards
- Filtro por bairro
- Persistência local com `localStorage`

### Limitações Identificadas
- Limitação 1: Geração de identificador por timestamp (`Date.now`), com risco de colisão em cadastros simultâneos
- Limitação 2: Falta de tratamento de erro para leitura de `localStorage`, impactando robustez em cenários de dados corrompidos
- Limitação 3: Busca limitada ao bairro, reduzindo a encontrabilidade de doações por tipo de alimento

### Tecnologias Utilizadas
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Não se aplica (aplicação cliente)
- Banco de Dados: `localStorage` (armazenamento no navegador)

---

## Melhorias Propostas

### Melhoria 1: Confiabilidade dos dados e identificadores
**Problema:** IDs baseados em tempo podem colidir e a leitura do armazenamento local pode falhar sem fallback.  
**Solução:** Substituir por `crypto.randomUUID()` e aplicar `try/catch` em leituras de `localStorage`.  
**Justificativa:** Evita inconsistências de dados e aumenta a resiliência da aplicação em cenários reais.  
**Impacto esperado:** Redução de falhas em cadastro/listagem e maior estabilidade do fluxo de doação.

### Melhoria 2: Usabilidade da busca e da listagem
**Problema:** A busca por bairro era restrita e a listagem extensa dificultava navegação em volumes maiores.  
**Solução:** Expandir filtro para bairro **ou** alimento e implementar paginação simples com botão “Carregar mais”.  
**Justificativa:** Melhora a experiência de uso e reduz esforço para encontrar doações relevantes.  
**Impacto esperado:** Maior velocidade de localização de itens e melhor escalabilidade visual da interface.

### Melhoria 3: Qualidade de entrada e privacidade do contato
**Problema:** Validação de contato permissiva e ausência de aviso explícito de exposição pública do número.  
**Solução:** Aplicar validação para telefone brasileiro, limitar entrada numérica e inserir aviso de privacidade no formulário.  
**Justificativa:** Eleva a qualidade dos dados e reforça transparência no tratamento das informações inseridas pelo usuário.  
**Impacto esperado:** Menos contatos inválidos e maior clareza para o doador sobre visibilidade do dado informado.

---

## Cronograma de Implementação

### Mês 1: Análise e Setup
- [x] Análise detalhada do código existente
- [x] Configuração do ambiente de desenvolvimento
- [x] Criação de branch de desenvolvimento
- [x] Definição de arquitetura das melhorias

### Mês 2: Desenvolvimento
- [x] Implementação da Melhoria 1
- [x] Implementação da Melhoria 2
- [x] Testes manuais de fluxo e validações
- [x] Testes de integração entre formulário, listagem e filtro

### Mês 3: Refinamento e Entrega
- [x] Correção de bugs e ajustes de UX/UI
- [x] Documentação técnica e acadêmica
- [x] Preparação da apresentação
- [x] Consolidação para entrega final

---

## Resultados das Melhorias

### Antes
- Risco de colisão de IDs em cadastros muito próximos
- Falta de tratamento robusto na leitura de armazenamento local
- Busca limitada apenas ao bairro
- Listagem sem paginação em volumes maiores

### Depois
- IDs únicos com `crypto.randomUUID()`
- Leitura de `localStorage` com tratamento de exceções
- Busca por bairro **e** nome do alimento
- Paginação simples com carregamento progressivo
- Validação de contato mais estrita e aviso explícito de privacidade

### Métricas de Melhoria
- Confiabilidade de dados: redução de risco de colisão de identificador para nível prático desprezível
- Usabilidade: redução do esforço de busca ao permitir consulta por item e bairro
- Escalabilidade visual: listagem incremental com blocos de 12 itens
- Qualidade de dados: validação de telefone brasileiro e limitação de dígitos no contato

---

## Melhorias Implementadas nesta Versão

- `fix`: uso de `crypto.randomUUID()` para IDs de doação
- `fix`: tratamento de erro nas leituras de `localStorage`
- `feat`: validação de formato de telefone brasileiro no campo contato
- `feat`: aviso de privacidade sobre exibição pública do contato
- `feat`: expansão de filtro para bairro e alimento
- `feat`: paginação simples na listagem de doações (12 por vez)
- `chore`: inclusão de `.gitignore` com padrões de sistema e ambiente

---

## 🛠️ Estrutura do Projeto

```
vizinhanca-solidaria/
│
├── index.html
├── doar.html
├── README.md
├── .gitignore
├── descricao-projeto.docx
│
├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
└── docs/
    └── descricao-projeto.docx
```

---

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/nicholasmonteiro-crypto/vizinhanca-solidaria-projeto.git
   ```
2. Abra `index.html` no navegador (não requer servidor).

---

## Referências

1. SOMMERVILLE, Ian. **Engenharia de Software**. 10ª ed. Pearson, 2018.
2. MARTIN, Robert C. **Código Limpo: Habilidades Práticas do Agile Software**. Alta Books, 2009.
3. Mozilla Developer Network. [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).
4. W3C. [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/).
5. Google Developers. [Web.dev - Form validation UX](https://web.dev/learn/forms/validation/).

---

## Autor

Projeto desenvolvido para a disciplina de **Desenvolvimento de Software para a Sociedade**.
