import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

/**
 * @typedef {Object} VideoClip
 * @property {string} id - Unique identifier for the clip
 * @property {string} name - Name of the clip
 * @property {'video' | 'audio'} type - Type of media
 * @property {number} duration - Duration in seconds
 * @property {string} [thumbnail] - Optional thumbnail URL for video clips
 */

/**
 * @param {{ clips: VideoClip[], currentTime: number, duration: number, onTimeUpdate: (time: number) => void, onRemoveClip: (clipId: string) => void }} props
 */
function Timeline({ clips, currentTime, duration, onTimeUpdate, onRemoveClip }) {
  const timelineRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    onTimeUpdate(percentage * duration);
  };

  const handlePlayheadDragStart = (e) => {
    e.preventDefault(); // Prevent text selection or other default behavior
    setIsDragging(true);
  };

  const handlePlayheadDragEnd = () => {
    setIsDragging(false);
  };

  const handlePlayheadDrag = (e) => {
    if (!isDragging || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    let clickX = Math.max(0, e.clientX - rect.left);
    clickX = Math.min(clickX, rect.width);

    const percentage = clickX / rect.width;
    onTimeUpdate(percentage * duration);
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  // Calculate clip positions and widths
  const calculateClipStyles = (clip, index) => {
    let startTime = 0;

    for (let i = 0; i < index; i++) {
      startTime += clips[i].duration;
    }

    const left = (startTime / duration) * 100;
    const width = (clip.duration / duration) * 100;

    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  };

  // Format time in mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Timeline controls */}
      <div className="flex items-center justify-between p-2 border-b-2 border-solid border-slate-200 dark:border-slate-600">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          Timeline
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded border-2 border-solid border-slate-200 dark:border-slate-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded border-2 border-solid border-slate-200 dark:border-slate-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Timeline ruler */}
      <div className="h-6 border-b-2 border-solid border-slate-200 dark:border-slate-600 relative overflow-hidden">
        {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
          <div
            key={`ruler-${i}`}
            className="absolute top-0 h-full border-l-2 border-solid border-slate-300 dark:border-slate-600 flex items-center"
            style={{ left: `${(i / duration) * 100 * zoom}%` }}
          >
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
              {formatTime(i)}
            </span>
          </div>
        ))}
      </div>

      {/* Clips timeline */}
      <div
        ref={timelineRef}
        className="flex-1 relative bg-slate-100 dark:bg-slate-700 cursor-pointer overflow-x-auto border-2 border-solid border-slate-200 dark:border-slate-600"
        onClick={handleTimelineClick}
        onMouseMove={handlePlayheadDrag}
        onMouseUp={handlePlayheadDragEnd}
        onMouseLeave={handlePlayheadDragEnd}
      >
        {/* Timeline tracks */}
        <div className="h-full relative" style={{ width: `${100 * zoom}%` }}>
          {/* Video track */}
          <div className="absolute top-0 left-0 w-full h-20 border-b-2 border-solid border-slate-200 dark:border-slate-600">
            {clips.map((clip, index) => {
              const styles = calculateClipStyles(clip, index);

              return (
                <div
                  key={clip.id}
                  className="absolute top-2 h-16 bg-blue-100 dark:bg-blue-900/40 border-2 border-solid border-blue-200 dark:border-blue-800 rounded overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 group"
                  style={styles}
                >
                  <div className="h-full w-full flex items-center p-1">
                    <div
                      className="w-10 h-full bg-cover bg-center rounded border-2 border-solid border-blue-300 dark:border-blue-700"
                      style={{ backgroundImage: `url(${clip.thumbnail})` }}
                    ></div>
                    <div className="ml-1 truncate">
                      <div className="text-xs font-medium text-blue-800 dark:text-blue-300 truncate">{clip.name}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">{clip.duration.toFixed(1)}s</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveClip(clip.id);
                    }}
                    className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 dark:bg-red-900/70 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-800 border-2 border-solid border-red-300 dark:border-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Audio track */}
          <div className="absolute top-20 left-0 w-full h-16 border-t-2 border-solid border-slate-200 dark:border-slate-600">
            {/* Audio clips would go here */}
          </div>
        </div>

        {/* Playhead */}
        <div
          className="absolute top-0 h-full w-1 bg-red-500 z-10"
          style={{ left: `${(currentTime / duration) * 100 * zoom}%` }}
          onMouseDown={handlePlayheadDragStart}
        >
          <div className="absolute -top-1 -left-2 w-4 h-4 bg-red-500 rounded-full cursor-move border-2 border-solid border-red-600"></div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;