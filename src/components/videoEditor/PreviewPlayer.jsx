import React, { useEffect, useRef } from 'react';

/**
 * @typedef {Object} VideoClip
 * @property {string} id - Unique identifier for the clip
 * @property {string} name - Name of the clip
 * @property {'video' | 'audio'} type - Type of media
 * @property {number} duration - Duration in seconds
 * @property {string} [thumbnail] - Optional thumbnail URL for video clips
 */

/**
 * @param {{ isPlaying: boolean, currentTime: number, clips: VideoClip[] }} props
 */
function PreviewPlayer({ isPlaying, currentTime, clips }) {
  const canvasRef = useRef(null);

  // Find which clip should be displayed at the current time
  const getCurrentClip = () => {
    let timeCounter = 0;

    for (const clip of clips) {
      if (currentTime >= timeCounter && currentTime < timeCounter + clip.duration) {
        return {
          clip,
          startTime: timeCounter,
          offsetTime: currentTime - timeCounter,
        };
      }
      timeCounter += clip.duration;
    }

    return null;
  };

  // Draw the current frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentClipInfo = getCurrentClip();

    if (currentClipInfo) {
      const { clip } = currentClipInfo;

      // For demo purposes, display a static image
      if (clip.thumbnail) {
        const img = new Image();
        img.onload = () => {
          // Center and fit the image in the canvas
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;

          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
        img.src = clip.thumbnail;
      }

      // Display clip info
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(10, canvas.height - 40, 200, 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${clip.name} (${currentClipInfo.offsetTime.toFixed(1)}s / ${clip.duration.toFixed(1)}s)`, 15, canvas.height - 20);
    } else if (clips.length > 0) {
      // If we're past the last clip, show the last frame
      const lastClip = clips[clips.length - 1];

      if (lastClip.thumbnail) {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;

          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
        img.src = lastClip.thumbnail;
      }

      // Display end message
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('End of preview', canvas.width / 2, canvas.height / 2);
      ctx.font = '12px sans-serif';
      ctx.fillText('Add more clips to extend your video', canvas.width / 2, canvas.height / 2 + 20);
    } else {
      // If there are no clips, show a message
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No clips added yet', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '12px sans-serif';
      ctx.fillText('Drag clips from the media panel to get started', canvas.width / 2, canvas.height / 2 + 20);
    }
  }, [currentTime, clips, isPlaying]);

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg aspect-video border-2 border-solid border-slate-200 dark:border-slate-600">
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default PreviewPlayer;
