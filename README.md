# Página de divulgação – Serviços de Informática

Página para GitHub Pages: divulgação dos serviços (limpeza, formatação, troca de peças, montagem de PC).

## Estrutura do projeto

```
site/
├── index.html       # Página principal
├── css/
│   └── style.css    # Estilos
├── js/
│   ├── config.js    # Seu número do WhatsApp e mensagem (edite aqui)
│   └── main.js      # Lógica do link do WhatsApp
└── README.md
```

## Configurar seu WhatsApp

Abra **`js/config.js`** e altere:

- **`numero`**: seu número no formato `55` + DDD + número (ex.: `5511987654321`).
- **`mensagem`**: texto que já aparece ao abrir o chat (opcional).

O botão "Chamar no WhatsApp" passará a abrir uma conversa com você com essa mensagem.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie toda a pasta `site` (ou o conteúdo dela na raiz do repo).
3. **Settings → Pages → Source**: branch **main** (ou **master**), pasta **/ (root)**.
4. Salve; a página ficará em `https://seu-usuario.github.io/nome-do-repo/`.
