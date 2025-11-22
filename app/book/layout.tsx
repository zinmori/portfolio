import { crimsonText, homemadeApple } from './fonts';

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${crimsonText.variable} ${homemadeApple.variable} min-h-screen bg-[#2c2c2c] flex items-center justify-center overflow-hidden`}
    >
      <div className="absolute inset-0 bg-[url('/images/wood-texture.jpg')] bg-cover opacity-50 pointer-events-none" />
      {children}
    </div>
  );
}
