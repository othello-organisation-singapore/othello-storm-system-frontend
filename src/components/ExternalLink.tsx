import React, { ReactNode } from 'react';

interface ExternalLinkProps {
  to: string;
  children: ReactNode;
}

export default function ExternalLink({ to, children }: ExternalLinkProps) {
  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
