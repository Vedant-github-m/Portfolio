'use client';
import { Html, useProgress } from '@react-three/drei';

export function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html
      as='div'
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span style={{
        fontSize: 14,
        color: '#F1F1F1',
        fontWeight: 800,
        marginTop: 40,
      }}>
        {progress.toFixed(2)}%
      </span>
    </Html>
  );
} 