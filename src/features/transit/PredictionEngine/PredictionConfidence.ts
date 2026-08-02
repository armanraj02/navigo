export const PredictionConfidence = {
  calculateConfidence: (delayMinutes: number, etaMinutes: number): number => {
    // Confidence degrades with larger ETAs and higher delays
    let confidence = 98;

    // Degrade 2% per delay minute
    confidence -= Math.abs(delayMinutes) * 2.5;

    // Degrade 1% per ETA minute beyond 5 minutes
    if (etaMinutes > 5) {
      confidence -= (etaMinutes - 5) * 1.2;
    }

    return Math.max(35, Math.min(99, Math.round(confidence)));
  },
};
