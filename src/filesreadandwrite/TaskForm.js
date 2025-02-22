import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for styling the form
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const TaskForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    taskDateTime: '',
    taskName: '',
    challengesFaced: '',
    completedDateTime: ''
  });

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send form data to the backend server
    axios.post('http://localhost:5000/submit-form', formData)
      .then(response => {
        console.log(response.data);
        alert('Form data submitted successfully!');
        
        // Update the form with the same data after submission
        setFormData({
          taskDateTime: formData.taskDateTime,
          taskName: formData.taskName,
          challengesFaced: formData.challengesFaced,
          completedDateTime: formData.completedDateTime
        });
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
        alert('There was an error submitting the form.');
      });
  };

  return (
    <FormWrapper>
      <FormTitle>Task Details Form</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="taskDateTime">Task Date and Time:</Label>
          <Input
            type="datetime-local"
            id="taskDateTime"
            name="taskDateTime"
            value={formData.taskDateTime}
            onChange={handleChange}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="taskName">Task Name:</Label>
          <Input
            type="text"
            id="taskName"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="challengesFaced">Challenges Faced:</Label>
          <Textarea
            id="challengesFaced"
            name="challengesFaced"
            value={formData.challengesFaced}
            onChange={handleChange}
            placeholder="Describe challenges faced"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="completedDateTime">Completed Date and Time:</Label>
          <Input
            type="datetime-local"
            id="completedDateTime"
            name="completedDateTime"
            value={formData.completedDateTime}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormWrapper>
  );
};

export default TaskForm;
