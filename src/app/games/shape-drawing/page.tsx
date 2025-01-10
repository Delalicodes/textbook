'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaUndo, FaEraser, FaPencilAlt } from 'react-icons/fa';

export default function ShapeDrawingPractice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentShape, setCurrentShape] = useState<string>('square');
  const [guidelineOpacity, setGuidelineOpacity] = useState(0.2);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        setContext(ctx);
        drawGuidelines(ctx);
      }
    }
  }, [currentShape]);

  const drawGuidelines = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.globalAlpha = guidelineOpacity;
    ctx.strokeStyle = '#666';
    ctx.setLineDash([5, 5]);

    switch (currentShape) {
      case 'square':
        ctx.strokeRect(150, 100, 200, 200);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(250, 50);
        ctx.lineTo(150, 250);
        ctx.lineTo(350, 250);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(250, 200, 100, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 'rectangle':
        ctx.strokeRect(100, 150, 300, 150);
        break;
    }

    ctx.restore();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.beginPath();
      context.moveTo(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    context.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawGuidelines(context);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          href="/chapters"
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Chapters
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Drawing Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shape Drawing Practice</h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <select
                value={currentShape}
                onChange={(e) => setCurrentShape(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="square">Square</option>
                <option value="circle">Circle</option>
                <option value="triangle">Triangle</option>
                <option value="rectangle">Rectangle</option>
              </select>
              <button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaEraser /> Clear
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Guide Opacity:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={guidelineOpacity}
                onChange={(e) => {
                  setGuidelineOpacity(parseFloat(e.target.value));
                  if (context) drawGuidelines(context);
                }}
                className="w-32"
              />
            </div>
          </div>
        </div>

        {/* Drawing Canvas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full border border-gray-200 rounded-lg cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
          <p className="mt-4 text-gray-600 text-center">
            Try to trace the dotted shape guideline. Use the slider to adjust the guide visibility.
          </p>
        </div>
      </div>
    </div>
  );
} 