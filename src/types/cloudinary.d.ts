declare global {
  interface Window {
    cloudinary: {
      videoPlayer: (
        element: HTMLElement | string,
        options: {
          cloud_name: string;
          publicId: string;
          fluid?: boolean;
          controls?: boolean;
          preload?: string;
          muted?: boolean;
          sourceTypes?: string[];
          transformation?: {
            quality?: string;
            crop?: string;
            aspect_ratio?: string;
          };
          plugins?: {
            ima?: {
              enabled?: boolean;
              locale?: string;
              adTagUrl?: string;
              prerollTimeout?: number;
              postrollTimeout?: number;
              showControlsForJSAds?: boolean;
              debug?: boolean;
              onAdStart?: () => void;
              onAdEnd?: () => void;
              onAdError?: (error: any) => void;
            };
          };
          textTracks?: {
            options?: {
              fontFace?: string;
              fontSize?: string;
              gravity?: string;
              wordHighlightStyle?: {
                color?: string;
              };
            };
            subtitles?: {
              label?: string;
              language?: string;
              default?: boolean;
              maxWords?: number;
              wordHighlight?: boolean;
            };
          };
          shoppable?: {
            enabled?: boolean;
            startState?: 'openOnPlay' | 'closed' | 'open';
            autoClose?: number;
            showPostPlayOverlay?: boolean;
            width?: string;
            bannerMsg?: string;
            toggleIcon?: string;
            transformation?: {
              quality?: string;
              fetch_format?: string;
              crop?: string;
              aspect_ratio?: string;
            };
            interactionAreas?: {
              enable?: boolean;
              template?: string;
              onClick?: (event: any) => void;
            };
            chapters?: {
              enable?: boolean;
              onChapterChange?: (chapter: any) => void;
            };
            products?: Array<{
              productId: string | number;
              productName: string;
              startTime: number;
              endTime: number;
              publicId?: string;
              hotspots?: Array<{
                time: string;
                x: string;
                y: string;
                tooltipPosition: string;
                clickUrl?: string;
                width?: string;
                height?: string;
              }>;
              onHover?: {
                action: string;
                args: string;
              };
              onClick?: {
                action?: string;
                pause?: number;
                args?: {
                  time?: string;
                  url?: string;
                };
              } | (() => void);
            }>;
          };
          interactive?: {
            mode?: 'shoppable' | '360' | 'chapters';
            hotspots?: {
              enabled?: boolean;
              template?: string;
              onClick?: (event: any) => void;
            };
          };
        }
      ) => {
        on: (event: string, callback: (data: any) => void) => void;
        off: (event: string, callback: (data: any) => void) => void;
        dispose: () => void;
        source: (publicId: string, options?: any) => void;
        ima: {
          initializeAdDisplayContainer: () => void;
          requestAds: () => void;
        };
      };
      createUploadWidget: (options: any, callback: (error: any, result: any) => void) => any;
    };
  }
}

export {};