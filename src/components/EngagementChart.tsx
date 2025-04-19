import React, { useEffect, useRef } from 'react';

// This is a simplified chart implementation
// In a real application, you would use a charting library like Chart.js or Recharts
const EngagementChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Sample data for the chart
    const postsData = [12, 19, 11, 15, 20, 18, 22];
    const commentsData = [8, 15, 9, 12, 17, 14, 16];
    const likesData = [20, 35, 30, 40, 38, 45, 50];
    
    // Canvas setup
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw chart
    const drawChart = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const padding = 40;
      const chartWidth = width - (padding * 2);
      const chartHeight = height - (padding * 2);
      
      // Draw axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = '#d1d5db';
      ctx.stroke();
      
      // Draw posts line
      drawLine(postsData, '#4f46e5', chartWidth, chartHeight, padding);
      
      // Draw comments line
      drawLine(commentsData, '#10b981', chartWidth, chartHeight, padding);
      
      // Draw likes line
      drawLine(likesData, '#f97316', chartWidth, chartHeight, padding);
      
      // Draw legend - passing padding as an argument
      drawLegend(padding);
    };
    
    const drawLine = (data: number[], color: string, chartWidth: number, chartHeight: number, padding: number) => {
      if (!ctx) return;
      
      const max = Math.max(...postsData, ...commentsData, ...likesData);
      const xStep = chartWidth / (data.length - 1);
      
      ctx.beginPath();
      data.forEach((value, index) => {
        const x = padding + (index * xStep);
        const y = padding + chartHeight - ((value / max) * chartHeight);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        // Draw points
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    
    const drawLegend = (padding: number) => {
      if (!ctx) return;
      
      const legends = [
        { label: 'Posts', color: '#4f46e5' },
        { label: 'Comments', color: '#10b981' },
        { label: 'Likes', color: '#f97316' }
      ];
      
      let xPos = padding;
      const yPos = 20;
      
      legends.forEach(legend => {
        // Draw colored square
        ctx.fillStyle = legend.color;
        ctx.fillRect(xPos, yPos, 12, 12);
        
        // Draw label
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.fillText(legend.label, xPos + 16, yPos + 10);
        
        xPos += 100;
      });
    };
    
    // Initial draw
    drawChart();
    
    // Redraw on resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawChart();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-64"
    />
  );
};

export default EngagementChart;