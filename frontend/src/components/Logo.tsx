interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32'
  };

  return (
    <img 
      src="/assets/generated/logo.dim_400x400.png" 
      alt="CareerVision AI Logo" 
      className={`${sizeClasses[size]} object-contain`}
    />
  );
}
