import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'outline-inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline transition-all duration-200 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun-500';

const variants: Record<Variant, string> = {
  primary:
    'bg-sun-500 text-navy-900 hover:bg-sun-400 shadow-cta hover:shadow-[0_14px_40px_-10px_rgba(245,138,10,0.65)] hover:-translate-y-0.5',
  secondary:
    'bg-navy-900 text-white hover:bg-navy-800 shadow-md hover:-translate-y-0.5',
  outline:
    'bg-white text-navy-900 ring-1 ring-navy-200 hover:ring-navy-900 hover:bg-navy-50',
  'outline-inverse':
    'bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20 hover:ring-white',
  ghost:
    'bg-transparent text-navy-900 hover:bg-navy-50',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3.5',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type LinkProps = BaseProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;
type NativeButtonProps = BaseProps & Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: undefined };

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith('tel:') || href.startsWith('sms:') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a href={href} className={cls} {...(rest as ComponentProps<'a'>)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as NativeButtonProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
