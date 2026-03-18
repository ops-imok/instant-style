import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instant Style - 免费在线风格转换工具",
  description: "免费在线风格转换工具，支持简笔画、像素风、波普艺术、油画、漫画、复古等风格，纯浏览器处理，图片不上传服务器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
