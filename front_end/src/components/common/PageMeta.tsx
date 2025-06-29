import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
}

const PageMeta: React.FC<PageMetaProps> = ({ title, description, keywords }) => {
  const defaultKeywords = "Akhil Nadh PC, Lead Data Scientist, Data Scientist, Machine Learning, AI, Python, Portfolio, Data Science";
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageMeta; 