import { useState } from 'react';
import { Container } from './App.styled';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';

export const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });
  const countTotalFeedback = () =>
    Object.values(state).reduce((x, total) => total + x, 0);
  const countPositiveFeedbackPercentage = total =>
    total ? Math.round((state.good / total) * 100) : 0;
  const onLeaveFeedback = value => {
    setState(state => ({ ...state, [value]: state[value] + 1 }));
  };
  const { good, neutral, bad } = state;
  const total = countTotalFeedback();
  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {total ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage(total)}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Container>
  );
};
