const sortQuestions = (question) => {
  const shuffle = 0.5; // valor para embaralhar

  const sortedQuestions = [...question.incorrect_answers, question.correct_answer]
    .sort(() => shuffle - Math.random());

  return (
    {
      ...question,
      sortedQuestions,
    }
  );
};

export default sortQuestions;
