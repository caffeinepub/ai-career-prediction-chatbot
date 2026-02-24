import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CareerPrediction } from '../backend';

export function useGetCareerPrediction() {
  const { actor } = useActor();

  return useMutation<CareerPrediction, Error, string>({
    mutationFn: async (question: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCareerPrediction(question);
    },
  });
}
