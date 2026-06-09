const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// SCENARIO DATA
// ─────────────────────────────────────────────
const scenarios = [
  {
    id: 1,
    title: 'Query a Database with SQL',
    course: 'AI Skills for IT Professionals',
    lessonCode: '2.1.5',
    color: '#ECE5FF',
    intro: {
      description:
        "In this activity, you will practice improving an AI prompt for a database query scenario and evaluating whether the AI's SQL output meets all the requirements.",
      objectives: [
        'Edit a partially written prompt so it gives the AI all the information needed to generate the correct SQL query',
        'Evaluate an AI-generated SQL query to confirm it selects the right data and produces the right results',
      ],
    },
    step1: {
      subtitle: 'Fix the Prompt Used to Generate a SQL code',
      instructions: 'Edit the prompt so it meets all requirements, then click Submit.',
      tableColumns: [
        { column: 'employee_id', type: 'INT', description: 'Unique employee ID' },
        { column: 'first_name', type: 'VARCHAR', description: 'First name' },
        { column: 'last_name', type: 'VARCHAR', description: 'Last name' },
        { column: 'email', type: 'VARCHAR', description: 'Email address' },
        { column: 'department', type: 'VARCHAR', description: 'Department name' },
        { column: 'hire_date', type: 'DATE', description: 'Date of hire' },
      ],
      requirements: [
        'Use SQL',
        'Reference the employees table',
        'Select first name and last name column',
        'Select the email column',
        'Select the department column',
        'Filter to the Sales department only',
        'Sort results alphabetically by last name',
        'Include comments in the query',
      ],
      starterPrompt:
        'Write a SQL query that selects first name, last name, department, and email from the employees table. Filter the results to only include employees in the Sales department. Sort the results alphabetically by last name.',
      correctPrompt:
        'Write a SQL query that selects first name, last name, department, and email from the employees table. Filter the results to only include employees in the Sales department. Sort the results alphabetically by last name. Include comments in the query.',
      hint: 'Check each requirement against what the prompt currently asks for. What is missing from the requirements list?',
    },
    step2: {
      subtitle: 'Evaluate an SQL Script',
      instructions: 'Answer the following question.',
      question: 'Is this output correct?',
      sqlCode: `-- Retrieve all Sales department employees, sorted alphabetically by last name\nSELECT first_name, last_name, email\nFROM employees\nWHERE department = 'Sales'\nORDER BY last_name ASC;`,
      options: [
        { id: 'A', text: 'Yes, it meets all requirements' },
        { id: 'B', text: 'No, it is missing the email column' },
        { id: 'C', text: 'No, it filters the wrong department' },
        { id: 'D', text: 'No, the results are not sorted by last name' },
      ],
      correctAnswer: 'A',
      hint: 'Review each requirement from Step 1 and check whether the SQL query satisfies it.',
    },
  },
  {
    id: 2,
    title: 'Aggregate Sales Data by Region',
    course: 'AI Skills for IT Professionals',
    lessonCode: '2.2.1',
    color: '#E5F6FF',
    intro: {
      description:
        'In this activity, you will practice writing an AI prompt to generate a SQL query that aggregates sales data by region, and then evaluate whether the result is correct.',
      objectives: [
        'Complete an AI prompt so it produces a SQL query that groups and totals sales by region',
        'Evaluate the AI-generated SQL query for correctness against a set of requirements',
      ],
    },
    step1: {
      subtitle: 'Fix the Prompt Used to Aggregate Sales',
      instructions: 'Edit the prompt so it meets all requirements, then click Submit.',
      tableColumns: [
        { column: 'order_id', type: 'INT', description: 'Unique order ID' },
        { column: 'region', type: 'VARCHAR', description: 'Sales region' },
        { column: 'sales_amount', type: 'DECIMAL', description: 'Amount of sale' },
        { column: 'order_date', type: 'DATE', description: 'Date of order' },
        { column: 'rep_name', type: 'VARCHAR', description: 'Sales representative name' },
      ],
      requirements: [
        'Use SQL',
        'Reference the orders table',
        'Group results by region',
        'Calculate total sales per region using SUM',
        'Only include regions where total sales exceed 50000',
        'Sort by total sales descending',
        'Alias the SUM column as total_sales',
        'Include comments in the query',
      ],
      starterPrompt:
        'Write a SQL query that calculates the total sales for each region from the orders table. Group by region and sort by total sales from highest to lowest.',
      correctPrompt:
        "Write a SQL query that calculates the total sales for each region from the orders table. Group by region, alias the sum as total_sales, filter to only regions where total sales exceed 50000 using HAVING, and sort by total sales descending. Include comments in the query.",
      hint: 'The prompt is missing the HAVING filter condition, the alias name, and the instruction to add comments.',
    },
    step2: {
      subtitle: 'Evaluate an SQL Script',
      instructions: 'Answer the following question.',
      question: 'Is this SQL query correct?',
      sqlCode: `-- Calculate total sales by region, only where total > 50000\nSELECT region, SUM(sales_amount) AS total_sales\nFROM orders\nGROUP BY region\nHAVING SUM(sales_amount) > 50000\nORDER BY total_sales DESC;`,
      options: [
        { id: 'A', text: 'Yes, it meets all requirements' },
        { id: 'B', text: 'No, it is missing the HAVING clause' },
        { id: 'C', text: 'No, the SUM column is not aliased correctly' },
        { id: 'D', text: 'No, it groups by the wrong column' },
      ],
      correctAnswer: 'A',
      hint: 'Compare the SQL to each requirement: check GROUP BY, HAVING, ORDER BY, and the alias.',
    },
  },
  {
    id: 3,
    title: 'Join Customer and Order Tables',
    course: 'AI Skills for IT Professionals',
    lessonCode: '2.3.2',
    color: '#E5FFE9',
    intro: {
      description:
        'In this activity, you will craft an AI prompt to produce a SQL JOIN query that connects customers with their orders, then evaluate the generated output.',
      objectives: [
        'Write a prompt that instructs the AI to produce a correct INNER JOIN between two tables',
        'Identify whether the AI-generated SQL query returns the expected columns and join condition',
      ],
    },
    step1: {
      subtitle: 'Fix the Prompt for a JOIN Query',
      instructions: 'Edit the prompt so it meets all requirements, then click Submit.',
      tableColumns: [
        { column: 'customer_id', type: 'INT', description: 'Unique customer ID (customers & orders)' },
        { column: 'customer_name', type: 'VARCHAR', description: 'Full name (customers table)' },
        { column: 'email', type: 'VARCHAR', description: 'Email address (customers table)' },
        { column: 'order_id', type: 'INT', description: 'Unique order ID (orders table)' },
        { column: 'order_date', type: 'DATE', description: 'Date of order (orders table)' },
        { column: 'total_amount', type: 'DECIMAL', description: 'Order total (orders table)' },
      ],
      requirements: [
        'Use SQL',
        'INNER JOIN the customers and orders tables',
        'Join on customer_id',
        'Select customer_name, email, order_id, order_date, total_amount',
        'Filter orders placed in 2024',
        'Sort by order_date descending',
        'Include comments in the query',
      ],
      starterPrompt:
        'Write a SQL query that joins the customers table with the orders table. Show the customer name, email, and their order details.',
      correctPrompt:
        'Write a SQL query that performs an INNER JOIN between the customers table and the orders table on customer_id. Select customer_name, email, order_id, order_date, and total_amount. Filter to only include orders placed in 2024. Sort the results by order_date descending. Include comments in the query.',
      hint: 'The prompt is missing the specific JOIN type, the join key, the year filter, and the sort direction.',
    },
    step2: {
      subtitle: 'Evaluate an SQL Script',
      instructions: 'Answer the following question.',
      question: 'Does this query meet all the requirements?',
      sqlCode: `-- Join customers with their 2024 orders, newest first\nSELECT c.customer_name, c.email, o.order_id, o.order_date, o.total_amount\nFROM customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id\nWHERE YEAR(o.order_date) = 2024\nORDER BY o.order_date DESC;`,
      options: [
        { id: 'A', text: 'Yes, it meets all requirements' },
        { id: 'B', text: 'No, it uses the wrong JOIN type' },
        { id: 'C', text: 'No, it is missing the date filter' },
        { id: 'D', text: 'No, the sort order is wrong' },
      ],
      correctAnswer: 'A',
      hint: 'Check the JOIN type, the ON condition, the WHERE clause year filter, and the ORDER BY direction.',
    },
  },
  {
    id: 4,
    title: 'Find Low-Stock Products',
    course: 'AI Skills for IT Professionals',
    lessonCode: '2.4.3',
    color: '#FFF5E5',
    intro: {
      description:
        'In this activity, you will write an AI prompt to identify products that are below their reorder threshold, and then evaluate whether the generated SQL query is correct.',
      objectives: [
        'Write a prompt that produces a SQL query filtering products by stock level',
        'Evaluate whether the AI-generated query correctly identifies low-stock items',
      ],
    },
    step1: {
      subtitle: 'Fix the Prompt to Find Low-Stock Products',
      instructions: 'Edit the prompt so it meets all requirements, then click Submit.',
      tableColumns: [
        { column: 'product_id', type: 'INT', description: 'Unique product ID' },
        { column: 'product_name', type: 'VARCHAR', description: 'Name of the product' },
        { column: 'category', type: 'VARCHAR', description: 'Product category' },
        { column: 'stock_quantity', type: 'INT', description: 'Current stock level' },
        { column: 'reorder_level', type: 'INT', description: 'Minimum stock before reorder' },
        { column: 'supplier_id', type: 'INT', description: 'Supplier reference' },
      ],
      requirements: [
        'Use SQL',
        'Reference the products table',
        'Select product_name, category, stock_quantity, reorder_level',
        'Filter products where stock_quantity is less than reorder_level',
        'Sort by stock_quantity ascending',
        'Include comments in the query',
      ],
      starterPrompt:
        'Write a SQL query to find products that need to be restocked from the products table. Show product name and stock information.',
      correctPrompt:
        'Write a SQL query that selects product_name, category, stock_quantity, and reorder_level from the products table. Filter to only include rows where stock_quantity is less than reorder_level. Sort the results by stock_quantity ascending so the most critical items appear first. Include comments in the query.',
      hint: 'The prompt does not specify the filter condition (stock_quantity < reorder_level), the exact columns, or the sort order.',
    },
    step2: {
      subtitle: 'Evaluate an SQL Script',
      instructions: 'Answer the following question.',
      question: 'Does this query correctly find low-stock products?',
      sqlCode: `-- Find products below their reorder level, most critical first\nSELECT product_name, category, stock_quantity, reorder_level\nFROM products\nWHERE stock_quantity < reorder_level\nORDER BY stock_quantity ASC;`,
      options: [
        { id: 'A', text: 'Yes, it meets all requirements' },
        { id: 'B', text: 'No, it filters where stock equals reorder level' },
        { id: 'C', text: 'No, the sort order should be descending' },
        { id: 'D', text: 'No, it is missing the category column' },
      ],
      correctAnswer: 'A',
      hint: 'Verify the WHERE condition uses the correct comparison operator and that all required columns are selected.',
    },
  },
  {
    id: 5,
    title: 'Analyze User Login Activity',
    course: 'AI Skills for IT Professionals',
    lessonCode: '2.5.4',
    color: '#FFE5EF',
    intro: {
      description:
        'In this activity, you will write an AI prompt to analyze user login frequency from an activity log, and then evaluate whether the generated SQL query correctly counts and filters login events.',
      objectives: [
        'Write a prompt that generates a SQL query counting login events per user',
        'Evaluate the AI output to confirm it correctly counts, filters, and ranks user activity',
      ],
    },
    step1: {
      subtitle: 'Fix the Prompt to Analyze Login Activity',
      instructions: 'Edit the prompt so it meets all requirements, then click Submit.',
      tableColumns: [
        { column: 'log_id', type: 'INT', description: 'Unique log entry ID' },
        { column: 'user_id', type: 'INT', description: 'User reference ID' },
        { column: 'username', type: 'VARCHAR', description: 'User login name' },
        { column: 'event_type', type: 'VARCHAR', description: "Type of event (e.g. 'login')" },
        { column: 'event_date', type: 'DATE', description: 'Date the event occurred' },
      ],
      requirements: [
        'Use SQL',
        'Reference the user_logs table',
        "Filter for login events only (event_type = 'login')",
        'Group by user_id and username',
        'Count the number of logins as login_count',
        'Only include users with more than 10 logins',
        'Sort by login_count descending',
        'Include comments in the query',
      ],
      starterPrompt:
        'Write a SQL query to find how many times each user has logged in using the user_logs table. Show user information and their login count.',
      correctPrompt:
        "Write a SQL query that selects user_id, username, and the count of login events as login_count from the user_logs table. Filter to only rows where event_type is 'login'. Group by user_id and username. Use HAVING to include only users with more than 10 logins. Sort by login_count descending. Include comments in the query.",
      hint: "The prompt is missing the event_type filter, the HAVING clause for minimum login count, the alias 'login_count', and the comments instruction.",
    },
    step2: {
      subtitle: 'Evaluate an SQL Script',
      instructions: 'Answer the following question.',
      question: 'Does this query correctly analyze login activity?',
      sqlCode: `-- Count logins per user, only users with more than 10 logins\nSELECT user_id, username, COUNT(*) AS login_count\nFROM user_logs\nWHERE event_type = 'login'\nGROUP BY user_id, username\nHAVING COUNT(*) > 10\nORDER BY login_count DESC;`,
      options: [
        { id: 'A', text: 'Yes, it meets all requirements' },
        { id: 'B', text: 'No, it counts all events, not just logins' },
        { id: 'C', text: 'No, it is missing the HAVING clause' },
        { id: 'D', text: 'No, the results are sorted in the wrong direction' },
      ],
      correctAnswer: 'A',
      hint: 'Verify the WHERE filter for event_type, that COUNT is used correctly, the HAVING threshold, and the sort direction.',
    },
  },
];

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────
app.get('/api/scenarios', (req, res) => {
  const summary = scenarios.map(({ id, title, course, lessonCode, color }) => ({
    id, title, course, lessonCode, color,
  }));
  res.json(summary);
});

app.get('/api/scenarios/:id', (req, res) => {
  const scenario = scenarios.find((s) => s.id === parseInt(req.params.id));
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  res.json(scenario);
});

app.post('/api/scenarios/:id/check-prompt', (req, res) => {
  const scenario = scenarios.find((s) => s.id === parseInt(req.params.id));
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });

  const { prompt } = req.body;
  const submitted = (prompt || '').toLowerCase().trim();
  const correct = scenario.step1.correctPrompt.toLowerCase().trim();
  const starter = scenario.step1.starterPrompt.toLowerCase().trim();

  // Check that the submission is longer/different than starter and closer to correct
  const isExpanded = submitted.length > starter.length + 5;

  // Extract key unique words from the correct prompt not in starter
  const starterWords = new Set(starter.split(/\W+/));
  const correctWords = correct.split(/\W+/).filter(w => w.length > 3 && !starterWords.has(w));
  const matchCount = correctWords.filter(w => submitted.includes(w)).length;
  const threshold = Math.max(1, Math.floor(correctWords.length * 0.5));

  if (isExpanded && matchCount >= threshold) {
    res.json({ correct: true, feedback: 'Great work! Your prompt now includes all the required details.' });
  } else {
    res.json({
      correct: false,
      feedback: 'Review the requirements list carefully. Make sure your prompt explicitly mentions all missing details.',
    });
  }
});

app.post('/api/scenarios/:id/check-answer', (req, res) => {
  const scenario = scenarios.find((s) => s.id === parseInt(req.params.id));
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });

  const { answer } = req.body;
  const correct = answer === scenario.step2.correctAnswer;
  res.json({
    correct,
    correctAnswer: scenario.step2.correctAnswer,
    feedback: correct
      ? 'Correct! The SQL query meets all the requirements.'
      : `Incorrect. The correct answer is ${scenario.step2.correctAnswer}. Review the SQL carefully against each requirement.`,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Simulation Lab backend running on http://localhost:${PORT}`);
});
