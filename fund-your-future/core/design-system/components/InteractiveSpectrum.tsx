/**
 * InteractiveSpectrum - Design System Component
 * Triangular interactive response spectrum for psychological/emotional mapping
 * Based on Unit 3 ResponseSpectrum component
 */

'use client';

import React, { useState } from 'react';
import { cn } from '../utils/classNames';
import { ContentBox } from './ContentBox';
import { UnifiedHeading } from './UnifiedHeading';
import { Text } from './Text';
import { Layout, Grid } from './Layout';

export interface SpectrumResponse {
  x: number;
  y: number;
  type: string;
}

export interface InteractiveSpectrumProps {
  /** Callback when user selects a response */
  onResponseSelect: (response: SpectrumResponse) => void;

  /** Currently selected response */
  selectedResponse?: SpectrumResponse | null;

  /** Title for the spectrum */
  title?: string;

  /** Instructions text */
  instructions?: string;

  /** Spectrum corner labels */
  corners?: {
    top: { label: string; icon: string; color: string };
    bottomLeft: { label: string; icon: string; color: string };
    bottomRight: { label: string; icon: string; color: string };
  };

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Layout variant - compact puts definitions beside triangle */
  layout?: 'default' | 'compact';

  /** Additional CSS classes */
  className?: string;
}

/**
 * Default corner configuration for psychological response spectrum
 */
const defaultCorners = {
  top: { label: 'Hypervigilance', icon: '⚡', color: 'blue' },
  bottomLeft: { label: 'Non-participation', icon: '🚪', color: 'orange' },
  bottomRight: { label: 'Self-blame', icon: '😔', color: 'red' }
};

/**
 * Size configurations
 */
const sizeConfigs = {
  sm: { width: 320, height: 256, viewBox: '0 0 320 256' },
  md: { width: 400, height: 320, viewBox: '0 0 400 320' },
  lg: { width: 480, height: 384, viewBox: '0 0 480 384' }
};

/**
 * Color mappings for semantic corners
 */
const colorMappings = {
  blue: {
    fill: 'fill-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-700',
    accent: 'text-blue-600'
  },
  orange: {
    fill: 'fill-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-400',
    text: 'text-orange-700',
    accent: 'text-orange-600'
  },
  red: {
    fill: 'fill-red-700',
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-700',
    accent: 'text-red-600'
  },
  green: {
    fill: 'fill-green-700',
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-700',
    accent: 'text-green-600'
  }
};

export function InteractiveSpectrum({
  onResponseSelect,
  selectedResponse,
  title = 'Response Spectrum',
  instructions = 'Click anywhere inside the triangle to plot your response',
  corners = defaultCorners,
  size = 'md',
  layout = 'default',
  className,
  ...props
}: InteractiveSpectrumProps) {
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(
    selectedResponse ? { x: selectedResponse.x, y: selectedResponse.y } : null
  );

  const config = sizeConfigs[size];
  const scale = config.width / 400; // Scale factor for coordinate conversion

  // Triangle vertices (scaled)
  const vertices = {
    top: { x: 200 * scale, y: 40 * scale },
    bottomLeft: { x: 60 * scale, y: 280 * scale },
    bottomRight: { x: 340 * scale, y: 280 * scale }
  };

  const handleTriangleClick = (event: React.MouseEvent<SVGElement>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * config.width;
    const y = ((event.clientY - rect.top) / rect.height) * config.height;

    // Check if click is within triangle bounds
    const isInsideTriangle = isPointInTriangle(x, y);

    if (isInsideTriangle) {
      // Convert to normalized coordinates for storage
      const normalizedX = x / scale;
      const normalizedY = y / scale;
      setClickPosition({ x: normalizedX, y: normalizedY });

      // Determine response type based on position
      const responseType = getResponseType(x, y);
      onResponseSelect({
        x: normalizedX,
        y: normalizedY,
        type: responseType
      });
    }
  };

  const isPointInTriangle = (x: number, y: number): boolean => {
    const { top, bottomLeft, bottomRight } = vertices;

    const denominator = ((bottomLeft.y - bottomRight.y) * (top.x - bottomRight.x) +
                        (bottomRight.x - bottomLeft.x) * (top.y - bottomRight.y));
    const a = ((bottomLeft.y - bottomRight.y) * (x - bottomRight.x) +
               (bottomRight.x - bottomLeft.x) * (y - bottomRight.y)) / denominator;
    const b = ((bottomRight.y - top.y) * (x - bottomRight.x) +
               (top.x - bottomRight.x) * (y - bottomRight.y)) / denominator;
    const c = 1 - a - b;

    return a >= 0 && b >= 0 && c >= 0;
  };

  const getResponseType = (x: number, y: number): string => {
    const { top, bottomLeft, bottomRight } = vertices;

    const distances = [
      { type: corners.top.label, dist: Math.sqrt(Math.pow(x - top.x, 2) + Math.pow(y - top.y, 2)) },
      { type: corners.bottomLeft.label, dist: Math.sqrt(Math.pow(x - bottomLeft.x, 2) + Math.pow(y - bottomLeft.y, 2)) },
      { type: corners.bottomRight.label, dist: Math.sqrt(Math.pow(x - bottomRight.x, 2) + Math.pow(y - bottomRight.y, 2)) }
    ];

    return distances.reduce((prev, current) => (prev.dist < current.dist) ? prev : current).type;
  };

  if (layout === 'compact') {
    return (
      <ContentBox variant="callout" semantic="neutral" className={cn('space-y-4', className)} {...props}>
        {/* Header */}
        <Layout spacing="sm" align="center">
          <UnifiedHeading variant="section" level="h3">
            {title}
          </UnifiedHeading>
          <Text variant="small" semantic="muted">
            {instructions}
          </Text>
        </Layout>

        {/* Main compact layout: Triangle + Definitions side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Interactive Triangle */}
          <div className="flex justify-center">
            <svg
              width={config.width}
              height={config.height}
              className="cursor-pointer border border-gray-300 rounded-lg shadow-sm bg-gray-50"
              onClick={handleTriangleClick}
              viewBox={config.viewBox}
            >
              {/* Background gradient */}
              <defs>
                <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.04)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
                </linearGradient>
              </defs>

              {/* Triangle outline */}
              <polygon
                points={`${vertices.top.x},${vertices.top.y} ${vertices.bottomLeft.x},${vertices.bottomLeft.y} ${vertices.bottomRight.x},${vertices.bottomRight.y}`}
                fill="url(#triangleGradient)"
                stroke="#3B82F6"
                strokeWidth="3"
                className="drop-shadow-sm"
              />

              {/* Corner labels */}
              <g>
                <rect
                  x={vertices.top.x - 60 * scale}
                  y={vertices.top.y - 25 * scale}
                  width={120 * scale}
                  height={20 * scale}
                  fill="rgba(255,255,255,0.9)"
                  rx="4"
                />
                <text
                  x={vertices.top.x}
                  y={vertices.top.y - 12 * scale}
                  textAnchor="middle"
                  className={cn('text-sm font-semibold', colorMappings[corners.top.color as keyof typeof colorMappings]?.fill)}
                >
                  {corners.top.icon} {corners.top.label}
                </text>
              </g>

              <g>
                <rect
                  x={vertices.bottomLeft.x - 65 * scale}
                  y={vertices.bottomLeft.y + 10 * scale}
                  width={130 * scale}
                  height={20 * scale}
                  fill="rgba(255,255,255,0.9)"
                  rx="4"
                />
                <text
                  x={vertices.bottomLeft.x}
                  y={vertices.bottomLeft.y + 23 * scale}
                  textAnchor="middle"
                  className={cn('text-sm font-semibold', colorMappings[corners.bottomLeft.color as keyof typeof colorMappings]?.fill)}
                >
                  {corners.bottomLeft.icon} {corners.bottomLeft.label}
                </text>
              </g>

              <g>
                <rect
                  x={vertices.bottomRight.x - 55 * scale}
                  y={vertices.bottomRight.y + 10 * scale}
                  width={110 * scale}
                  height={20 * scale}
                  fill="rgba(255,255,255,0.9)"
                  rx="4"
                />
                <text
                  x={vertices.bottomRight.x}
                  y={vertices.bottomRight.y + 23 * scale}
                  textAnchor="middle"
                  className={cn('text-sm font-semibold', colorMappings[corners.bottomRight.color as keyof typeof colorMappings]?.fill)}
                >
                  {corners.bottomRight.icon} {corners.bottomRight.label}
                </text>
              </g>

              {/* Guide lines */}
              <line
                x1={vertices.top.x} y1={vertices.top.y}
                x2={vertices.top.x} y2={vertices.bottomLeft.y}
                stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
              />
              <line
                x1={vertices.bottomLeft.x} y1={vertices.bottomLeft.y}
                x2={vertices.bottomRight.x} y2={vertices.bottomRight.y}
                stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
              />
              <line
                x1={vertices.bottomLeft.x} y1={vertices.bottomLeft.y}
                x2={vertices.top.x} y2={vertices.top.y}
                stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
              />
              <line
                x1={vertices.bottomRight.x} y1={vertices.bottomRight.y}
                x2={vertices.top.x} y2={vertices.top.y}
                stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
              />

              {/* User's click position */}
              {clickPosition && (
                <circle
                  cx={clickPosition.x * scale}
                  cy={clickPosition.y * scale}
                  r={12 * scale}
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="3"
                  className="drop-shadow-md"
                />
              )}
            </svg>
          </div>

          {/* Response explanations - beside triangle */}
          <div className="space-y-3">
            <ContentBox
              variant="callout"
              semantic={corners.top.color as any}
              border="accent"
              size="sm"
            >
              <UnifiedHeading variant="section" level="h4" semantic={corners.top.color as any}>
                {corners.top.icon} {corners.top.label}
              </UnifiedHeading>
              <Text variant="small" semantic={corners.top.color as any}>
                Dedicating more time and effort than usual to stay on top of things
              </Text>
            </ContentBox>

            <ContentBox
              variant="callout"
              semantic={corners.bottomLeft.color as any}
              border="accent"
              size="sm"
            >
              <UnifiedHeading variant="section" level="h4" semantic={corners.bottomLeft.color as any}>
                {corners.bottomLeft.icon} {corners.bottomLeft.label}
              </UnifiedHeading>
              <Text variant="small" semantic={corners.bottomLeft.color as any}>
                Retreating and removing yourself from participating
              </Text>
            </ContentBox>

            <ContentBox
              variant="callout"
              semantic={corners.bottomRight.color as any}
              border="accent"
              size="sm"
            >
              <UnifiedHeading variant="section" level="h4" semantic={corners.bottomRight.color as any}>
                {corners.bottomRight.icon} {corners.bottomRight.label}
              </UnifiedHeading>
              <Text variant="small" semantic={corners.bottomRight.color as any}>
                Thinking you are to blame when experiencing harm
              </Text>
            </ContentBox>
          </div>
        </div>

        {/* Selected response feedback */}
        {selectedResponse && (
          <ContentBox variant="completion" semantic="success" border="accent">
            <Text semantic="success" weight="medium">
              ✓ Your response: <Text as="span" semantic="success" weight="bold">{selectedResponse.type}</Text>
            </Text>
          </ContentBox>
        )}
      </ContentBox>
    );
  }

  // Default layout (original stacked layout)
  return (
    <ContentBox variant="callout" semantic="neutral" className={cn('space-y-6', className)} {...props}>
      {/* Header */}
      <Layout spacing="sm" align="center">
        <UnifiedHeading variant="section" level="h3">
          {title}
        </UnifiedHeading>
        <Text variant="small" semantic="muted">
          {instructions}
        </Text>
      </Layout>

      {/* Interactive Triangle */}
      <Layout align="center">
        <svg
          width={config.width}
          height={config.height}
          className="cursor-pointer border border-gray-300 rounded-lg shadow-sm bg-gray-50"
          onClick={handleTriangleClick}
          viewBox={config.viewBox}
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.04)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
            </linearGradient>
          </defs>

          {/* Triangle outline */}
          <polygon
            points={`${vertices.top.x},${vertices.top.y} ${vertices.bottomLeft.x},${vertices.bottomLeft.y} ${vertices.bottomRight.x},${vertices.bottomRight.y}`}
            fill="url(#triangleGradient)"
            stroke="#3B82F6"
            strokeWidth="3"
            className="drop-shadow-sm"
          />

          {/* Corner labels */}
          <g>
            <rect
              x={vertices.top.x - 60 * scale}
              y={vertices.top.y - 25 * scale}
              width={120 * scale}
              height={20 * scale}
              fill="rgba(255,255,255,0.9)"
              rx="4"
            />
            <text
              x={vertices.top.x}
              y={vertices.top.y - 12 * scale}
              textAnchor="middle"
              className={cn('text-sm font-semibold', colorMappings[corners.top.color as keyof typeof colorMappings]?.fill)}
            >
              {corners.top.icon} {corners.top.label}
            </text>
          </g>

          <g>
            <rect
              x={vertices.bottomLeft.x - 65 * scale}
              y={vertices.bottomLeft.y + 10 * scale}
              width={130 * scale}
              height={20 * scale}
              fill="rgba(255,255,255,0.9)"
              rx="4"
            />
            <text
              x={vertices.bottomLeft.x}
              y={vertices.bottomLeft.y + 23 * scale}
              textAnchor="middle"
              className={cn('text-sm font-semibold', colorMappings[corners.bottomLeft.color as keyof typeof colorMappings]?.fill)}
            >
              {corners.bottomLeft.icon} {corners.bottomLeft.label}
            </text>
          </g>

          <g>
            <rect
              x={vertices.bottomRight.x - 55 * scale}
              y={vertices.bottomRight.y + 10 * scale}
              width={110 * scale}
              height={20 * scale}
              fill="rgba(255,255,255,0.9)"
              rx="4"
            />
            <text
              x={vertices.bottomRight.x}
              y={vertices.bottomRight.y + 23 * scale}
              textAnchor="middle"
              className={cn('text-sm font-semibold', colorMappings[corners.bottomRight.color as keyof typeof colorMappings]?.fill)}
            >
              {corners.bottomRight.icon} {corners.bottomRight.label}
            </text>
          </g>

          {/* Guide lines */}
          <line
            x1={vertices.top.x} y1={vertices.top.y}
            x2={vertices.top.x} y2={vertices.bottomLeft.y}
            stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
          />
          <line
            x1={vertices.bottomLeft.x} y1={vertices.bottomLeft.y}
            x2={vertices.bottomRight.x} y2={vertices.bottomRight.y}
            stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
          />
          <line
            x1={vertices.bottomLeft.x} y1={vertices.bottomLeft.y}
            x2={vertices.top.x} y2={vertices.top.y}
            stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
          />
          <line
            x1={vertices.bottomRight.x} y1={vertices.bottomRight.y}
            x2={vertices.top.x} y2={vertices.top.y}
            stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
          />

          {/* User's click position */}
          {clickPosition && (
            <circle
              cx={clickPosition.x * scale}
              cy={clickPosition.y * scale}
              r={12 * scale}
              fill="#3B82F6"
              stroke="white"
              strokeWidth="3"
              className="drop-shadow-md"
            />
          )}
        </svg>
      </Layout>

      {/* Response explanations */}
      <Grid cols={3} spacing="sm">
        <ContentBox
          variant="callout"
          semantic={corners.top.color as any}
          border="accent"
        >
          <UnifiedHeading variant="section" level="h4" semantic={corners.top.color as any}>
            {corners.top.icon} {corners.top.label}
          </UnifiedHeading>
          <Text variant="small" semantic={corners.top.color as any}>
            Dedicating more time and effort than usual to stay on top of things
          </Text>
        </ContentBox>

        <ContentBox
          variant="callout"
          semantic={corners.bottomLeft.color as any}
          border="accent"
        >
          <UnifiedHeading variant="section" level="h4" semantic={corners.bottomLeft.color as any}>
            {corners.bottomLeft.icon} {corners.bottomLeft.label}
          </UnifiedHeading>
          <Text variant="small" semantic={corners.bottomLeft.color as any}>
            Retreating and removing yourself from participating
          </Text>
        </ContentBox>

        <ContentBox
          variant="callout"
          semantic={corners.bottomRight.color as any}
          border="accent"
        >
          <UnifiedHeading variant="section" level="h4" semantic={corners.bottomRight.color as any}>
            {corners.bottomRight.icon} {corners.bottomRight.label}
          </UnifiedHeading>
          <Text variant="small" semantic={corners.bottomRight.color as any}>
            Thinking you are to blame when experiencing harm
          </Text>
        </ContentBox>
      </Grid>

      {/* Selected response feedback */}
      {selectedResponse && (
        <ContentBox variant="completion" semantic="success" border="accent">
          <Text semantic="success" weight="medium">
            ✓ Your response: <Text as="span" semantic="success" weight="bold">{selectedResponse.type}</Text>
          </Text>
        </ContentBox>
      )}
    </ContentBox>
  );
}

// Export types (already exported at top of file)