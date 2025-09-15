declare module 'react-swipeable' {
  export interface SwipeEventData {
    deltaX: number;
    deltaY: number;
    absX: number;
    absY: number;
    velocity: number;
    dir: string;
    event: TouchEvent | MouseEvent;
  }

  export interface SwipeableProps {
    onSwipedLeft?: (eventData: SwipeEventData) => void;
    onSwipedRight?: (eventData: SwipeEventData) => void;
    onSwipedUp?: (eventData: SwipeEventData) => void;
    onSwipedDown?: (eventData: SwipeEventData) => void;
    onSwiped?: (eventData: SwipeEventData) => void;
    onSwiping?: (eventData: SwipeEventData) => void;
    onSwipeStart?: (eventData: SwipeEventData) => void;
    delta?: number;
    preventScrollOnSwipe?: boolean;
    trackMouse?: boolean;
    trackTouch?: boolean;
    rotationAngle?: number;
    swipeDuration?: number;
    touchEventOptions?: { passive: boolean };
    nodeName?: string;
    innerRef?: React.Ref<any>;
    children?: React.ReactNode;
  }

  export function useSwipeable(props: SwipeableProps): {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
}
