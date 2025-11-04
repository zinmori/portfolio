'use client';

import { useEffect } from 'react';
import './terminal.css';
import { TerminalShell } from './TerminalShell';

export default function TerminalPage() {
  useEffect(() => {
    document.body.classList.add('terminal-body');

    return () => {
      document.body.classList.remove('terminal-body');
    };
  }, []);

  return <TerminalShell />;
}
