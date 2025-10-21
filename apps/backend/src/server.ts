import express from 'express'
import cors from 'cors'
import { employees } from './mocks/employees'
import { EXPENSE_STATUS_SET, expenses } from './mocks/expenses'
import { rateLimit } from 'express-rate-limit'

const employeeIdToNameMap = new Map(employees.map((e) => [e.id, e.name]))

const app = express()
app.use(cors())
app.use(express.json())

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Employees
app.get('/api/employees', async (_req, res) => await new Promise(resolve => setTimeout(() => resolve(res.json(employees)), Math.random() * 500)));

const employeeSearchLimiter = rateLimit({
  windowMs: 500,
  limit: 2,
})

// Employees search
app.get('/api/employees/search', employeeSearchLimiter, async (req, res) => {
  const q = String(req.query.q ?? '').toLowerCase()
  const result = (!q ? employees : employees.filter((e) => e.name.toLowerCase().includes(q))).slice(0, 5).sort((a, b) => a.name.localeCompare(b.name))
  await new Promise(resolve => setTimeout(() => resolve(null), Math.random() * 500))
  res.json(result)
});

app.get('/api/expenses', async (req, res) => {
  const employeeId = req.query.employeeId ? String(req.query.employeeId) : undefined
  const statusStr = typeof req.query.status === 'string' ? req.query.status : ''
  const page = Math.max(1, Number(req.query.page ?? 1))
  const pageSize = Math.max(1, Number(req.query.pageSize ?? 10))

  let list = expenses
  if (employeeId) list = list.filter((e) => e.employeeId === employeeId)
  const requestedStatuses = statusStr
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const validStatuses = requestedStatuses.filter((s) => EXPENSE_STATUS_SET.has(s))
  if (validStatuses.length > 0) {
    list = list.filter((e) => validStatuses.includes(e.status))
  }

  const total = list.length
  const start = (page - 1) * pageSize
  const items = list.slice(start, start + pageSize).map((e) => ({
    ...e,
    employeeName: employeeIdToNameMap.get(e.employeeId),
  }))

  await new Promise(resolve => setTimeout(() => resolve(null), Math.random() * 500))
  res.json({ items, total, page, pageSize })
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000
app.listen(port, () => console.log(`Mock API on http://localhost:${port}`))

