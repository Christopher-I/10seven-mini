/**
 * Track Section Component
 * Organizes modules into Track 1 and Track 2 sections
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';

export interface TrackSectionProps {
  trackNumber: 1 | 2;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackSection({
  trackNumber,
  title,
  children,
  className
}: TrackSectionProps) {
  return (
    <section className={cn('mb-12', className)}>
      {/* Track Heading with exact design specifications */}
      <h2
        className="mb-6"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: '700',
          fontSize: '32px',
          lineHeight: '130%',
          letterSpacing: '0px',
          color: '#0F2D52'
        }}
      >
        {title}
      </h2>

      {/* Module Cards Grid */}
      <div className="flex flex-wrap justify-between gap-y-5 md:gap-y-8">
        {children}
      </div>
    </section>
  );
}