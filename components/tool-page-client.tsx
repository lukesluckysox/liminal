'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface ToolConfig {
  slug: string;
  name: string;
  tagline: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputFieldName: string;
  isTextarea?: boolean;
  minLength?: number;
  submitLabel?: string;
  processingLabel?: string;
  accentHue?: string;
  preamble?: ReactNode;
}

interface ToolPageClientProps {
  config: ToolConfig;
}

export function ToolPageClient({ config }: ToolPageClientProps) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const minLen = config.minLength ?? 10;
  const accent = config.accentHue ?? 'var(--color-gold)';
  const accentRgb = accent.startsWith('var') ? 'var(--color-gold)' : `rgb(${accent})`;
  const accentAlpha = (a: number) =>
    accent.startsWith('var')
      ? `rgb(var(--color-gold) / ${a})`
      : `rgb(${accent} / ${a})`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input.trim().length < minLen) {
      setError(`Please provide more detail (at least ${minLen} characters).`);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const body: Record<string, string> = {};
      body[config.inputFieldName] = input.trim();

      const res = await fetch(`/api/tools/${config.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      router.push(`/session/${data.sessionId}`);
    } catch {
      setError('A network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 5vw, 5rem) 1.5rem',
      }}
    >
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem' }} aria-label="Breadcrumb">
        <Link
          href="/"
          style={{
            fontSize: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.8125rem)',
            color: 'rgb(var(--color-text-faint))',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          ← All instruments
        </Link>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
        <div
          style={{
            width: '28px',
            height: '2px',
            background: accentRgb,
            opacity: 0.7,
            borderRadius: '1px',
            marginBottom: '1.25rem',
          }}
          aria-hidden="true"
        />
        <h1
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgb(var(--color-text))',
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}
        >
          {config.name}
        </h1>
        <p
          style={{
            fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
            color: accentAlpha(0.85),
            fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}
        >
          {config.tagline}
        </p>
      </header>

      {/* Optional preamble */}
      {config.preamble && (
        <div style={{ marginBottom: '2rem' }}>{config.preamble}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="tool-input"
            style={{
              display: 'block',
              fontSize: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.8125rem)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgb(var(--color-text-muted))',
              marginBottom: '0.625rem',
            }}
          >
            {config.inputLabel}
          </label>

          {config.isTextarea !== false ? (
            <textarea
              id="tool-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={config.inputPlaceholder}
              disabled={loading}
              rows={8}
              className="liminal-input"
              style={{ resize: 'vertical', minHeight: '180px' }}
            />
          ) : (
            <input
              id="tool-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={config.inputPlaceholder}
              disabled={loading}
              className="liminal-input"
            />
          )}

          {/* Character count hint */}
          <div
            style={{
              marginTop: '0.375rem',
              textAlign: 'right',
              fontSize: '0.75rem',
              color:
                input.length < minLen
                  ? 'rgb(var(--color-text-faint))'
                  : accentAlpha(0.6),
            }}
          >
            {input.length} characters
          </div>
        </div>

        {error && (
          <div
            className="inline-error"
            role="alert"
            aria-live="polite"
            style={{ marginBottom: '1.25rem' }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading || input.trim().length < minLen}
          style={{ padding: '0.7rem 2rem' }}
        >
          {loading ? (
            <>
              <div className="spinner" style={{ width: 16, height: 16 }} />
              <span>{config.processingLabel ?? 'Working…'}</span>
            </>
          ) : (
            config.submitLabel ?? 'Submit'
          )}
        </button>
      </form>

      {/* Processing overlay */}
      {loading && (
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgb(var(--color-border) / 0.12)',
            animation: 'fadeSlideUp 0.3s ease both',
          }}
          aria-live="polite"
          aria-label="Processing your request"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.625rem',
            }}
          >
            <div
              className="spinner"
              style={{ width: 16, height: 16, flexShrink: 0 }}
            />
            <p
              style={{
                fontSize: 'clamp(0.875rem, 0.8rem + 0.2vw, 0.9375rem)',
                color: 'rgb(var(--color-text-muted))',
                fontStyle: 'italic',
                fontFamily: 'var(--font-display), Georgia, serif',
              }}
            >
              {config.processingLabel ?? 'Working…'}
            </p>
          </div>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgb(var(--color-text-faint))',
              paddingLeft: '1.75rem',
            }}
          >
            This may take 15–45 seconds.
          </p>
        </div>
      )}
    </div>
  );
}
