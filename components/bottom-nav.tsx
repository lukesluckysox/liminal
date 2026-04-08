'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Zap, BookOpen, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'home', Icon: Home },
  { href: '/tool/small-council', label: 'council', Icon: Users },
  { href: '/tool/fool', label: 'fool', Icon: Zap },
  { href: '/archive', label: 'archive', Icon: BookOpen },
  { href: '/account', label: 'account', Icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderTop: '1px solid rgb(var(--color-border) / 0.15)',
        background: 'rgb(var(--color-bg) / 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className="md:hidden"
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'stretch',
        }}
      >
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.125rem',
                padding: '0.625rem 0.75rem',
                minHeight: '44px',
                textDecoration: 'none',
                color: isActive
                  ? 'rgb(var(--color-text))'
                  : 'rgb(var(--color-text-faint))',
                opacity: isActive ? 1 : 0.4,
                transition: 'opacity 0.15s ease, color 0.15s ease',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Icon
                style={{ width: '18px', height: '18px', flexShrink: 0 }}
                strokeWidth={1.5}
              />
              <span
                style={{
                  fontSize: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.04em',
                  textTransform: 'lowercase',
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
