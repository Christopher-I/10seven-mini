/**
 * Interactive Triangular Response Spectrum
 * Allows users to plot their response on the participatory style spectrum
 */

'use client';

import React, { useState } from 'react';

interface ResponseSpectrumProps {
  onResponseSelect: (response: { x: number; y: number; type: string }) => void;
  selectedResponse?: { x: number; y: number; type: string } | null;
}

export function ResponseSpectrum({ onResponseSelect, selectedResponse }: ResponseSpectrumProps) {
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(
    selectedResponse ? { x: selectedResponse.x, y: selectedResponse.y } : null
  );

  const handleTriangleClick = (event: React.MouseEvent<SVGElement>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 400;
    const y = ((event.clientY - rect.top) / rect.height) * 320;

    // Check if click is within triangle bounds
    const isInsideTriangle = isPointInTriangle(x, y);

    if (isInsideTriangle) {
      // Convert back to original coordinates for storage
      const originalX = x * (300/400);
      const originalY = y * (260/320);
      setClickPosition({ x: originalX, y: originalY });

      // Determine which response type based on position
      const responseType = getResponseType(x, y);
      onResponseSelect({ x: originalX, y: originalY, type: responseType });
    }
  };

  const isPointInTriangle = (x: number, y: number): boolean => {
    // Triangle vertices updated for new dimensions: top (200, 40), bottom-left (60, 280), bottom-right (340, 280)
    const x1 = 200, y1 = 40;  // Hypervigilance (top)
    const x2 = 60, y2 = 280;  // Non-participation (bottom-left)
    const x3 = 340, y3 = 280; // Self-blame (bottom-right)

    const denominator = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
    const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
    const c = 1 - a - b;

    return a >= 0 && b >= 0 && c >= 0;
  };

  const getResponseType = (x: number, y: number): string => {
    // Determine which corner is closest using updated coordinates
    const distances = [
      { type: 'Hypervigilance', dist: Math.sqrt(Math.pow(x - 200, 2) + Math.pow(y - 40, 2)) },
      { type: 'Non-participation', dist: Math.sqrt(Math.pow(x - 60, 2) + Math.pow(y - 280, 2)) },
      { type: 'Self-blame', dist: Math.sqrt(Math.pow(x - 340, 2) + Math.pow(y - 280, 2)) }
    ];

    return distances.reduce((prev, current) => (prev.dist < current.dist) ? prev : current).type;
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Response Spectrum
        </h3>
        <p className="text-sm text-gray-600">
          Click anywhere inside the triangle to plot your response
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <svg
          width="400"
          height="320"
          className="cursor-pointer border border-gray-300 rounded-lg shadow-sm bg-gray-50"
          onClick={handleTriangleClick}
          viewBox="0 0 400 320"
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.04)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
            </linearGradient>
          </defs>

          {/* Triangle outline with better positioning */}
          <polygon
            points="200,40 60,280 340,280"
            fill="url(#triangleGradient)"
            stroke="#3B82F6"
            strokeWidth="3"
            className="drop-shadow-sm"
          />

          {/* Corner labels with better positioning and background */}
          <g>
            <rect x="140" y="15" width="120" height="20" fill="rgba(255,255,255,0.9)" rx="4" />
            <text x="200" y="28" textAnchor="middle" className="text-sm font-semibold fill-blue-700">
              ⚡ Hypervigilance
            </text>
          </g>

          <g>
            <rect x="15" y="290" width="130" height="20" fill="rgba(255,255,255,0.9)" rx="4" />
            <text x="80" y="303" textAnchor="middle" className="text-sm font-semibold fill-orange-700">
              🚪 Non-participation
            </text>
          </g>

          <g>
            <rect x="275" y="290" width="110" height="20" fill="rgba(255,255,255,0.9)" rx="4" />
            <text x="330" y="303" textAnchor="middle" className="text-sm font-semibold fill-red-700">
              😔 Self-blame
            </text>
          </g>

          {/* Subtle guide lines */}
          <line x1="200" y1="40" x2="200" y2="280" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
          <line x1="60" y1="280" x2="340" y2="280" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
          <line x1="60" y1="280" x2="200" y2="40" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
          <line x1="340" y1="280" x2="200" y2="40" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>

          {/* User's click position with enhanced styling */}
          {clickPosition && (
            <circle
              cx={clickPosition.x * (400/300)}
              cy={clickPosition.y * (320/260)}
              r="12"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="3"
              className="drop-shadow-md"
            />
          )}
        </svg>
      </div>

      {/* Response explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-700 mb-2">⚡ Hypervigilance</h4>
          <p className="text-blue-600 leading-relaxed">Dedicating more time and effort than usual to stay on top of things</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-700 mb-2">🚪 Non-participation</h4>
          <p className="text-orange-600 leading-relaxed">Retreating and removing yourself from participating</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <h4 className="font-semibold text-red-700 mb-2">😔 Self-blame</h4>
          <p className="text-red-600 leading-relaxed">Thinking you are to blame when experiencing harm</p>
        </div>
      </div>

      {selectedResponse && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
          <p className="text-green-800 font-medium">
            ✓ Your response: <span className="font-semibold">{selectedResponse.type}</span>
          </p>
        </div>
      )}
    </div>
  );
}