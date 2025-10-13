import express from 'express'
import cors from 'cors'
import { employees } from './mocks/employees'
import { expenses } from './mocks/expenses'

const app = express()
app.use(cors())
app.use(express.json())

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Employees
app.get('/api/employees', async (_req, res) => await new Promise(resolve => setTimeout(() => resolve(res.json(employees)), Math.random() * 500)));

// Employees search
app.get('/api/employees/search', async (req, res) => {
  const q = String(req.query.q ?? '').toLowerCase()
  const result = !q ? employees : employees.filter((e) => e.name.toLowerCase().includes(q))
  await new Promise(resolve => setTimeout(() => resolve(null), 1000 / q.length))
  res.json(result)
});

// Expenses
app.get('/api/expenses', async (_req, res) => await new Promise(resolve => setTimeout(() => resolve(res.json(expenses)), Math.random() * 500)));

const port = process.env.PORT ? Number(process.env.PORT) : 4000
app.listen(port, () => console.log(`Mock API on http://localhost:${port}`))

