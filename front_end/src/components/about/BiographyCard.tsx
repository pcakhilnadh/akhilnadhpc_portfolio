import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiographyCardProps {
  longDescriptiveSummary: string;
}

export default function BiographyCard({ longDescriptiveSummary }: BiographyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {longDescriptiveSummary}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
} 