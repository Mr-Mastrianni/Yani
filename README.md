# Yani - Sacred Feminine Wellness Platform

A beautiful, modern web application dedicated to sacred feminine wellness, featuring products, blog content, and community forums.

## 🌸 Features

- **Product Catalog**: Browse and discover sacred wellness products
- **Blog**: Read articles about feminine wellness and sacred rituals
- **Community Forum**: Connect with others on their wellness journey
- **User Authentication**: Secure login and registration
- **Responsive Design**: Beautiful experience on all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Shadcn/ui component library

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mr-Mastrianni/Yani.git
cd Yani
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Install backend dependencies:
```bash
cd backend
pnpm install
```

4. Set up environment variables:
Create a `.env` file in the backend directory with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/yani_db
JWT_SECRET=your-secret-key
PORT=3001
```

5. Run database migrations:
```bash
cd backend
pnpm run db:migrate
```

### Running the Application

1. Start the backend server:
```bash
cd backend
pnpm run dev
```

2. In a new terminal, start the frontend:
```bash
pnpm run dev
```

3. Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   └── types/             # TypeScript types
├── backend/               # Backend source code
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Data models
│   │   └── db/            # Database configuration
│   └── package.json
├── public/                # Static assets
└── package.json          # Frontend dependencies
```

## 🎨 Design Philosophy

This platform embraces the divine feminine through:
- Soft, nurturing color palettes
- Elegant typography
- Smooth animations
- Intuitive user experience
- Sacred geometry patterns

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 💖 Acknowledgments

Created with love for the sacred feminine community.
