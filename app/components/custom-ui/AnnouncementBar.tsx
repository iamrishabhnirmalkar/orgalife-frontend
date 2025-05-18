import {useState, useEffect, useRef} from 'react';

interface AnnouncementBarProps {
  texts?: string[] | string;
  backgroundColor?: string;
  textColor?: string;
  speed?: number;
  direction?: 'leftToRight' | 'rightToLeft';
  pauseOnHover?: boolean;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  itemSpacing?: string;
}

export default function AnnouncementBar({
  texts = [
    'This is an important announcement! Check out our latest updates and news.',
  ],
  backgroundColor = '#f0f0f0',
  textColor = '#333333',
  speed = 50,
  direction = 'leftToRight',
  pauseOnHover = true,
  fontSize = 'text-base',
  fontWeight = 'font-medium',
  padding = 'py-2.5 px-4',
  itemSpacing = 'mx-8',
}: AnnouncementBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number | null>(
    direction === 'rightToLeft' ? 0 : null,
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const textItems: string[] = Array.isArray(texts) ? texts : [texts];

  // Measure widths and set initial position
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerW = containerRef.current.offsetWidth;
      const contentW = contentRef.current.offsetWidth;

      setContainerWidth(containerW);
      setContentWidth(contentW);

      setPosition(direction === 'rightToLeft' ? containerW : -contentW);
    }
  }, [direction]);

  // Animation loop
  useEffect(() => {
    if (
      position === null ||
      isPaused ||
      containerWidth === 0 ||
      contentWidth === 0
    )
      return;

    const animationFrame = requestAnimationFrame(() => {
      let newPosition = position;

      if (direction === 'rightToLeft') {
        newPosition = position - 1;
        if (newPosition < -contentWidth) {
          newPosition = containerWidth;
        }
      } else {
        newPosition = position + 1;
        if (newPosition > containerWidth) {
          newPosition = -contentWidth;
        }
      }

      setPosition(newPosition);
    });

    const timeout = setTimeout(() => {}, speed);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [position, isPaused, direction, speed, containerWidth, contentWidth]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${padding}`}
      style={{backgroundColor}}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={contentRef}
        className={`inline-block whitespace-nowrap ${fontSize} ${fontWeight}`}
        style={{
          color: textColor,
          transform: `translateX(${position}px)`,
        }}
      >
        {textItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={index} className={`${index > 0 ? itemSpacing : ''}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
