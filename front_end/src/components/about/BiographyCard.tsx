import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiographyCardProps {
  longDescriptiveSummary: string;
}

export default function BiographyCard({ longDescriptiveSummary }: BiographyCardProps) {
  // Simple approach: divide into 2-3 paragraphs with complete sentences
  const createParagraphs = (text: string): string[] => {
    // Split by sentence endings (period, exclamation, question mark)
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);
    
    if (sentences.length <= 2) {
      return sentences;
    }
    
    // For 3+ sentences, divide into 2-3 paragraphs
    const totalSentences = sentences.length;
    const sentencesPerParagraph = Math.ceil(totalSentences / 3);
    
    const paragraphs: string[] = [];
    for (let i = 0; i < totalSentences; i += sentencesPerParagraph) {
      const paragraphSentences = sentences.slice(i, i + sentencesPerParagraph);
      paragraphs.push(paragraphSentences.join(' '));
    }
    
    return paragraphs;
  };

  const paragraphs = createParagraphs(longDescriptiveSummary);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold tracking-tight">Profile Summary</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed text-sm">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 