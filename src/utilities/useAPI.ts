// useAPI.ts
import { useState } from 'react';

export const useAPI = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [originality, setOriginality] = useState<number>();
  const [corpus, setCorpus] = useState<string>('');

  const apiRequest = async () => {
    const message = question;
    const max_tokens = 4096;

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, model, originality, max_tokens, corpus }),
      });
      const answerResponse = await response.json();
      setAnswer(answerResponse.content);
    } catch (error) {
      setAnswer('Server niet bereikbaar: ' + error);
      console.error(error);
    }
  };

  const updateRequest = (question: string, model: string, originality: number, corpus: string) => {
    setQuestion(question);
    setModel(model);
    setOriginality(originality);
    setCorpus(corpus);
    setAnswer('');
  };

  return {
    question,
    answer,
    model,
    apiRequest,
    updateRequest,
  };
};
