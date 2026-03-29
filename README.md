# Vizinhança Solidária

> Plataforma web simples para conectar vizinhos que têm alimentos sobrando com quem precisa — sem burocracia, sem app, direto pelo navegador.

---

## Sobre o Projeto

**Vizinhança Solidária** é um projeto desenvolvido para a disciplina de *Desenvolvimento de Software para a Sociedade*. A ideia surgiu da observação de um problema cotidiano: enquanto muitas pessoas descartam alimentos que sobram, frutas do quintal ou produtos próximos do vencimento, outras pessoas na mesma vizinhança podem estar precisando.

Soluções existentes como o *Comida Invisível* e o *OLIO* (internacional) são aplicativos complexos, voltados a restaurantes e com processos de cadastro burocráticos. Este projeto propõe uma alternativa **simples, local e acessível**: um site leve, em português, que qualquer pessoa consiga usar sem precisar instalar nada.

---

## Objetivo

Reduzir o desperdício de alimentos e promover a solidariedade comunitária, conectando doadores e receptores de alimentos dentro de uma mesma comunidade ou bairro.

---

## Funcionalidades (MVP)

-  **Formulário de cadastro de doação** — nome do item, descrição, bairro e contato
-  **Lista de doações disponíveis** — cards com as informações de cada doação
-  **Filtro por bairro** — para encontrar doações próximas
-  **Armazenamento local** — sem necessidade de backend (usa `localStorage`)

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript (Vanilla) | Lógica da aplicação |
| localStorage | Persistência de dados no navegador |

---

## Estrutura do Projeto

```
vizinhanca-solidaria/
│
├── index.html          # Página principal com lista de doações
├── doar.html           # Formulário de cadastro de doação
│
├── src/
│   ├── css/
│   │   └── style.css   # Estilos globais
│   └── js/
│       └── app.js      # Lógica principal da aplicação
│
├── docs/
│   └── descricao-projeto.md  # Descrição do projeto para entrega
│
└── README.md
```

---

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/vizinhanca-solidaria.git
   ```

2. Abra o arquivo `index.html` no navegador — **não precisa de servidor!**

---

##Cronograma

| Período | Meta |
|---------|------|
| Semanas 1–2 | Proposta e setup do repositório |
| Semanas 3–4 | HTML e CSS das páginas principais |
| Semanas 5–8 | JavaScript: formulário e lista de doações |
| Semanas 9–12 | Filtro por bairro e melhorias de UX |
| Semanas 13–14 | Testes, documentação e refinamento |
| Semana 15 | Apresentação final |

---

##Autor

Desenvolvido como projeto individual para a disciplina de **Projeto em Computação Aplicada**.

---

## Licença

Este projeto é de uso acadêmico e aberto para contribuições.
