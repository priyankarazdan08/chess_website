import React, { useState } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  background-color: #353941;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  color: #f0f0f0;
  max-width: 300px;
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Option = styled.div`
  margin-bottom: 10px;
  input {
    margin-right: 10px;
  }
`;

const SubmitButton = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #a8caff;
  }
  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const SurveyWidget = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const options = [
    "Chess.com",
    "Lichess",
    "Chess24",
    "I do not use a chess platform"
  ];

  const handleOptionChange = (event) => { // js an event handler that changes whats checked depending on whats clicked
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const handleSubmit = (event) => { // event handler if button is clicked
    event.preventDefault();
    setIsSubmitted(true); 
  };

  return (
    <WidgetContainer>
      <form onSubmit={handleSubmit}> {/* all code comes together here */}
        <QuestionTitle>What chess websites do you regularly use?</QuestionTitle>
        {options.map((option, index) => (
          <Option key={index}>
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleOptionChange}
                disabled={isSubmitted}
              />
              {option}
            </label>
          </Option>
        ))}
        <SubmitButton type="submit" disabled={isSubmitted}> {/* sets the disable */ }
          {isSubmitted ? "Submitted" : "Submit"} 
        </SubmitButton> 
      </form>
    </WidgetContainer>
  );
};

export default SurveyWidget;