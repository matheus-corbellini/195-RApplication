# RApplication

Uma aplicação React moderna com autenticação Firebase e navegação completa.

## 🚀 Funcionalidades

- **Landing Page** - Página inicial atrativa
- **Sistema de Autenticação** - Login e registro com Firebase
- **Dashboard** - Área protegida para usuários logados
- **Navegação Completa** - React Router com proteção de rotas
- **Design Responsivo** - Funciona em desktop e mobile

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── LandingPage.tsx      # Página inicial
│   ├── LoginPage.tsx        # Página de login
│   ├── RegisterPage.tsx     # Página de registro
│   ├── Dashboard.tsx        # Dashboard do usuário
│   ├── ProtectedRoute.tsx   # Componente de proteção de rotas
│   ├── LandingPage.css      # Estilos da landing page
│   ├── AuthPages.css        # Estilos das páginas de auth
│   └── Dashboard.css        # Estilos do dashboard
├── contexts/
│   ├── AuthContextDef.ts    # Definição do context de auth
│   └── AuthContext.tsx      # Provider do context de auth
├── hooks/
│   └── useAuth.ts           # Hook personalizado para auth
├── firebaseconfig.ts        # Configuração do Firebase
└── App.tsx                  # Componente principal com rotas
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router** - Navegação
- **Firebase Auth** - Autenticação
- **CSS3** - Estilização moderna

## 🚀 Como Executar

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Configurar Firebase:**

   - Edite `src/firebaseconfig.ts` com suas credenciais do Firebase

3. **Executar em desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acessar:**
   - Abra [http://localhost:5173](http://localhost:5173)

## 📱 Rotas da Aplicação

- `/` - Landing Page (pública)
- `/login` - Página de Login (pública)
- `/register` - Página de Registro (pública)
- `/dashboard` - Dashboard (protegida - requer login)

## 🔐 Sistema de Autenticação

O projeto utiliza:

- **Context API** para gerenciamento de estado
- **Firebase Auth** para autenticação
- **Protected Routes** para proteger páginas
- **Redirecionamento automático** baseado no estado de autenticação

## 🎨 Design

- **Gradientes modernos** para backgrounds
- **Animações suaves** para transições
- **Design responsivo** para todos os dispositivos
- **Interface intuitiva** e amigável

## 📝 Próximos Passos

- [ ] Adicionar mais funcionalidades ao dashboard
- [ ] Implementar recuperação de senha
- [ ] Adicionar validação de email
- [ ] Implementar perfil do usuário
- [ ] Adicionar testes unitários
