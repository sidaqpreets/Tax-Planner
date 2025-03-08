import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Paper, List, ListItem, ListItemText, Box } from '@mui/material';

const TaxPlanner = () => {
  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [taxUpdates, setTaxUpdates] = useState([]);

  const handleBudgetSubmit = () => {
    alert(`Budget set to: ${budget}`);
    // Add logic to save budget
  };

  const handleExpensesSubmit = () => {
    alert(`Expenses set to: ${expenses}`);
    // Add logic to save expenses
  };

  const askChatbot = async () => {
    if (!chatInput) return;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: chatInput }],
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json',
          },
        }
      );
      const reply = response.data.choices[0].message.content;
      setChatMessages([...chatMessages, { role: 'user', content: chatInput }, { role: 'assistant', content: reply }]);
      setChatInput('');
    } catch (error) {
      console.error('Error asking chatbot:', error);
    }
  };

  const fetchTaxUpdates = async () => {
    // Replace with actual tax API endpoint
    const mockUpdates = [
      'New tax amendment: Increased standard deduction limit.',
      'GST rates reduced on essential items.',
    ];
    setTaxUpdates(mockUpdates);
  };

  return (
    <Container>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Tax Planner
      </Typography>

      {/* Budget Input */}
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">Set Your Budget</Typography>
        <TextField
          label="Monthly Budget"
          variant="outlined"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleBudgetSubmit}>
          Submit Budget
        </Button>
      </Paper>

      {/* Expenses Input */}
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">Set Your Expenses</Typography>
        <TextField
          label="Monthly Expenses"
          variant="outlined"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleExpensesSubmit}>
          Submit Expenses
        </Button>
      </Paper>

      {/* Tax Updates */}
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">Recent Tax Updates</Typography>
        <Button variant="outlined" onClick={fetchTaxUpdates}>
          Fetch Updates
        </Button>
        <List>
          {taxUpdates.map((update, index) => (
            <ListItem key={index}>
              <ListItemText primary={update} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* AI Chatbot */}
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">AI Chatbot Assistance</Typography>
        <Box style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
          {chatMessages.map((msg, index) => (
            <Typography key={index} style={{ color: msg.role === 'user' ? 'blue' : 'green' }}>
              <strong>{msg.role === 'user' ? 'You: ' : 'Bot: '}</strong>
              {msg.content}
            </Typography>
          ))}
        </Box>
        <TextField
          label="Ask a question"
          variant="outlined"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={askChatbot}>
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default TaxPlanner;