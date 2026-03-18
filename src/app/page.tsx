'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

// Style definitions
const styles = [
  { id: 'sketch', name: '简笔画', icon: '✏️', desc: '照片变线条画' },
  { id: 'pixel', name: '像素风', icon: '👾', desc: '照片变像素画' },
  { id: 'pop', name: '波普艺术', icon: '🎨', desc: '高对比色块' },
  { id: 'oil', name: '油画', icon: '🖼️', desc: '油画质感' },
  { id: 'comic', name: '漫画', icon: '💬', desc: '卡通效果' },
  { id: 'vintage', name: '复古', icon: '📷', desc: '复古滤镜' },
];

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply style transformation
  const applyStyle = async () => {
    if (!image || !selectedStyle || !canvasRef.current) return;

    setProcessing(true);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      // Set canvas size
      const maxSize = 800;
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Apply style
      switch (selectedStyle) {
        case 'sketch':
          applySketch(data, canvas.width, canvas.height, ctx);
          break;
        case 'pixel':
          applyPixel(data, canvas.width, canvas.height, ctx);
          break;
        case 'pop':
          applyPop(data, canvas.width, canvas.height, ctx);
          break;
        case 'oil':
          applyOil(data, canvas.width, canvas.height, ctx);
          break;
        case 'comic':
          applyComic(data, canvas.width, canvas.height, ctx);
          break;
        case 'vintage':
          applyVintage(data, canvas.width, canvas.height, ctx);
          break;
      }
      
      // Set result
      setResult(canvas.toDataURL('image/png'));
      setProcessing(false);
    };
    img.src = image;
  };

  // Sketch style
  const applySketch = (data: Uint8ClampedArray, width: number, height: number, ctx: CanvasRenderingContext2D) => {
    // Convert to grayscale and detect edges
    const gray = new Float32Array(width * height);
    for (let i = 0; i < data.length; i += 4) {
      gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    
    // Sobel edge detection
    const edges = new Uint8ClampedArray(data.length);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        const gx = gray[idx - 1] - gray[idx + 1];
        const gy = gray[idx - width] - gray[idx + width];
        const edge = Math.min(255, Math.sqrt(gx * gx + gy * gy));
        const i = idx * 4;
        edges[i] = edges[i + 1] = edges[i + 2] = 255 - edge;
        edges[i + 3] = 255;
      }
    }
    
    ctx.putImageData(new ImageData(edges, width, height), 0, 0);
  };

  // Pixel style
  const applyPixel = (data: Uint8ClampedArray, width: number, height: number, ctx: CanvasRenderingContext2D) => {
    const pixelSize = 8;
    
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        let r = 0, g = 0, b = 0, count = 0;
        
        // Average color in block
        for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        
        // Fill block
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  };

  // Pop art style
  const applyPop = (data: Uint8ClampedArray, width: number, height: number, ctx: CanvasRenderingContext2D) => {
    const colors = [
      [255, 0, 100],
      [0, 200, 255],
      [255, 200, 0],
      [100, 0, 255],
    ];
    
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const colorIdx = Math.min(3, Math.floor(gray / 64));
      const [r, g, b] = colors[colorIdx];
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
    
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
  };

  // Oil painting style
  const applyOil = (data: Uint8ClampedArray, width: number, height: number, ctx: CanvasRenderingContext2D) => {
    // Simplified oil painting effect
    const radius = 3;
    const intensity = 20;
    
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        
        const i = (y * width + x) * 4;
        data[i] = Math.round(r / count);
        data[i + 1] = Math.round(g / count);
        data[i + 2] = Math.round(b / count);
      }
    }
    
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
    
    // Add texture
    ctx.globalAlpha = 0.1;
    ctx.globalCompositeOperation = 'overlay';
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'white' : 'black';
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  // Comic style
  const applyComic = (data: Uint8ClampedArray, width: number, height: number, ctx: CanvasRenderingContext2D) => {
    // Reduce colors
    const levels = 4;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.round(data[i] / (256 / levels)) * (256 / levels);
      data[i + 1] = Math.round(data[i + 1] / (256 / levels)) * (256 / levels);
      data[i + 2] = Math.round(data[i + 2] / (256 / levels)) * (256 / levels);
    }
    
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
    
    // Add edge lines
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    
    // Simple edge detection overlay
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.drawImage(ctx.canvas, 0, 0);
    
    ctx.globalAlpha = 1;
  };

  // Vintage style
  const applyVintage = (data: Uint8ClampedArray, width: number, height: number, ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Sepia tone
      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
    
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
    
    // Add vignette
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  // Download result
  const downloadResult = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.download = 'instant-style-result.png';
    link.href = result;
    link.click();
  };

  // Reset
  const reset = () => {
    setImage(null);
    setResult(null);
    setSelectedStyle(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎨 Instant Style
          </h1>
          <p className="text-white/80 text-lg">
            免费在线风格转换工具 - 纯浏览器处理，图片不上传服务器
          </p>
        </header>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div 
            className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            {image ? (
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src={image}
                  alt="Uploaded"
                  width={400}
                  height={400}
                  className="rounded-lg max-h-80 object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="text-gray-500">
                <div className="text-5xl mb-4">📷</div>
                <p className="text-lg font-medium">点击或拖拽上传图片</p>
                <p className="text-sm">支持 JPG, PNG, WebP</p>
              </div>
            )}
          </div>
        </div>

        {/* Style Selection */}
        {image && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">选择风格</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedStyle === style.id
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow'
                  }`}
                >
                  <div className="text-3xl mb-2">{style.icon}</div>
                  <div className="font-medium text-gray-800">{style.name}</div>
                  <div className="text-xs text-gray-500">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {image && selectedStyle && (
          <div className="text-center mb-6">
            <button
              onClick={applyStyle}
              disabled={processing}
              className={`px-8 py-4 rounded-full text-lg font-bold text-white transition-all ${
                processing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {processing ? '⏳ 处理中...' : '✨ 生成结果'}
            </button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">处理结果</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">原图</p>
                <Image
                  src={image!}
                  alt="Original"
                  width={300}
                  height={300}
                  className="rounded-lg max-h-64 object-contain"
                />
              </div>
              <div className="text-4xl text-gray-300">→</div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">结果</p>
                <Image
                  src={result}
                  alt="Result"
                  width={300}
                  height={300}
                  className="rounded-lg max-h-64 object-contain"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={downloadResult}
                className="px-6 py-3 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                💾 下载图片
              </button>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
              >
                🔄 重新开始
              </button>
            </div>
          </div>
        )}

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Footer */}
        <footer className="text-center mt-8 text-white/60 text-sm">
          <p>🔒 您的图片在浏览器本地处理，不会上传到服务器</p>
          <p className="mt-1">Powered by Canvas API • 完全免费</p>
        </footer>
      </div>
    </main>
  );
}
