import { cn } from '../../utils';

export type DropzoneSurfaceProps = {
  active?: boolean;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
};

export function DropzoneSurface({
  active,
  children,
  className,
  activeClassName,
}: DropzoneSurfaceProps) {
  return (
    <div
      data-active={active}
      className={cn(className, active && activeClassName)}
    >
      {children}
    </div>
  );
}
