/**
 * Bootstrap-like responsive grid for React + TypeScript (no dependencies)
 *
 * Components:
 *  - <Container fluid?>: page container with responsive max-widths (or fluid)
 *  - <Row g|gx|gy>: flex row with configurable gutters
 *  - <Col xs|sm|md|lg|xl|xxl offset/order>: responsive columns (1-12, 'auto', or true)
 *
 * Usage:
 *  <Container>
 *    <Row g={3} justify="between" align="start">
 *      <Col md={4}>A</Col>
 *      <Col md={4} lg={3} offsetLg={1}>B</Col>
 *      <Col md>Auto (equal) on md+</Col>
 *    </Row>
 *  </Container>
 */

import { useEffect, type CSSProperties, type PropsWithChildren } from "react";

// ---- Types ----
const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS; // 'xs'|'sm'|'md'|'lg'|'xl'|'xxl'
export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | true;

// ---- Utilities ----
function clsx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(' ');
}

const SPACING: Record<0 | 1 | 2 | 3 | 4 | 5, string> = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
};

// Inject CSS only once per document
const STYLE_ID = 'rg-styles';
function ensureStylesInjected() {
  if (typeof document === 'undefined') return; // SSR safe
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = generateCSS();
  document.head.appendChild(style);
}

// ---- Components ----
export function Container({ fluid, className, style, children, ...rest }: PropsWithChildren<{
  fluid?: boolean;
  className?: string;
  style?: CSSProperties;
}> & React.HTMLAttributes<HTMLDivElement>) {
  useEffect(ensureStylesInjected, []);
  return (
    <div
      className={clsx('rg-container', fluid && 'rg-container-fluid', className)}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Row({
  g,
  gx,
  gy,
  justify,
  align,
  noWrap,
  className,
  style,
  children,
  ...rest
}: PropsWithChildren<{
  /** unified gutter scale 0..5 */
  g?: 0 | 1 | 2 | 3 | 4 | 5;
  /** horizontal gutter scale 0..5 (overrides g) */
  gx?: 0 | 1 | 2 | 3 | 4 | 5;
  /** vertical gutter scale 0..5 (overrides g) */
  gy?: 0 | 1 | 2 | 3 | 4 | 5;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch';
  noWrap?: boolean;
  className?: string;
  style?: CSSProperties;
}> & React.HTMLAttributes<HTMLDivElement>) {
  useEffect(ensureStylesInjected, []);

  const x = gx ?? g ?? 3; // default to 1rem like Bootstrap
  const y = gy ?? g ?? 0;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const cssVars: CSSProperties & Record<string, string> = {
    ...style,
    ['--rg-gutter-x' as any]: SPACING[x],
    ['--rg-gutter-y' as any]: SPACING[y],
  };

  return (
    <div
      className={clsx(
        'rg-row',
        noWrap && 'rg-nowrap',
        justify && `rg-justify-${justify}`,
        align && `rg-align-${align}`,
        className
      )}
      style={cssVars}
      {...rest}
    >
      {children}
    </div>
  );
}

// Helper to create responsive class names like rg-col, rg-col-6, rg-col-md-4, offsets, and order
function buildColClasses(prefix: string, value?: ColSize) {
  if (value === undefined) return undefined;
  if (value === true) return `${prefix}`; // equal-width flex
  if (value === 'auto') return `${prefix}-auto`;
  return `${prefix}-${value}`; // 1..12
}

export type ColProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  xs?: ColSize; // default size (mobile-first)
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offsetSm?: ColProps['offset'];
  offsetMd?: ColProps['offset'];
  offsetLg?: ColProps['offset'];
  offsetXl?: ColProps['offset'];
  offsetXxl?: ColProps['offset'];
  order?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'first' | 'last';
  orderSm?: ColProps['order'];
  orderMd?: ColProps['order'];
  orderLg?: ColProps['order'];
  orderXl?: ColProps['order'];
  orderXxl?: ColProps['order'];
}> & React.HTMLAttributes<HTMLDivElement>;

export function Col({
  className,
  style,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  offset,
  offsetSm,
  offsetMd,
  offsetLg,
  offsetXl,
  offsetXxl,
  order,
  orderSm,
  orderMd,
  orderLg,
  orderXl,
  orderXxl,
  ...rest
}: ColProps) {
  useEffect(ensureStylesInjected, []);

  // Default behavior: if nothing specified, behave like equal-width col
  const base = xs ?? true;

  return (
    <div
      className={clsx(
        'rg-col',
        buildColClasses('rg-col', base),
        buildColClasses('rg-col-sm', sm),
        buildColClasses('rg-col-md', md),
        buildColClasses('rg-col-lg', lg),
        buildColClasses('rg-col-xl', xl),
        buildColClasses('rg-col-xxl', xxl),
        offset !== undefined && `rg-offset-${offset}`,
        offsetSm !== undefined && `rg-offset-sm-${offsetSm}`,
        offsetMd !== undefined && `rg-offset-md-${offsetMd}`,
        offsetLg !== undefined && `rg-offset-lg-${offsetLg}`,
        offsetXl !== undefined && `rg-offset-xl-${offsetXl}`,
        offsetXxl !== undefined && `rg-offset-xxl-${offsetXxl}`,
        order !== undefined && `rg-order-${order}`,
        orderSm !== undefined && `rg-order-sm-${orderSm}`,
        orderMd !== undefined && `rg-order-md-${orderMd}`,
        orderLg !== undefined && `rg-order-lg-${orderLg}`,
        orderXl !== undefined && `rg-order-xl-${orderXl}`,
        orderXxl !== undefined && `rg-order-xxl-${orderXxl}`,
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

// Optional: named export wrapper and default export
// eslint-disable-next-line react-refresh/only-export-components
export const Grid = { Container, Row, Col };
export default Grid;

// ---- CSS Generator ----
function generateCSS() {
  // const bpOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const maxW: Record<Exclude<Breakpoint, 'xs'>, number> = {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
    xxl: 1320,
  } as const;

  const lines: string[] = [];

  // Container
  lines.push(`
  .rg-container { width: 100%; padding-left: 1rem; padding-right: 1rem; margin-left: auto; margin-right: auto; }
  .rg-container-fluid { max-width: none; }
  `);
  // Fixed container max-widths at breakpoints
  (Object.keys(maxW) as Array<Exclude<Breakpoint, 'xs'>>).forEach((bp) => {
    lines.push(`@media (min-width: ${BREAKPOINTS[bp]}px) { .rg-container { max-width: ${maxW[bp]}px; } }`);
  });

  // Row + gutters + alignment
  lines.push(`
  .rg-row { display: flex; flex-wrap: wrap; --rg-gutter-x: 1rem; --rg-gutter-y: 0; margin-left: calc(var(--rg-gutter-x) * -0.5); margin-right: calc(var(--rg-gutter-x) * -0.5); margin-top: calc(var(--rg-gutter-y) * -1); }
  .rg-nowrap { flex-wrap: nowrap; }
  .rg-row > * { padding-left: calc(var(--rg-gutter-x) * 0.5); padding-right: calc(var(--rg-gutter-x) * 0.5); padding-top: var(--rg-gutter-y); }
  .rg-justify-start { justify-content: flex-start; }
  .rg-justify-center { justify-content: center; }
  .rg-justify-end { justify-content: flex-end; }
  .rg-justify-between { justify-content: space-between; }
  .rg-justify-around { justify-content: space-around; }
  .rg-justify-evenly { justify-content: space-evenly; }
  .rg-align-start { align-items: flex-start; }
  .rg-align-center { align-items: center; }
  .rg-align-end { align-items: flex-end; }
  .rg-align-stretch { align-items: stretch; }
  `);

  // Col base
  lines.push(`
  .rg-col { max-width: 100%; }
  .rg-col { flex: 1 0 0; }
  .rg-col-auto { flex: 0 0 auto; width: auto; }
  `);

  // Generate width, offset, order classes for each breakpoint
  function pct(n: number) { return (n / 12) * 100; }

  const genForPrefix = (prefix: string) => {
    for (let i = 1; i <= 12; i++) {
      lines.push(`.${prefix}-${i} { flex: 0 0 auto; width: ${pct(i)}%; }`);
    }
    for (let i = 0; i <= 12; i++) {
      lines.push(`.rg-offset${prefix.startsWith('rg-col') ? prefix.substring(6) : ''}-${i} { margin-left: ${pct(i)}%; }`);
    }
    // orders
    lines.push(`.rg-order${prefix.startsWith('rg-col') ? prefix.substring(6) : ''}-first { order: -1; }`);
    lines.push(`.rg-order${prefix.startsWith('rg-col') ? prefix.substring(6) : ''}-last { order: 13; }`);
    for (let i = 1; i <= 12; i++) {
      lines.push(`.rg-order${prefix.startsWith('rg-col') ? prefix.substring(6) : ''}-${i} { order: ${i}; }`);
    }
  };

  // xs (no media query) uses .rg-col-* and .rg-offset-* and .rg-order-*
  genForPrefix('rg-col');

  // Other breakpoints: .rg-col-sm-*, .rg-offset-sm-*, .rg-order-sm-*
  (['sm', 'md', 'lg', 'xl', 'xxl'] as Exclude<Breakpoint, 'xs'>[]).forEach((bp) => {
    const min = BREAKPOINTS[bp];
    lines.push(`@media (min-width: ${min}px) {`);
    for (let i = 1; i <= 12; i++) {
      lines.push(`  .rg-col-${bp}-${i} { flex: 0 0 auto; width: ${pct(i)}%; }`);
    }
    lines.push(`  .rg-col-${bp}-auto { flex: 0 0 auto; width: auto; }`);
    for (let i = 0; i <= 12; i++) {
      lines.push(`  .rg-offset-${bp}-${i} { margin-left: ${pct(i)}%; }`);
    }
    lines.push(`  .rg-order-${bp}-first { order: -1; }`);
    lines.push(`  .rg-order-${bp}-last { order: 13; }`);
    for (let i = 1; i <= 12; i++) {
      lines.push(`  .rg-order-${bp}-${i} { order: ${i}; }`);
    }
    lines.push('}');
  });

  return lines.join('\n');
}

// ---- Example (remove in production) ----
/*
import { Grid } from './Grid';

export default function Demo() {
  return (
    <Grid.Container>
      <Grid.Row g={3} justify="between" align="start">
        <Grid.Col xs={12} md={6} lg={4}><div className="demo-box">A</div></Grid.Col>
        <Grid.Col xs={12} md={6} lg={4} offsetLg={1}><div className="demo-box">B</div></Grid.Col>
        <Grid.Col md><div className="demo-box">Equal on md+</div></Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
}

// .demo-box { background:#f8f9fa; border:1px dashed #ced4da; padding:1rem; text-align:center; }
*/
