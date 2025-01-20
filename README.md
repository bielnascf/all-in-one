# All-in-One

All-in-One is a daily organization application designed to streamline your life with six powerful features, combining simplicity, efficiency, and flexibility in a single platform. Built with cutting-edge technologies, this project is both a practical tool and a showcase of modern web development practices.

### Figma --> [All-in-One Project](https://www.figma.com/design/sW31GZP1EbSszLkEVbIAcA/Help-me-to-Help-you?node-id=0-1&t=kjqypgsJUUC2cnlW-1)

## Features

### 🌟 Task Planner
Effortlessly create, manage, and organize your daily tasks to stay on top of your to-do list.

### 📝 MemoHelp
Keep quick notes and reminders handy to never forget important details.

### 🍳 Cookbooker
Save and organize your favorite recipes for easy access during meal planning.

### ⏰ Routine Builder
Design and maintain consistent daily routines to boost productivity and balance.

### 💰 Financial Tracker
Track your expenses and manage budgets effectively with an intuitive interface.

### 📖 Dear Diary
Write and reflect on your day-to-day experiences with a private, secure diary feature.

## Technologies Used

### Core Frameworks and Tools
- **Next.js 15**: A modern React framework for building fast, server-rendered applications.
- **TypeScript**: Provides type safety and improves code quality.
- **Prisma**: A next-generation ORM for seamless database interactions.
- **Supabase (PostgreSQL)**: A powerful backend for authentication and data storage.

### UI and Styling
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui**: A customizable and accessible UI component library.

### Authentication and Validation
- **NextAuth.js**: Secure user authentication with providers like Google, GitHub, and credentials.
- **Zod**: A schema-based validation library for ensuring data integrity.

## Installation

Follow these steps to set up the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/all-in-one.git
   cd all-in-one
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and provide the necessary configurations:
   ```env
   DATABASE_URL=your_postgresql_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or collaboration, feel free to reach out:

- **GitHub**: [github.com/bielnascf](https://github.com/bielnascf)
- **LinkedIn**: [linkedin.com/in/gabriel.nascimento](https://www.linkedin.com/in/gabriel-nascimento-484450255/)

---
Organize your life effortlessly with All-in-One!

